(function () {
  const state = window.AuctionSystem.createGameState();
  let tutorialIndex = 0;
  let tutorialActive = false;
  let tutorialShownThisGame = false;

  const tutorialSteps = [
    {
      title: "游戏目的",
      body: "你需要在还款日前攒够钱维持家里的生活并偿还债务。每天参加一次仓库拍卖会消耗一天时间：先观察被遮住的仓库，用主持人开的孔和道具判断里面可能有什么，再在降价钟上按停出价。拍下仓库后，物品会自动出售结算盈亏；没拍下也会揭晓仓库内容并解锁图鉴，为之后判断价值做准备。",
      intro: true,
    },
    {
      selector: "#warehouseSvgMount",
      title: "仓库遮罩",
      body: "仓库里的物品被黑色遮罩挡住。黄色圆孔是主持人公开给所有人看的线索，你要根据露出的边角猜测里面的东西值多少钱。",
    },
    {
      selector: ".tool-row",
      title: "观察道具",
      body: "每轮竞拍开始前最多使用一次道具。手电筒前三次免费，广角灯能开多个小孔，放大镜会给出更具体的材质和类别线索。",
    },
    {
      selector: ".warehouse-log-card",
      title: "拍卖记录",
      body: "这里记录主持人开孔、道具花费和每轮按停结果。遇到疑惑时可以回看刚刚发生了什么。",
    },
    {
      selector: ".current-bid",
      title: "降价钟",
      body: "点击开始竞拍后，指针从最高价顺时针降到 0。最先按停的人会把当前价格计入本轮报价。",
    },
    {
      selector: "#buyerList",
      title: "AI 买家",
      body: "其他买家也会根据公开信息和自己的偏好抢停。你可以观察他们是否出手，判断这一轮竞争是否激烈。",
    },
    {
      selector: ".codex-panel",
      title: "图鉴",
      body: "图鉴会显示已解锁物品的外观和价格范围。白色物品开局已知，其他物品在结算时看见后会永久解锁。",
    },
  ];

  function rerender() {
    window.Renderer.render(state, {
      onWarehouseClick: handleWarehouseClick,
    });
    if (tutorialActive) requestAnimationFrame(positionTutorial);
  }

  function startClockLoop() {
    window.setInterval(() => {
      if (window.AuctionSystem.tickAuctionClock(state)) {
        rerender();
        return;
      }

      if (state.auction?.phase === "bidding" && state.auction.clock?.running && !state.settlement) {
        rerender();
      }
    }, 120);
  }

  function beginSelectedVenue() {
    window.AuctionSystem.beginSelectedVenueAuction(state);
    rerender();
    maybeStartTutorial();
  }

  function tutorialElements() {
    return {
      overlay: document.getElementById("tutorialOverlay"),
      spotlight: document.getElementById("tutorialSpotlight"),
      card: document.getElementById("tutorialCard"),
      stepLabel: document.getElementById("tutorialStepLabel"),
      title: document.getElementById("tutorialTitle"),
      body: document.getElementById("tutorialBody"),
      nextButton: document.getElementById("tutorialNextButton"),
    };
  }

  function completeTutorial() {
    tutorialActive = false;
    tutorialIndex = 0;
    const { overlay, card } = tutorialElements();
    overlay.classList.add("hidden");
    card.classList.remove("intro");
  }

  function positionTutorial() {
    if (!tutorialActive) return;
    const step = tutorialSteps[tutorialIndex];
    const { overlay, spotlight, stepLabel, title, body, nextButton, card } = tutorialElements();

    if (step.intro) {
      spotlight.classList.add("hidden");
      card.classList.add("intro");
      const introWidth = Math.min(760, window.innerWidth - 48);
      const introHeight = Math.min(460, window.innerHeight - 48);
      overlay.style.setProperty("--tutorial-card-x", `${Math.max(24, (window.innerWidth - introWidth) / 2)}px`);
      overlay.style.setProperty("--tutorial-card-y", `${Math.max(24, (window.innerHeight - introHeight) / 2)}px`);
      stepLabel.textContent = "";
      title.textContent = step.title;
      body.textContent = step.body;
      nextButton.textContent = "开始教学";
      return;
    }

    const target = document.querySelector(step.selector);
    if (!target) return;
    spotlight.classList.remove("hidden");
    card.classList.remove("intro");

    const padding = 8;
    const rect = target.getBoundingClientRect();
    const x = Math.max(8, rect.left - padding);
    const y = Math.max(8, rect.top - padding);
    const width = Math.min(window.innerWidth - x - 8, rect.width + padding * 2);
    const height = Math.min(window.innerHeight - y - 8, rect.height + padding * 2);
    const cardWidth = Math.min(360, window.innerWidth - 28);
    const cardHeight = 230;
    let cardX = x + width + 16;
    let cardY = y;

    if (cardX + cardWidth > window.innerWidth - 14) cardX = x - cardWidth - 16;
    if (cardX < 14) cardX = Math.min(window.innerWidth - cardWidth - 14, 14);
    if (cardY + cardHeight > window.innerHeight - 14) cardY = window.innerHeight - cardHeight - 14;
    if (cardY < 14) cardY = 14;

    overlay.style.setProperty("--tutorial-x", `${x}px`);
    overlay.style.setProperty("--tutorial-y", `${y}px`);
    overlay.style.setProperty("--tutorial-w", `${width}px`);
    overlay.style.setProperty("--tutorial-h", `${height}px`);
    overlay.style.setProperty("--tutorial-card-x", `${cardX}px`);
    overlay.style.setProperty("--tutorial-card-y", `${cardY}px`);
    stepLabel.textContent = `${tutorialIndex} / ${tutorialSteps.length - 1}`;
    title.textContent = step.title;
    body.textContent = step.body;
    nextButton.textContent = tutorialIndex === tutorialSteps.length - 1 ? "完成" : "下一步";
  }

  function showTutorialStep(index) {
    tutorialIndex = Math.max(0, Math.min(tutorialSteps.length - 1, index));
    tutorialElements().overlay.classList.remove("hidden");
    requestAnimationFrame(positionTutorial);
  }

  function maybeStartTutorial() {
    if (state.phase !== "auction" || tutorialShownThisGame) return;
    tutorialShownThisGame = true;
    tutorialActive = true;
    showTutorialStep(0);
  }

  function closeDialogIfOpen() {
    const dialog = document.getElementById("settlementDialog");
    if (dialog.open) dialog.close();
  }

  function continueAfterSettlement() {
    closeDialogIfOpen();
    state.settlement = null;
    state.phase = "family";
    window.AuctionSystem.prepareFamilyBill(state);
    rerender();
  }

  function handleWarehouseClick(x, y) {
    if (!state.selectedTool) return;
    window.AuctionSystem.useToolAt(state, state.selectedTool, x, y);
    rerender();
  }

  function selectTool(tool) {
    const auction = state.auction;
    if (!auction || state.settlement) return;
    if (!window.AuctionSystem.canUseTool(state, tool)) return;
    state.selectedTool = state.selectedTool === tool ? null : tool;
    rerender();
  }

  document.getElementById("stopClockButton").addEventListener("click", () => {
    if (state.auction?.clock && !state.auction.clock.running) {
      window.AuctionSystem.startAuctionClock(state);
    } else {
      window.AuctionSystem.stopClockForPlayer(state);
    }
    rerender();
  });

  document.getElementById("passButton").addEventListener("click", () => {
    window.AuctionSystem.forfeitAuction(state);
    rerender();
  });

  document.getElementById("toolFlashlight").addEventListener("click", () => selectTool("flashlight"));
  document.getElementById("toolWideLamp").addEventListener("click", () => selectTool("wideLamp"));
  document.getElementById("toolMagnifier").addEventListener("click", () => selectTool("magnifier"));

  document.getElementById("startVenueList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-venue-id]");
    if (!button) return;
    const venueId = button.dataset.venueId;
    if (venueId === state.selectedVenueId) {
      beginSelectedVenue();
      return;
    }
    if (window.AuctionSystem.selectVenue(state, venueId)) rerender();
  });

  document.getElementById("startVenueButton").addEventListener("click", beginSelectedVenue);

  document.getElementById("newAuctionButton").addEventListener("click", () => {
    state.phase = "venue";
    state.auction = null;
    state.settlement = null;
    rerender();
  });

  document.getElementById("nextAuctionButton").addEventListener("click", continueAfterSettlement);
  document.getElementById("nextAuctionInlineButton").addEventListener("click", continueAfterSettlement);
  document.getElementById("nextAuctionBannerButton").addEventListener("click", continueAfterSettlement);

  document.getElementById("closeSettlementButton").addEventListener("click", closeDialogIfOpen);

  document.getElementById("payFamilyButton").addEventListener("click", () => {
    window.AuctionSystem.resolveFamilyBill(state, true);
    rerender();
  });

  document.getElementById("skipFamilyButton").addEventListener("click", () => {
    window.AuctionSystem.resolveFamilyBill(state, false);
    rerender();
  });

  document.getElementById("tutorialNextButton").addEventListener("click", () => {
    if (!tutorialActive) return;
    if (tutorialIndex >= tutorialSteps.length - 1) {
      completeTutorial();
      return;
    }
    showTutorialStep(tutorialIndex + 1);
  });

  document.getElementById("tutorialSkipButton").addEventListener("click", completeTutorial);
  window.addEventListener("resize", () => {
    if (tutorialActive) positionTutorial();
  });
  window.addEventListener("scroll", () => {
    if (tutorialActive) positionTutorial();
  }, true);

  document.getElementById("resetButton").addEventListener("click", () => {
    window.CodexSystem.reset(state);
    tutorialShownThisGame = false;
    const fresh = window.AuctionSystem.createGameState();
    Object.assign(state, fresh);
    rerender();
  });

  document.getElementById("restartGameButton").addEventListener("click", () => {
    tutorialShownThisGame = false;
    const fresh = window.AuctionSystem.createGameState();
    Object.assign(state, fresh);
    rerender();
  });

  startClockLoop();
  rerender();
})();
