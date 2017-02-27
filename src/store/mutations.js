import { set } from 'vue'
import * as ActionTypes from '../constants/ActionTypes'
import * as CoinStates from '../constants/CoinStates'
import * as GameStates from '../constants/GameStates'
import store from './index'

export const initialState = {
  gameState: GameStates.UNSTARTED,
  currentTurn: CoinStates.EMPTY,
  size: 4,
  board: []
}

export default {

  [ActionTypes.END_TURN] (state) {
    state.currentTurn = store.getters.nextTurn
  },

  [ActionTypes.START_GAME] (state) {

    // Initialize empty board
    state.board = Array(...Array(state.size)).map(() => Array(state.size).fill(CoinStates.EMPTY))

    // Initialize centre checkerboard
    setTile(state, {x: state.size / 2 - 1, y: state.size / 2 - 1}, CoinStates.WHITE)
    setTile(state, {x: state.size / 2, y: state.size / 2 - 1}, CoinStates.BLACK)
    setTile(state, {x: state.size / 2 - 1, y: state.size / 2}, CoinStates.BLACK)
    setTile(state, {x: state.size / 2, y: state.size / 2}, CoinStates.WHITE)

    // White always starts
    state.currentTurn = CoinStates.WHITE

    // And start the game
    state.gameState = GameStates.STARTED
  },

  [ActionTypes.END_GAME] (state) {
    state.gameState = GameStates.FINISHED
  },

  [ActionTypes.SWITCH_COINS] (state, tiles) {
    tiles.forEach(tile => setTile(state, tile, state.currentTurn))
  }
}

function setTile (state, tile, color) {
  set(state.board[tile.x], tile.y, color)
}
