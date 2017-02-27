import { WHITE, BLACK, EMPTY, COLORS } from '../constants/CoinStates'

export const currentTurn = state => state.currentTurn
export const gameState = state => state.gameState
export const currentColor = state => COLORS[state.currentTurn]
export const board = state => state.board
export const size = state => state.board.length
export const nextTurn = state => getOpponent(state.currentTurn)
export const getTileState = state => tile => state.board[tile.x][tile.y]

export const availableMoves = (state, getters) =>
  state.board.map((rows, x) => rows.map((tile, y) => getSwitchableTilesFromPosition(getters, getters.currentTurn, {x, y})))

export const opponentMoves = (state, getters) =>
  state.board.map((rows, x) => rows.map((tile, y) => getSwitchableTilesFromPosition(getters, getters.nextTurn, {x, y})))

export const playerCanPlay = (state, getters) =>
  getters.availableMoves
    .reduce((allTiles, rowTiles) => [...allTiles, ...rowTiles])
    .filter(tileMoves => tileMoves.length > 0)
    .length > 0

export const opponentCanPlay = (state, getters) =>
  getters.opponentMoves
    .reduce((allTiles, rowTiles) => [...allTiles, ...rowTiles])
    .filter(tileMoves => tileMoves.length > 0)
    .length > 0

export const gameIsOver = (state, getters) => !getters.playerCanPlay && !getters.opponentCanPlay

export const isTilePlayable = (state, getters) => tile => getters.availableMoves[tile.x][tile.y].length > 0

function getSwitchableTilesFromPosition (getters, color, position) {
  return getters.getTileState(position) === EMPTY ? [
    ...searchSwitchableTiles(getters, color, position, {x: -1, y: 0}),
    ...searchSwitchableTiles(getters, color, position, {x: 0, y: -1}),
    ...searchSwitchableTiles(getters, color, position, {x: 1, y: 0}),
    ...searchSwitchableTiles(getters, color, position, {x: 0, y: 1}),
    ...searchSwitchableTiles(getters, color, position, {x: -1, y: -1}),
    ...searchSwitchableTiles(getters, color, position, {x: 1, y: 1}),
    ...searchSwitchableTiles(getters, color, position, {x: -1, y: 1}),
    ...searchSwitchableTiles(getters, color, position, {x: 1, y: -1})
  ] : []
}

function searchSwitchableTiles (getters, color, position, direction) {
  let x = position.x + direction.x
  let y = position.y + direction.y
  let temp
  let tiles = []
  while (x >= 0 && x < getters.size && y >= 0 && y < getters.size) {
    temp = getters.getTileState({ x, y })
    if (temp === color) {
      return tiles
    } else if (temp === getOpponent(color)) {
      tiles.push({ x, y })
    } else {
      break
    }
    x += direction.x
    y += direction.y
  }
  return []
}

function getOpponent (color) {
  return color === WHITE ? BLACK : WHITE
}
