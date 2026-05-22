(function () {
  const GRID_COLUMNS = 8;
  const GRID_ROWS = 6;
  const CELL_SIZE = 72;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sample(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function roundToNicePrice(value) {
    if (value >= 100000) return Math.round(value / 5000) * 5000;
    if (value >= 30000) return Math.round(value / 2500) * 2500;
    if (value >= 10000) return Math.round(value / 1000) * 1000;
    if (value >= 3000) return Math.round(value / 500) * 500;
    return Math.max(100, Math.round(value / 100) * 100);
  }

  function roundToTicketPrice(value) {
    if (value >= 1000) return Math.round(value / 100) * 100;
    if (value >= 100) return Math.round(value / 10) * 10;
    return Math.max(10, Math.round(value));
  }

  function weightedChoice(items, getWeight) {
    const weighted = items
      .map((item) => ({ item, weight: Math.max(0, getWeight(item)) }))
      .filter((entry) => entry.weight > 0);
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = Math.random() * total;

    for (const entry of weighted) {
      roll -= entry.weight;
      if (roll <= 0) return entry.item;
    }

    return weighted[weighted.length - 1].item;
  }

  function createGrid(columns = GRID_COLUMNS, rows = GRID_ROWS) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => null)
    );
  }

  function canPlace(grid, item, x, y, columns = GRID_COLUMNS, rows = GRID_ROWS) {
    const [w, h] = item.size;
    if (x + w > columns || y + h > rows) return false;

    for (let row = y; row < y + h; row += 1) {
      for (let col = x; col < x + w; col += 1) {
        if (grid[row][col]) return false;
      }
    }

    return true;
  }

  function placeItem(grid, item, placed, columns = GRID_COLUMNS, rows = GRID_ROWS) {
    const candidates = [];

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        if (canPlace(grid, item, x, y, columns, rows)) candidates.push({ x, y });
      }
    }

    if (!candidates.length) return false;

    const position = sample(candidates);
    const instance = {
      ...item,
      instanceId: `${item.id}_${placed.length}_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      x: position.x,
      y: position.y,
      rolledValue: item.value,
      rotation: Math.random() > 0.5 ? 0 : 180,
    };

    for (let row = position.y; row < position.y + item.size[1]; row += 1) {
      for (let col = position.x; col < position.x + item.size[0]; col += 1) {
        grid[row][col] = instance.instanceId;
      }
    }

    placed.push(instance);
    return true;
  }

  function itemWeightForProfile(item, profile) {
    const categoryWeight = profile.weights[item.category] ?? 1;
    const qualityWeight = profile.qualityBias[item.quality] ?? 1;
    if (qualityWeight <= 0) return 0;
    const rarityPenalty = window.AuctionItems.qualityRank[item.quality] ** 0.9;
    const sizeArea = item.size[0] * item.size[1];
    const sizePenalty = sizeArea >= 12 ? 0.65 : sizeArea >= 6 ? 0.85 : 1;
    return (categoryWeight * qualityWeight * sizePenalty) / rarityPenalty;
  }

  function expectedItemValueForProfile(profile) {
    const weighted = window.AuctionItems.items
      .map((item) => ({
        item,
        weight: itemWeightForProfile(item, profile),
      }))
      .filter((entry) => entry.weight > 0);
    const totalWeight = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    if (!totalWeight) return 0;

    return weighted.reduce((sum, entry) => (
      sum + entry.item.value * entry.weight
    ), 0) / totalWeight;
  }

  function generateWarehouse(day = 1, profileId = null) {
    const profile = window.WarehouseProfiles.find((entry) => entry.id === profileId) || sample(window.WarehouseProfiles);
    const [columns, rows] = profile.gridSize || [GRID_COLUMNS, GRID_ROWS];
    const grid = createGrid(columns, rows);
    const placed = [];
    const fillRange = profile.targetFill || [23, 34];
    const targetFill = randomInt(fillRange[0], fillRange[1]);
    let attempts = 0;
    let filled = 0;

    while (filled < targetFill && attempts < 360) {
      attempts += 1;
      const item = weightedChoice(window.AuctionItems.items, (candidate) =>
        itemWeightForProfile(candidate, profile)
      );
      const before = placed.length;
      placeItem(grid, item, placed, columns, rows);
      if (placed.length > before) filled += item.size[0] * item.size[1];
    }

    if (profile.level >= 3 && !placed.some((item) => item.role === "jackpot")) {
      const jackpot = weightedChoice(
        window.AuctionItems.items.filter((item) => item.role === "jackpot" && (profile.qualityBias[item.quality] ?? 0) > 0),
        (item) => itemWeightForProfile(item, profile)
      );
      placeItem(grid, jackpot, placed, columns, rows);
    }

    const totalValue = placed.reduce((sum, item) => sum + item.rolledValue, 0);
    const averageItemValue = placed.length ? totalValue / placed.length : 0;
    const expectedItemValue = expectedItemValueForProfile(profile);
    const entranceFee = roundToTicketPrice(expectedItemValue * 0.05);
    const startingBid = roundToNicePrice(totalValue * (0.18 + Math.random() * 0.12));
    const smallIncrement = roundToNicePrice(Math.max(250, totalValue * 0.025));
    const largeIncrement = roundToNicePrice(Math.max(500, totalValue * 0.06));
    return {
      id: `warehouse_${day}_${Date.now()}`,
      day,
      profile,
      grid,
      items: placed,
      totalValue,
      averageItemValue,
      expectedItemValue,
      entranceFee,
      startingBid,
      smallIncrement,
      largeIncrement,
      width: columns,
      height: rows,
      cellSize: CELL_SIZE,
    };
  }

  function randomHole(warehouse, radius = null, visibility = "public") {
    const radiusRange = warehouse.profile?.holeRadius || [28, 42];
    const holeRadius = radius || randomInt(radiusRange[0], radiusRange[1]);
    return {
      id: `hole_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      cx: randomInt(holeRadius, warehouse.width * warehouse.cellSize - holeRadius),
      cy: randomInt(holeRadius, warehouse.height * warehouse.cellSize - holeRadius),
      r: holeRadius,
      visibility,
    };
  }

  function clampedHoleNear(warehouse, existingHoles, x, y, radius, visibility = "private") {
    const maxX = warehouse.width * warehouse.cellSize - radius;
    const maxY = warehouse.height * warehouse.cellSize - radius;
    return {
      id: `hole_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      cx: Math.max(radius, Math.min(maxX, x)),
      cy: Math.max(radius, Math.min(maxY, y)),
      r: radius,
      visibility,
    };
  }

  function holesForHost(warehouse, count, existingHoles = []) {
    const holes = [];

    for (let i = 0; i < count; i += 1) {
      holes.push(randomHole(warehouse, null, "public"));
    }

    return holes;
  }

  window.WarehouseGenerator = {
    GRID_COLUMNS,
    GRID_ROWS,
    CELL_SIZE,
    generateWarehouse,
    randomHole,
    clampedHoleNear,
    holesForHost,
    randomInt,
  };
})();
