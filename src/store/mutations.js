import { set } from 'vue'
import * as ActionTypes from '../constants/ActionTypes'
import { BLACK, WHITE, EMPTY } from '../constants/CoinStates'
import * as getters from './getters'

export default {

  [ActionTypes.END_TURN] (state, size) {
    state.currentTurn = getters.nextTurn(state)
  },

  [ActionTypes.INIT_BOARD] (state, size) {

    state.board = Array(...Array(size)).map(() => Array(size).fill(EMPTY))
    setTile(state, {x: size / 2 - 1, y: size / 2 - 1}, WHITE)
    setTile(state, {x: size / 2, y: size / 2 - 1}, BLACK)
    setTile(state, {x: size / 2 - 1, y: size / 2}, BLACK)
    setTile(state, {x: size / 2, y: size / 2}, WHITE)
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
