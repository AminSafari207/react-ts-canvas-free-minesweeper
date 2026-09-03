# Terminology

## Loading States

### Full-page loading

A loading state that covers the entire application viewport.

### Board-level loading

A loading state that covers only the minefield board area.

## Game States

### Board dimensions

The configured row and column count used to generate the minefield.

Changing board dimensions invalidates any queued board created for previous dimensions.

### Queued board

A pre-generated minefield stored for fast game restart.

### Persisted game

A saved game state restored during the application startup.

A persisted game can include:

- the current board state
- the current game status
- queued board availability for restart

### Game status

The current lifecycle state of the game.

Values:

- idle
- loading
- playing
- win
- lose
