import * as types from '../constants/ActionTypes'

const makeAction = type => ({commit}, ...args) => commit(type, ...args)

export const startGame = makeAction(types.START_GAME)
export const endTurn = makeAction(types.END_TURN)

export const play = ({commit, getters}, position) => {
  // if tile is playable
  if (getters.isTilePlayable(position)) {
    // switch all the coins related to position
    commit(types.SWITCH_COINS, [position, ...getters.availableMoves[position.x][position.y]])
    // and end the turn
    commit(types.END_TURN)
  }
}
