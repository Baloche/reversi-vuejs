import { set } from 'vue'
import * as ActionTypes from '../constants/ActionTypes'
import * as CoinStates from '../constants/CoinStates'
import * as GameStates from '../constants/GameStates'
import store from './index'

export const initialState = {
  gameState: GameStates.UNSTARTED,
  currentTurn: CoinStates.WHITE,
  size: 8,
  board: []
}

export default {

  [ActionTypes.END_TURN] (state) {
    state.currentTurn = store.getters.nextTurn
  },

  [ActionTypes.START_GAME] (state) {
    state.board = Array(...Array(state.size)).map(() => Array(state.size).fill(CoinStates.EMPTY))
    setTile(state, {x: state.size / 2 - 1, y: state.size / 2 - 1}, CoinStates.WHITE)
    setTile(state, {x: state.size / 2, y: state.size / 2 - 1}, CoinStates.BLACK)
    setTile(state, {x: state.size / 2 - 1, y: state.size / 2}, CoinStates.BLACK)
    setTile(state, {x: state.size / 2, y: state.size / 2}, CoinStates.WHITE)
    state.gameState = GameStates.STARTED
  },

  [ActionTypes.END_GAME] (state) {
    state.gameState = GameStates.FINISHED
  },

  [ActionTypes.PLAY_COIN] (state, position) {
    setTile(state, position, state.currentTurn)
  },

  [ActionTypes.SWITCH_COINS] (state, switchables) {
    switchables.forEach(tile => setTile(state, tile, state.currentTurn))
  }
}

function setTile (state, tile, color) {
  set(state.board[tile.x], tile.y, color)
}
