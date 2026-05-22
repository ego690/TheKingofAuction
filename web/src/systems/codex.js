(function () {
  const STORAGE_KEY = "the-king-of-auction-codex";

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const unlocked = raw ? new Set(JSON.parse(raw)) : new Set();
      unlockDefaultWhiteItems(unlocked);
      save(unlocked);
      return unlocked;
    } catch (error) {
      const unlocked = new Set();
      unlockDefaultWhiteItems(unlocked);
      return unlocked;
    }
  }

  function save(unlocked) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked]));
  }

  function unlockDefaultWhiteItems(unlocked) {
    if (!window.AuctionItems?.items) return;
    for (const item of window.AuctionItems.items) {
      if (item.quality === "white") unlocked.add(item.id);
    }
  }

  function unlockItems(state, items) {
    let changed = false;
    for (const item of items) {
      if (!state.codex.unlocked.has(item.id)) {
        state.codex.unlocked.add(item.id);
        changed = true;
      }
    }

    if (changed) save(state.codex.unlocked);
    return changed;
  }

  function reset(state) {
    const unlocked = new Set();
    unlockDefaultWhiteItems(unlocked);
    state.codex.unlocked = unlocked;
    localStorage.removeItem(STORAGE_KEY);
    save(unlocked);
  }

  window.CodexSystem = {
    load,
    save,
    unlockItems,
    reset,
  };
})();
