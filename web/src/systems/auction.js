(function () {
  const MAX_ROUNDS = 5;
  const EARLY_WIN_ROUNDS = 3;
  const CLOCK_DURATION_MS = 8500;
  const ECONOMY_SCALE = 10;

  const BUYER_TEMPLATES = [
    {
      id: "veteran",
      name: "老手买家",
      style: "稳健估值",
      risk: 0.86,
      appraisalFactor: 0.82,
      budgetFactor: 0.78,
      categoryBias: { Furniture: 0.95, Art: 0.95, Jewelry: 0.85, Collectible: 0.9 },
    },
    {
      id: "impulsive",
      name: "冲动买家",
      style: "容易上头",
      risk: 1.12,
      appraisalFactor: 0.78,
      budgetFactor: 0.72,
      categoryBias: { Junk: 1.05, Electronics: 1.0, Furniture: 0.95 },
    },
    {
      id: "collector",
      name: "收藏买家",
      style: "偏爱藏品",
      risk: 1.0,
      appraisalFactor: 0.92,
      budgetFactor: 0.92,
      categoryBias: { Jewelry: 1.22, Collectible: 1.22, Art: 1.16, Container: 1.0 },
    },
  ];

  const FAMILY_MEMBERS = [
    { name: "母亲", role: "慢性病复诊", need: "药品和检查不能断" },
    { name: "女儿", role: "小学三年级", need: "学费和午餐费" },
    { name: "弟弟", role: "临时工待岗", need: "帮忙分担杂费" },
  ];

  const FAMILY_EXPENSES = [
    { id: "heating", name: "供暖", base: 120, variance: 40 },
    { id: "food", name: "食物", base: 260, variance: 80 },
    { id: "medicine", name: "药品", base: 320, variance: 100 },
    { id: "education", name: "教育", base: 170, variance: 60 },
    { id: "utilities", name: "水电杂费", base: 110, variance: 40 },
  ];

  function createBuyers(warehouse) {
    return BUYER_TEMPLATES.map((buyer) => ({
      ...buyer,
      budget: Math.round(warehouse.totalValue * buyer.budgetFactor * (0.82 + Math.random() * 0.36)),
      estimate: 0,
      bids: [],
      roundWins: 0,
      lastBid: 0,
      mood: "观察中",
    }));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function roundClockPrice(value) {
    if (value <= 0) return 0;
    if (value >= 100000) return Math.round(value / 2500) * 2500;
    if (value >= 30000) return Math.round(value / 1000) * 1000;
    if (value >= 10000) return Math.round(value / 500) * 500;
    if (value >= 1000) return Math.round(value / 50) * 50;
    if (value >= 100) return Math.round(value / 10) * 10;
    return Math.max(1, Math.round(value));
  }

  function createGameState() {
    return {
      day: 1,
      deadlineDay: 10,
      goalMoney: 90000 * ECONOMY_SCALE,
      money: 9000 * ECONOMY_SCALE,
      phase: "venue",
      selectedVenueId: "underground",
      gameOver: false,
      gameWon: false,
      selectedTool: null,
      debt: {
        dueDay: 10,
        amount: 90000 * ECONOMY_SCALE,
      },
      family: {
        members: FAMILY_MEMBERS,
        unpaidDays: 0,
        lastBill: null,
      },
      codex: {
        unlocked: window.CodexSystem.load(),
      },
      auction: null,
      settlement: null,
    };
  }

  function randomExpenseAmount(expense, day) {
    const drift = 1 + (day - 1) * 0.025;
    return Math.round((expense.base + Math.random() * expense.variance) * drift / 10) * 10;
  }

  function createFamilyBill(state) {
    const items = FAMILY_EXPENSES.map((expense) => ({
      ...expense,
      amount: randomExpenseAmount(expense, state.day),
    }));
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return {
      day: state.day,
      items,
      total,
      paid: null,
    };
  }

  function roundToolCost(value) {
    if (value >= 1000) return Math.round(value / 100) * 100;
    if (value >= 100) return Math.round(value / 10) * 10;
    return Math.max(10, Math.round(value));
  }

  function createTools(warehouse) {
    const averageValue = warehouse.expectedItemValue || warehouse.averageItemValue || 0;
    return {
      flashlight: {
        freeUses: 3,
        cost: roundToolCost(Math.max(80 * ECONOMY_SCALE, averageValue * 0.03)),
        radius: 28,
      },
      wideLamp: {
        freeUses: 0,
        cost: roundToolCost(Math.max(180 * ECONOMY_SCALE, averageValue * 0.08)),
        radius: 27,
      },
      magnifier: {
        freeUses: 0,
        cost: roundToolCost(Math.max(150 * ECONOMY_SCALE, averageValue * 0.06)),
        radius: 62,
      },
    };
  }

  function startAuction(state) {
    if (state.gameOver) return;

    let venue = getSelectedVenue(state);
    if (state.money < venue.requiredMoney) {
      venue = [...window.AuctionVenues].reverse().find((entry) => state.money >= entry.requiredMoney) || window.AuctionVenues[0];
      state.selectedVenueId = venue.id;
    }

    const warehouse = window.WarehouseGenerator.generateWarehouse(state.day, venue.id);
    const entranceFee = warehouse.entranceFee;
    const publicHoles = window.WarehouseGenerator.holesForHost(
      warehouse,
      warehouse.profile.initialHoles || 4
    );
    state.selectedTool = null;
    state.settlement = null;
    state.phase = "auction";
    const auction = {
      warehouse,
      holes: publicHoles,
      round: 1,
      maxRounds: MAX_ROUNDS,
      phase: "bidding",
      winner: null,
      revealAll: false,
      tools: createTools(warehouse),
      toolUsedRound: null,
      materialHints: [],
      buyers: createBuyers(warehouse),
      playerBids: [],
      roundResults: [],
      currentRoundBids: null,
      clock: null,
      log: [
        `第 1 轮准备。主持人打开了 ${publicHoles.length} 个公共观察孔。门票按本场期望均价 5% 收取：$${entranceFee}。点击开始竞拍后降价钟启动。`,
      ],
    };
    auction.clock = createClockForRound(auction);
    state.auction = auction;
  }

  function getSelectedVenue(state) {
    return window.AuctionVenues.find((venue) => venue.id === state.selectedVenueId) || window.AuctionVenues[0];
  }

  function selectVenue(state, venueId) {
    const venue = window.AuctionVenues.find((entry) => entry.id === venueId);
    if (!venue || state.money < venue.requiredMoney || state.settlement || state.phase !== "venue") return false;

    state.selectedVenueId = venueId;
    return true;
  }

  function beginSelectedVenueAuction(state) {
    if (state.phase !== "venue") return false;
    const venue = getSelectedVenue(state);
    if (!venue || state.money < venue.requiredMoney) return false;

    startAuction(state);
    return true;
  }

  function distancePointToRect(cx, cy, rect) {
    const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.height));
    return Math.hypot(cx - closestX, cy - closestY);
  }

  function visibleItems(warehouse, holes, visibility = "public") {
    const visible = new Map();
    const relevantHoles = holes.filter((hole) => hole.visibility === visibility || hole.visibility === "public");

    for (const item of warehouse.items) {
      const rect = {
        x: item.x * warehouse.cellSize,
        y: item.y * warehouse.cellSize,
        width: item.size[0] * warehouse.cellSize,
        height: item.size[1] * warehouse.cellSize,
      };

      let exposure = 0;
      for (const hole of relevantHoles) {
        if (distancePointToRect(hole.cx, hole.cy, rect) <= hole.r) {
          const area = Math.PI * hole.r * hole.r;
          const itemArea = rect.width * rect.height;
          exposure += Math.min(0.35, area / itemArea);
        }
      }

      if (exposure > 0) {
        visible.set(item.instanceId, { item, exposure: Math.min(1, exposure) });
      }
    }

    return [...visible.values()];
  }

  function estimateWarehouseForBuyer(auction, buyer) {
    const publicVisible = visibleItems(auction.warehouse, auction.holes, "public");
    const areaCovered = publicVisible.reduce((sum, entry) => sum + entry.item.size[0] * entry.item.size[1], 0);
    const visibleEstimate = publicVisible.reduce((sum, entry) => {
      const categoryBias = buyer.categoryBias[entry.item.category] ?? 1;
      const qualityGuess = window.AuctionItems.qualityRank[entry.item.quality] * 0.18 + 0.82;
      return sum + entry.item.rolledValue * Math.max(0.18, entry.exposure) * categoryBias * qualityGuess;
    }, 0);

    const coverageRatio = Math.min(1, areaCovered / (auction.warehouse.width * auction.warehouse.height));
    const unknownMultiplier = 0.95 + (1 - coverageRatio) * 0.75;
    const profileSuspicion = auction.warehouse.profile.id === "collector" ? 1.08 : 1;
    const clueEstimate = visibleEstimate * unknownMultiplier * profileSuspicion;
    const privateAppraisal =
      auction.warehouse.totalValue * buyer.appraisalFactor * profileSuspicion * (0.84 + Math.random() * 0.32);
    const clueWeight = Math.min(0.64, 0.24 + coverageRatio * 0.95);
    return Math.round((privateAppraisal * (1 - clueWeight) + clueEstimate * clueWeight) * buyer.risk);
  }

  function informationLevel(auction) {
    const visible = visibleItems(auction.warehouse, auction.holes, "public");
    const exposedArea = visible.reduce((sum, entry) => (
      sum + entry.item.size[0] * entry.item.size[1] * Math.max(0.2, entry.exposure)
    ), 0);
    const totalArea = auction.warehouse.width * auction.warehouse.height || 1;
    return clamp(exposedArea / totalArea, 0, 1);
  }

  function clockCeiling(warehouse) {
    return roundClockPrice((warehouse.expectedItemValue || warehouse.averageItemValue || 0) * 2);
  }

  function clockFloor(warehouse) {
    return 0;
  }

  function priceAtClock(clock, now = Date.now()) {
    if (!clock) return 0;
    if (clock.stopped) return clock.currentPrice || 0;
    if (!clock.running || !clock.startedAt) return clock.currentPrice || clock.ceiling || 0;
    const progress = clamp((now - clock.startedAt) / clock.durationMs, 0, 1);
    return roundClockPrice(clock.ceiling - (clock.ceiling - clock.floor) * progress);
  }

  function buyerStopPrice(auction, buyer, infoLevel, ceiling, floor) {
    const estimate = estimateWarehouseForBuyer(auction, buyer);
    const expectedValue = auction.warehouse.expectedItemValue || auction.warehouse.averageItemValue || 0;
    const totalAnchor = estimate / Math.max(1, auction.warehouse.items.length);
    const confidence = clamp(infoLevel, 0, 1);
    const uncertainty = 1 - confidence;
    const noise = 1 + (Math.random() - 0.5) * (0.72 * uncertainty + 0.18);
    const strategyBase = buyer.risk * (0.58 + confidence * 0.34);
    const pressure = 1 + (auction.round - 1) * 0.04 + (buyer.roundWins >= 1 ? 0.06 : 0);
    const infoBoost = 0.74 + confidence * 0.42;
    const target = (totalAnchor * strategyBase * pressure * infoBoost + expectedValue * (0.2 + confidence * 0.16)) * noise;
    const minimumStop = Math.max(
      auction.warehouse.entranceFee + 10,
      ceiling * (0.08 + confidence * 0.04)
    );
    const maximumStop = Math.min(ceiling, buyer.budget);
    const viableMinimum = Math.min(maximumStop, roundClockPrice(minimumStop));
    return clamp(roundClockPrice(target), Math.max(floor, viableMinimum), maximumStop);
  }

  function createClockForRound(auction) {
    const ceiling = clockCeiling(auction.warehouse);
    const floor = clockFloor(auction.warehouse);
    const infoLevel = informationLevel(auction);
    const aiStops = auction.buyers.map((buyer) => {
      const stopPrice = buyerStopPrice(auction, buyer, infoLevel, ceiling, floor);
      const progress = clamp((ceiling - stopPrice) / Math.max(1, ceiling - floor), 0, 1);
      const hesitation = 0.86 + Math.random() * 0.28 + (1 - infoLevel) * Math.random() * 0.18;
      const stopDelayMs = clamp(progress * hesitation, 0.04, 0.92) * CLOCK_DURATION_MS;
      buyer.estimate = estimateWarehouseForBuyer(auction, buyer);
      buyer.mood = infoLevel > 0.36
        ? "盯紧线索"
        : infoLevel > 0.16
          ? "试探判断"
          : "信息不足";
      return {
        bidderId: buyer.id,
        stopPrice,
        stopDelayMs,
        stopAt: null,
      };
    });

    return {
      ceiling,
      floor,
      currentPrice: ceiling,
      running: false,
      startedAt: null,
      durationMs: CLOCK_DURATION_MS,
      stopped: false,
      stoppedBy: null,
      stopPrice: 0,
      aiStops,
      infoLevel,
    };
  }

  function startAuctionClock(state, now = Date.now()) {
    const auction = state.auction;
    if (!auction || state.settlement || auction.phase !== "bidding" || !auction.clock) return false;
    if (auction.clock.running || auction.clock.stopped) return false;

    auction.clock.running = true;
    auction.clock.startedAt = now;
    auction.clock.currentPrice = auction.clock.ceiling;
    for (const stop of auction.clock.aiStops) {
      stop.stopAt = now + stop.stopDelayMs;
    }
    state.selectedTool = null;
    auction.log.unshift(`第 ${auction.round} 轮降价钟启动，起拍价 $${auction.clock.ceiling}。`);
    return true;
  }

  function clampBid(value) {
    return Math.max(0, Math.round(Number(value) || 0));
  }

  function average(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function maybeEndAuction(state) {
    const auction = state.auction;
    const roundWinLeader = ["player", ...auction.buyers.map((buyer) => buyer.id)]
      .find((id) => roundWinsFor(auction, id) >= EARLY_WIN_ROUNDS);

    if (roundWinLeader) {
      auction.winner = roundWinLeader;
      settleAuction(state, "三轮最高价提前成交");
      return true;
    }

    if (auction.round >= MAX_ROUNDS) {
      const averages = averagesByBidder(auction);
      auction.winner = Object.entries(averages).sort((a, b) => b[1] - a[1])[0][0];
      settleAuction(state, "五轮结束，平均报价最高者成交");
      return true;
    }

    return false;
  }

  function roundWinsFor(auction, bidderId) {
    return auction.roundResults.filter((result) => result.winner === bidderId).length;
  }

  function averagesByBidder(auction) {
    const entries = { player: average(auction.playerBids) };
    for (const buyer of auction.buyers) {
      entries[buyer.id] = average(buyer.bids);
    }
    return entries;
  }

  function bidderName(auction, bidderId) {
    if (bidderId === "player") return "你";
    return auction.buyers.find((buyer) => buyer.id === bidderId)?.name || "其他买家";
  }

  function recordClockStop(state, bidderId, price, source = "player") {
    const auction = state.auction;
    if (!auction || state.settlement || auction.phase !== "bidding" || auction.clock?.stopped || !auction.clock?.running) return false;

    const minimumBid = auction.warehouse.entranceFee + 10;
    const bid = Math.min(auction.clock.ceiling, Math.max(minimumBid, clampBid(price)));
    auction.clock.currentPrice = bid;
    auction.clock.stopped = true;
    auction.clock.stoppedBy = bidderId;
    auction.clock.stopPrice = bid;

    const affordableCeiling = Math.max(0, state.money - auction.warehouse.entranceFee);
    if (bidderId === "player" && bid > affordableCeiling) {
      auction.log.unshift(`现金不足。本轮最高可报价 $${affordableCeiling}。`);
      auction.clock.stopped = false;
      auction.clock.stoppedBy = null;
      auction.clock.stopPrice = 0;
      return false;
    }

    state.selectedTool = null;
    const bids = {};
    bids[bidderId] = bid;

    if (bidderId === "player") {
      auction.playerBids.push(bid);
    } else {
      const buyer = auction.buyers.find((entry) => entry.id === bidderId);
      if (buyer) {
        buyer.lastBid = bid;
        buyer.bids.push(bid);
        buyer.mood = source === "timeout" ? "捡到底价" : "抢先按停";
      }
    }

    const result = {
      round: auction.round,
      bids,
      winner: bidderId,
      clockCeiling: auction.clock.ceiling,
      clockFloor: auction.clock.floor,
      infoLevel: auction.clock.infoLevel,
    };
    auction.roundResults.push(result);
    auction.currentRoundBids = result;
    auction.log.unshift(`第 ${auction.round} 轮按停：${bidderName(auction, bidderId)} 以 $${bid} 计入本轮报价。`);

    if (maybeEndAuction(state)) return true;

    auction.round += 1;
    auction.phase = "bidding";
    const holes = window.WarehouseGenerator.holesForHost(
      auction.warehouse,
      auction.warehouse.profile.roundHoles || 2,
      auction.holes
    );
    auction.holes.push(...holes);
    auction.clock = createClockForRound(auction);
    auction.log.unshift(`第 ${auction.round} 轮准备，主持人又打开了 ${holes.length} 个公共观察孔。点击开始竞拍后降价钟启动。`);
    return true;
  }

  function stopClockForPlayer(state) {
    const auction = state.auction;
    if (!auction || !auction.clock || auction.clock.stopped || !auction.clock.running) return false;
    return recordClockStop(state, "player", priceAtClock(auction.clock), "player");
  }

  function tickAuctionClock(state, now = Date.now()) {
    const auction = state.auction;
    if (!auction || state.settlement || auction.phase !== "bidding" || !auction.clock || auction.clock.stopped || !auction.clock.running) return false;

    auction.clock.currentPrice = priceAtClock(auction.clock, now);
    const aiStop = auction.clock.aiStops
      .filter((entry) => entry.stopAt <= now && entry.stopPrice >= auction.clock.currentPrice)
      .sort((a, b) => a.stopAt - b.stopAt)[0];

    if (aiStop) {
      return recordClockStop(state, aiStop.bidderId, auction.clock.currentPrice, "ai");
    }

    if (now - auction.clock.startedAt >= auction.clock.durationMs) {
      const fallback = auction.clock.aiStops
        .slice()
        .sort((a, b) => b.stopPrice - a.stopPrice)[0];
      if (fallback) return recordClockStop(state, fallback.bidderId, fallback.stopPrice, "timeout");
    }

    return false;
  }

  function forfeitAuction(state) {
    const auction = state.auction;
    if (!auction || state.settlement) return;

    auction.winner = "none";
    auction.phase = "settled";
    auction.revealAll = true;
    state.selectedTool = null;
    window.CodexSystem.unlockItems(state, auction.warehouse.items);

    const entranceFee = auction.warehouse.entranceFee;
    state.money -= entranceFee;
    state.phase = "family";

    auction.log.unshift(`你放弃了本仓，只支付门票费 $${entranceFee}。`);
    state.settlement = {
      won: false,
      winner: "none",
      reason: "你放弃了本仓",
      entranceFee,
      finalBid: 0,
      totalCost: entranceFee,
      revenue: 0,
      profit: -entranceFee,
      averages: averagesByBidder(auction),
      roundResults: auction.roundResults,
      items: auction.warehouse.items.map((item) => ({ ...item, allocatedCost: 0, itemProfit: 0 })),
      totalValue: auction.warehouse.totalValue,
      gameWon: false,
      gameLost: false,
    };
  }

  function toolUseCost(auction, tool) {
    const config = auction?.tools?.[tool];
    if (!config) return Infinity;
    return config.freeUses > 0 ? 0 : config.cost;
  }

  function canUseTool(state, tool) {
    const auction = state.auction;
    if (!auction || state.settlement || auction.phase !== "bidding" || !auction.tools[tool]) return false;
    if (auction.clock?.running) return false;
    if (auction.toolUsedRound === auction.round) return false;
    return state.money >= toolUseCost(auction, tool);
  }

  function spendToolUse(state, tool) {
    const auction = state.auction;
    const config = auction.tools[tool];
    const cost = toolUseCost(auction, tool);

    if (cost > state.money) {
      auction.log.unshift(`现金不足，无法使用${window.RendererLabels?.tool?.(tool) || "道具"}。`);
      return false;
    }

    if (cost > 0) {
      state.money -= cost;
      auction.log.unshift(`支付 ${window.Renderer?.money?.(cost) || `$${cost}`} 使用道具。`);
    } else {
      config.freeUses -= 1;
    }

    auction.toolUsedRound = auction.round;
    return true;
  }

  function itemRect(item, warehouse) {
    return {
      x: item.x * warehouse.cellSize,
      y: item.y * warehouse.cellSize,
      width: item.size[0] * warehouse.cellSize,
      height: item.size[1] * warehouse.cellSize,
    };
  }

  function nearestItemAt(warehouse, x, y, radius) {
    return warehouse.items
      .map((item) => ({
        item,
        distance: distancePointToRect(x, y, itemRect(item, warehouse)),
      }))
      .filter((entry) => entry.distance <= radius)
      .sort((a, b) => a.distance - b.distance)[0];
  }

  function useToolAt(state, tool, x, y) {
    const auction = state.auction;
    if (!auction || !auction.tools[tool]) return false;
    if (!canUseTool(state, tool)) {
      auction.log.unshift(auction.clock?.running
        ? "降价钟已经启动，本轮不能再使用道具。"
        : auction.toolUsedRound === auction.round
        ? "本轮已经使用过道具，提交报价后才能再次使用。"
        : "现金不足，无法使用这个道具。");
      state.selectedTool = null;
      return false;
    }

    if (!spendToolUse(state, tool)) {
      state.selectedTool = null;
      return false;
    }

    if (tool === "flashlight") {
      auction.holes.push(window.WarehouseGenerator.clampedHoleNear(auction.warehouse, auction.holes, x, y, auction.tools.flashlight.radius, "private"));
      auction.log.unshift("你用手电筒打开了一个私人观察孔。");
    }

    if (tool === "wideLamp") {
      const offsets = [
        [0, 0],
        [-38, 24],
        [38, -24],
      ];
      for (const [dx, dy] of offsets) {
        auction.holes.push(window.WarehouseGenerator.clampedHoleNear(auction.warehouse, auction.holes, x + dx, y + dy, auction.tools.wideLamp.radius, "private"));
      }
      auction.log.unshift("你用广角灯扫开了三个小观察孔。");
    }

    if (tool === "magnifier") {
      const hit = nearestItemAt(auction.warehouse, x, y, auction.tools.magnifier.radius);

      if (hit) {
        const categoryName = window.RendererLabels?.category(hit.item.category) || hit.item.category;
        const traits = hit.item.traits
          .slice(0, 2)
          .map((trait) => window.RendererLabels?.trait(trait) || trait)
          .join(" / ");
        const sizeHint = `${hit.item.size[0]}x${hit.item.size[1]}`;
        auction.materialHints.unshift(`放大镜：${categoryName} · ${traits} · 约 ${sizeHint}`);
        auction.log.unshift(`放大镜提示：${categoryName}，${traits}，约 ${sizeHint}。`);
      } else {
        auction.log.unshift("放大镜没有找到足够清晰的线索。");
      }
    }

    state.selectedTool = null;
    return true;
  }

  function buildItemSettlement(auction, totalCost) {
    const totalArea = auction.warehouse.items.reduce((sum, item) => sum + item.size[0] * item.size[1], 0) || 1;

    return auction.warehouse.items.map((item) => {
      const area = item.size[0] * item.size[1];
      const allocatedCost = auction.winner === "player"
        ? Math.round(totalCost * (area / totalArea))
        : 0;
      const itemProfit = auction.winner === "player"
        ? item.rolledValue - allocatedCost
        : 0;

      return {
        ...item,
        allocatedCost,
        itemProfit,
        profitRate: allocatedCost > 0 ? itemProfit / allocatedCost : 0,
      };
    });
  }

  function settleAuction(state, reason) {
    const auction = state.auction;
    if (!auction || state.settlement) return;

    const won = auction.winner === "player";
    const averages = averagesByBidder(auction);
    const finalBid = Math.round(averages[auction.winner] || 0);
    const entranceFee = auction.warehouse.entranceFee;
    const totalCost = entranceFee + (won ? finalBid : 0);
    const revenue = won ? auction.warehouse.totalValue : 0;
    const profit = revenue - totalCost;

    state.money += profit;
    auction.revealAll = true;
    auction.phase = "settled";
    state.selectedTool = null;

    window.CodexSystem.unlockItems(state, auction.warehouse.items);

    if (won) {
      auction.log.unshift(`${reason}。你以平均报价 $${finalBid} 拍下仓库。`);
    } else {
      auction.log.unshift(`${reason}。${bidderName(auction, auction.winner)} 以平均报价 $${finalBid} 拍下仓库。`);
    }

    state.phase = "family";

    state.settlement = {
      won,
      winner: auction.winner,
      reason,
      entranceFee,
      finalBid,
      totalCost,
      revenue,
      profit,
      averages,
      roundResults: auction.roundResults,
      items: buildItemSettlement(auction, totalCost),
      totalValue: auction.warehouse.totalValue,
      gameWon: false,
      gameLost: false,
    };
  }

  function prepareFamilyBill(state) {
    if (state.family.lastBill?.day === state.day && state.family.lastBill.paid === null) {
      return state.family.lastBill;
    }

    state.family.lastBill = createFamilyBill(state);
    return state.family.lastBill;
  }

  function resolveFamilyBill(state, shouldPay) {
    if (state.phase !== "family") return false;

    const bill = prepareFamilyBill(state);
    if (shouldPay && state.money >= bill.total) {
      state.money -= bill.total;
      bill.paid = true;
      state.family.unpaidDays = 0;
    } else {
      bill.paid = false;
      state.family.unpaidDays += 1;
    }

    if (state.day >= state.debt.dueDay) {
      if (state.money >= state.debt.amount) {
        state.money -= state.debt.amount;
        state.gameWon = true;
        state.gameOver = true;
      } else {
        state.gameOver = true;
      }
      return true;
    }

    state.day += 1;
    state.auction = null;
    state.settlement = null;
    state.selectedTool = null;
    state.phase = "venue";
    return true;
  }

  window.AuctionSystem = {
    createGameState,
    startAuction,
    selectVenue,
    beginSelectedVenueAuction,
    getSelectedVenue,
    prepareFamilyBill,
    resolveFamilyBill,
    canUseTool,
    toolUseCost,
    startAuctionClock,
    stopClockForPlayer,
    tickAuctionClock,
    priceAtClock,
    forfeitAuction,
    useToolAt,
    visibleItems,
    bidderName,
  };
})();
