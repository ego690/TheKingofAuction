# The King of Auction - TODO

## Design Tasks

- [x] Define the first 40 item entries.
- [x] Assign each item a category.
- [x] Assign each item a quality tier: white, blue, purple, or gold.
- [x] Assign each item a size from `1x1` to `4x4`.
- [x] Define realistic value ranges for each item.
- [x] Define each item's key visual traits.
- [x] Define each item's misleading or trap traits.
- [x] Mark each item as baseline, trap, or jackpot.
- [x] Define first-version warehouse profiles.
- [x] Define first-version AI buyer stats.
- [x] Define first-version tool limits.
- [x] Define entrance fee and starting money.
- [x] Define auction bid increment rules.
- [x] Define host hole-opening timing.
- [x] Define settlement display fields.

## Development Tasks

- [x] Create `web/` project folder.
- [x] Create `web/index.html`.
- [x] Create `web/styles.css`.
- [x] Create `web/src/main.js`.
- [x] Create `web/src/data/items.js`.
- [x] Create `web/src/data/warehouses.js`.
- [x] Create `web/src/systems/auction.js`.
- [x] Create `web/src/systems/generator.js`.
- [x] Create `web/src/systems/codex.js`.
- [x] Create `web/src/ui/render.js`.

## SVG Warehouse Tasks

- [x] Render an `8x6` warehouse area.
- [x] Render item artwork with SVG.
- [x] Support items from `1x1` to `4x4`.
- [x] Add a square opaque mask over the warehouse.
- [x] Add circular holes to the mask.
- [x] Support public holes.
- [x] Support private player holes.
- [x] Make holes appear at non-grid-centered positions.
- [x] Add reveal-all state after auction.

## Auction System Tasks

- [x] Create auction state model.
- [x] Create player money state.
- [x] Create AI buyer state.
- [x] Generate initial public holes.
- [x] Run AI bidding logic.
- [x] Add player bid actions.
- [x] Add player pass/quit action.
- [x] Add player tool actions.
- [x] Add host extra hole event every 2 rounds.
- [x] Detect auction winner.
- [x] Handle player loss.
- [x] Handle player win.

## Codex Tasks

- [x] Create codex state.
- [x] Show locked entries as unknown.
- [ ] Show unlocked item artwork.
- [x] Show unlocked item size, quality, category, and value range.
- [x] Unlock items after player wins a warehouse.
- [x] Allow codex to open during auction.
- [x] Save codex with localStorage.
- [x] Load codex from localStorage.

## Settlement Tasks

- [x] Reveal all warehouse items after auction.
- [x] Show item list.
- [x] Show each item's estimated sale value.
- [x] Show entrance fee.
- [x] Show final bid.
- [x] Show total revenue.
- [x] Show profit/loss.
- [x] Update player money.
- [x] Add next auction button.

## Playtest and Tuning Tasks

- [ ] Tune starting money.
- [ ] Tune entrance fee.
- [ ] Tune bid increments.
- [ ] Tune initial hole count.
- [ ] Tune hole radius.
- [ ] Tune host extra hole timing.
- [ ] Tune AI risk tolerance.
- [ ] Tune item value ranges.
- [ ] Tune jackpot frequency.
- [ ] Tune average auction length.
- [x] Check that large items provide baseline value.
- [x] Check that small items provide jackpot potential.
- [ ] Check that codex knowledge improves future decisions.
