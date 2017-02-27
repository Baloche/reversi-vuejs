import { WHITE, BLACK, EMPTY, COLORS } from '../constants/CoinStates'

export const currentTurn = state => state.currentTurn
export const currentColor = state => COLORS[state.currentTurn]
export const board = state => state.board
export const size = state => state.board.length
export const nextTurn = state => state.currentTurn === WHITE ? BLACK : WHITE
export const getTileState = state => tile => state.board[tile.x][tile.y]
export const availableMoves = (state, getters) => {
  let moves = Array(...Array(getters.size)).map(() => Array(getters.size).fill([]))
  state.board.forEach((rows, x) => {
    rows.forEach((tile, y) => {
      moves[x][y] = getSwitchableTilesFromPosition(state, getters, {x, y})
    })
  })
  return moves
}

export const playableTiles = (state, getters) => {
  return getters.availableMoves.reduce((allTiles, rowTiles, rowIndex) => [
    ...allTiles,
    ...(rowTiles.map((tileMoves, tileIndex) => {
      return tileMoves.length > 0 ? {x: rowIndex, y: tileIndex} : undefined
    }).filter(tile => tile !== undefined))
  ], [])
}

export const isTilePlayable = (state, getters) => tile => {
  return getters.availableMoves[tile.x][tile.y].length > 0
}

function getSwitchableTilesFromPosition (state, getters, position) {

  let {x, y} = position

  if (state.board[x][y] !== EMPTY) {
    return []
  }

  return [
    ...searchSwitchableTiles(state, getters, position, {x: -1, y: 0}),
    ...searchSwitchableTiles(state, getters, position, {x: 0, y: -1}),
    ...searchSwitchableTiles(state, getters, position, {x: 1, y: 0}),
    ...searchSwitchableTiles(state, getters, position, {x: 0, y: 1}),
    ...searchSwitchableTiles(state, getters, position, {x: -1, y: -1}),
    ...searchSwitchableTiles(state, getters, position, {x: 1, y: 1}),
    ...searchSwitchableTiles(state, getters, position, {x: -1, y: 1}),
    ...searchSwitchableTiles(state, getters, position, {x: 1, y: -1})
  ]
}

function searchSwitchableTiles (state, getters, position, direction) {
  let x = position.x + direction.x
  let y = position.y + direction.y
  let temp
  let tiles = []
  while (x >= 0 && x < getters.size && y >= 0 && y < getters.size) {

    temp = state.board[x][y]

    if (temp === state.currentTurn) {
      return tiles
    } else if (getters.getTileState({ x, y }) === getters.nextTurn) {
      tiles.push({ x, y })
    } else {
      break
    }

    x += direction.x
    y += direction.y
  }
  return []
}
