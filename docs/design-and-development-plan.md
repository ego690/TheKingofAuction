# The King of Auction - Design and Development Plan

## Project Direction

The first playable version should focus on the warehouse auction itself.
Management systems such as antique shops, repair shops, black market work, and direct orders can be added later. For now, they should be represented only by simple automatic sale and profit settlement.

The core experience is:

```text
Choose a warehouse -> Host opens circular viewing holes -> Observe clues -> AI bids -> Player bids or uses tools -> More holes appear -> Auction ends -> Reveal warehouse -> Update codex -> Settle profit/loss
```

The main fantasy is not simply buying random loot. The player is reading partial visual information, comparing it with past discoveries, judging AI behavior, and deciding how far to push the bid.

## Core Auction Loop

1. The player pays an entrance fee to join a warehouse auction.
2. The warehouse starts fully covered by a square opaque mask.
3. The host opens several random circular holes in the mask.
4. Public holes are visible to the player and all AI buyers.
5. The player and AI buyers begin bidding.
6. During bidding rounds, the player can spend tools or skills to open more private holes or inspect existing visible areas.
7. Every few rounds, the host opens more public holes.
8. When no one continues bidding, the highest bidder wins.
9. If the player loses, only the entrance fee is paid.
10. If the player wins, the entrance fee and final bid are paid.
11. The full warehouse is revealed.
12. The player obtains the items, unlocks codex entries, and automatically sells items in the first version.
13. The player uses profit to enter future auctions.

## Warehouse Grid

The warehouse is represented as a fixed 2D grid. The recommended first version is:

```text
8 columns x 6 rows
```

Items are placed on this grid and can occupy different sizes from `1x1` to `4x4`.

The important visual rule:

- The underlying placement uses square grid cells.
- The mask is a strict square/rectangular cover over the full warehouse.
- Viewing holes are circular.
- Circular holes can cross cell boundaries and reveal only corners, edges, textures, handles, labels, or partial silhouettes.

This is central to the strategy. The player should often see only a fragment of an item and must infer what it might be.

## Viewing Hole Rules

Initial MVP rules:

- The host opens 5 circular public holes at the start.
- Every 2 bidding rounds, the host opens 2 more public holes.
- Player tools can open additional private holes.
- Private holes are visible only to the player.
- Holes should have varied positions, not always centered on cells.
- A hole may reveal part of one item, several adjacent items, or empty floor.

Future expansion:

- Different hole sizes.
- Tool-specific hole patterns.
- Temporary holes.
- Noisy tools that reveal information but cause AI buyers to become more aggressive.

## Item System

Items should be based on realistic object categories instead of pure rarity color logic.

Each item should include:

```text
id
name
category
quality
size
price range
visual traits
misleading traits
SVG appearance
codex unlock state
```

Quality tiers:

- White: common used goods, household items, low-value collectibles.
- Blue: branded goods, useful equipment, modest collectibles, minor antiques.
- Purple: rare collectibles, valuable antiques, professional equipment, art pieces.
- Gold: top collectibles, precious gemstones, master works, highly rare antiques.

Quality increases value within a category, but does not override real-world value logic across categories.

Examples:

```text
4x4 white sofa can be worth more than a 1x1 blue ring.
4x4 gold rosewood furniture can be very valuable, but still worth less than a 1x1 gold cat's eye gemstone.
```

## Item Size and Value Principles

Size range:

- `1x1`: rings, watches, gems, coins, small cameras, small sculptures.
- `1x2` / `2x1`: scrolls, long boxes, instrument cases, toolboxes.
- `2x2`: safes, small cabinets, record players, old televisions.
- `3x2` / `2x3`: sofas, framed art, shelves, large speakers.
- `3x3`: antique cabinets, pianos, sculptures, mechanical equipment.
- `4x4`: furniture sets, large rosewood cabinets, industrial equipment.

Design principle:

```text
Large items create baseline value and are easier to notice.
Small items create jackpot potential and are harder to spot.
```

Recommended categories:

- Furniture
- Jewelry
- Electronics
- Art
- Tools and equipment
- Collectibles
- Containers and safes
- Junk and decoys

Item role types:

- Baseline items: large, visible, stable value.
- Trap items: look valuable but are common, damaged, fake, or costly to handle.
- Jackpot items: small, hard to notice, very high value.

## Codex System

The codex is a permanent player knowledge system.

When the player obtains an item for the first time, the corresponding codex entry is permanently unlocked. In later auctions, the player can compare visible fragments in circular holes with unlocked codex entries.

First version codex features:

- Unlocked items show full SVG artwork.
- Unlocked items show name, quality, size, category, and value range.
- Unlocked items list key visible traits.
- Locked items are shown as unknown entries.
- The codex can be opened during auctions.

The first version should not automatically identify items for the player. The player should use the codex manually to make guesses.

Future expansion:

- Familiarity levels based on repeated discoveries.
- Similarity hints.
- Expert skills that narrow possible matches.
- Variant tracking for damaged, fake, restored, or premium versions.

## AI Buyer Design

The first version should include 3 AI buyers:

- Veteran Buyer: conservative, stable estimate, rarely wildly overpays.
- Impulsive Buyer: bids emotionally, may overpay for weak information.
- Collector Buyer: values specific categories more highly and reacts strongly to relevant clues.

AI behavior should be based on public information only. Player-private tool holes should not affect AI estimates.

AI estimation inputs:

- Visible public holes.
- Item fragments revealed by public holes.
- Known category preferences.
- Budget.
- Personality risk tolerance.
- Current price relative to estimated warehouse value.

Future expansion:

- AI bluffing.
- AI relationships.
- AI specialties.
- AI tells and emotional reactions.
- AI buyers with hidden information advantages.

## Tools and Skills

First version tools:

- Flashlight: open 1 selected circular private hole.
- Wide Lamp: open 3 smaller private holes around a selected area.
- Magnifier: inspect an already visible hole and reveal a material/category hint.

Each auction should limit tool usage so the player cannot reveal the whole warehouse.

Possible future tools:

- Tenant File: reveal previous owner's occupation or background.
- Thermal Scan: reveal large object silhouettes.
- Expert Call: estimate a visible item category or value band.
- Crowbar: opens more view, but creates public noise and increases AI aggression.

## Settlement Rules

If the player loses the auction:

```text
money -= entrance fee
no items gained
```

If the player wins the auction:

```text
money -= entrance fee
money -= final bid
reveal all items
unlock codex entries
auto-sell all items
money += total sale value
show profit/loss
```

First version should use automatic sale only.

Future management systems can add:

- Auction house resale.
- Direct customer orders.
- Antique shop display.
- Repair shop restoration.
- Black market imitation or risky resale.

## Web Prototype Direction

The prototype should be built as a 2D web game using HTML, CSS, JavaScript, and SVG.

Recommended folder structure:

```text
web/
  index.html
  styles.css
  src/
    main.js
    data/
      items.js
      warehouses.js
    systems/
      auction.js
      generator.js
      codex.js
    ui/
      render.js
```

The prototype should avoid a heavy framework at first. A static web app is enough for rapid iteration and can run directly in the browser or through a small local server.

## Development Phases

### Phase 1 - Static Web Skeleton

Create the web project structure and base UI:

- Main game screen.
- Warehouse panel.
- Auction info panel.
- Action buttons.
- AI buyer panel.
- Codex panel.
- Settlement panel.

### Phase 2 - SVG Warehouse Renderer

Implement the main visual system:

- Draw the `8x6` warehouse grid.
- Draw item SVGs inside the warehouse.
- Add a full square mask layer.
- Open circular holes in the mask.
- Allow holes to show partial item artwork underneath.
- Support public and private holes visually.

### Phase 3 - Item Data and Warehouse Generation

Implement:

- First item table, around 40 items.
- Item placement without overlap.
- Warehouse total value calculation.
- Random warehouse generation.
- Different warehouse quality profiles.

### Phase 4 - Auction Flow

Implement:

- Entrance fee.
- Initial public holes.
- AI bidding turns.
- Player bid actions.
- Player pass/quit action.
- Host opens more holes every few rounds.
- Auction end detection.
- Winner detection.

### Phase 5 - Codex

Implement:

- Unlock item after player obtains it.
- Show unlocked item entries.
- Hide locked entries.
- Allow codex to be opened during an auction.
- Persist codex with localStorage if practical.

### Phase 6 - Reveal and Settlement

Implement:

- Reveal full warehouse after auction.
- List all items gained.
- Show item values.
- Show entrance fee, final bid, revenue, and profit/loss.
- Update player money.
- Start next auction.

### Phase 7 - Tuning and Playtest

Tune:

- Initial hole count.
- Hole size.
- AI bid aggressiveness.
- Item value distribution.
- Frequency of jackpot items.
- Tool usage limits.
- Auction length.
- Starting money.

## First Playable Target

The first playable version is successful if the player can:

1. Start with money.
2. Enter a warehouse auction.
3. See circular holes revealing partial item visuals.
4. Use tools to reveal more information.
5. Compare clues with the codex.
6. Bid against AI buyers.
7. Win or lose the auction.
8. Reveal the full warehouse.
9. Unlock item codex entries.
10. See profit/loss.
11. Continue to the next auction.

