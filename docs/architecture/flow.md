# App Flow

## Purpose

This document describes the runtime flow of the application:

- Board initialization
- Game restart behavior
- Persisted game recovery
- Failure handling.

## Terminology

- [Full-page loading](./terminology.md#full-page-loading)
- [Board-level loading](./terminology.md#board-level-loading)
- [Queued board](./terminology.md#queued-board)
- [Persisted game](./terminology.md#persisted-game)

## Main App Startup Flow

1. The application starts with a full-page loading state.
2. The main UI loads:
   - background
   - top menu bar
   - minefield board container
3. The full-page loading state ends.
4. Minefield board initialization begins.
5. Persisted storage is checked for an persisted game.

### If a persisted game exists

1. The board is restored from persisted game data.
2. The saved game status is also restored.
3. If the saved game was already won or lost, the related modal is restored together with the board state.
4. Board loading ends.
5. The restored state becomes active:
   - playable if the game was ongoing
   - view-only if the game was already won or lost

### If a queued board is available in persisted data

1. Restart button is enabled.

### If no queued board is available in persisted data

1. The restart button remains disabled.
2. Background queued board generation begins.
3. Retry attempts continue until a queued board is successfully generated.
4. Once a queued board is available, the restart button is enabled.

### If no persisted game exists

1. The minefield board enters a board-level loading state.
2. The first minefield generation starts.

### If the first generation succeeds

1. A second minefield generation starts in the background.
2. The first generated board is used to start the game.
3. Board loading ends.
4. The game becomes playable.

### If the second generation succeeds

1. The second generated board is stored as the queued board for the next restart.
2. The restart button is enabled.

### If the second generation fails

1. The current game remains playable using the first generated board.
2. The restart button remains disabled.
3. Background retries continue until a queued board is successfully generated.
4. Once a queued board is available, the restart button is enabled.

### If the first generation fails

1. Retry attempts continue until the first board is successfully generated.
2. If all retry attempts fail, the global crash fallback is shown.

## Restart Flow

Restart is available only when a queued board exists.

When the player restarts the game, whether the current game is ongoing or already finished:

1. The restart button is disabled.
2. The queued board is used to start the new game immediately.
3. A new background generation starts to prepare the next queued board.

### If background generation succeeds

1. The newly generated board becomes the next queued board.
2. The restart button is enabled.

### If background generation fails

1. Retry attempts continue until a new queued board is successfully generated.
2. The current restarted game remains playable during retries.
3. The restart button remains disabled until a new queued board is available.

## Board Dimension Change Flow

When the player changes the board dimensions:

1. Any queued board based on the previous dimensions is discarded.
2. Any in-progress queued board generation based on the previous dimensions is cancelled or ignored.
3. The current game state is replaced.
4. Any open finished-game modal is closed.
5. The minefield board enters a board-level loading state.
6. A new minefield generation starts using the updated dimensions.

### If the first generation succeeds

1. A second minefield generation starts in the background using the updated dimensions.
2. The first generated board is used to start the new game.
3. Board loading ends.
4. The game becomes playable.

### If the second generation succeeds

1. The second generated board is stored as the queued board for the next restart.
2. The restart button is enabled.

### If the second generation fails

1. The current game remains playable using the first generated board.
2. The restart button remains disabled.
3. Background retries continue until a queued board is successfully generated.
4. Once a queued board is available, the restart button is enabled.

### If the first generation fails

1. Retry attempts continue until the first board is successfully generated.
2. If all retry attempts fail, the global crash fallback is shown.

## Win Flow

When the player wins:

1. All minefield cells become disabled.
2. A modal with backdrop is shown.
3. The modal includes:
   - a winning message
   - a restart action

## Loss Flow

When the player loses:

1. All minefield cells become disabled.
2. A modal with backdrop is shown.
3. The modal includes:
   - a loss message
   - a restart action
   - an action to close the modal and review the board
