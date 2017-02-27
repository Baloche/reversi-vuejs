import { WHITE, BLACK, EMPTY, COLORS } from '../constants/CoinStates'

export const currentTurn = state => state.currentTurn
export const gameState = state => state.gameState
export const currentColor = state => COLORS[state.currentTurn]
export const board = state => state.board
export const size = state => state.board.length
export const nextTurn = state => state.currentTurn === WHITE ? BLACK : WHITE
export const getTileState = state => tile => state.board[tile.x][tile.y]

export const availableMoves = (state, getters) =>
  state.board.map((rows, x) => rows.map((tile, y) => getSwitchableTilesFromPosition(getters, {x, y})))

export const areTilesPlayable = (state, getters) =>
  getters.availableMoves
    .reduce((allTiles, rowTiles) => [...allTiles, ...rowTiles])
    .filter(tileMoves => tileMoves.length > 0)
    .length > 0

export const isTilePlayable = (state, getters) => tile => getters.availableMoves[tile.x][tile.y].length > 0

function getSwitchableTilesFromPosition (getters, position) {
  return getters.getTileState(position) === EMPTY ? [
    ...searchSwitchableTiles(getters, position, {x: -1, y: 0}),
    ...searchSwitchableTiles(getters, position, {x: 0, y: -1}),
    ...searchSwitchableTiles(getters, position, {x: 1, y: 0}),
    ...searchSwitchableTiles(getters, position, {x: 0, y: 1}),
    ...searchSwitchableTiles(getters, position, {x: -1, y: -1}),
    ...searchSwitchableTiles(getters, position, {x: 1, y: 1}),
    ...searchSwitchableTiles(getters, position, {x: -1, y: 1}),
    ...searchSwitchableTiles(getters, position, {x: 1, y: -1})
  ] : []
}

function searchSwitchableTiles (getters, position, direction) {
  let x = position.x + direction.x
  let y = position.y + direction.y
  let temp
  let tiles = []
  while (x >= 0 && x < getters.size && y >= 0 && y < getters.size) {

    temp = getters.getTileState({ x, y })
    if (temp === getters.currentTurn) {
      return tiles
    } else if (temp === getters.nextTurn) {
      tiles.push({ x, y })
    } else {
      break
    }
    x += direction.x
    y += direction.y
  }
  return []
}
