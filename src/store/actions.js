import * as types from '../constants/ActionTypes'

const makeAction = type => ({commit}, ...args) => commit(type, ...args)

export const startGame = makeAction(types.START_GAME)
export const endTurn = makeAction(types.END_TURN)

export const play = ({commit, dispatch, getters}, position) => {
  let { x, y } = position
  let switchables = getters.availableMoves[x][y]
  if (getters.isTilePlayable(position)) {

    commit(types.SWITCH_COINS, [position, ...switchables])

    dispatch('endTurn').then(() => {
      if (getters.playableTiles.length === 0) {
        console.log('skip turn')
        return dispatch('endTurn')
      }
    }).then(() => {
      if (getters.playableTiles.length === 0) {
        commit(types.END_GAME)
      }
    })
  }
}
