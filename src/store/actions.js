import * as types from '../constants/ActionTypes'

const makeAction = type => ({commit}, ...args) => commit(type, ...args)

export const startGame = makeAction(types.START_GAME)
export const endTurn = makeAction(types.END_TURN)

export const play = ({commit, getters}, position) => {
  let { x, y } = position
  let switchables = getters.availableMoves[x][y]
  if (getters.isTilePlayable(position)) {
    commit(types.PLAY_COIN, position)
    commit(types.SWITCH_COINS, switchables)
    commit(types.END_TURN)
  }
}
