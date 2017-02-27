import * as types from '../constants/ActionTypes'

const makeAction = type => ({commit}, ...args) => commit(type, ...args)

export const startGame = makeAction(types.START_GAME)
export const endTurn = makeAction(types.END_TURN)

export const play = ({commit, dispatch, getters}, position) => {

  // if tile is not playable, do not play
  if (!getters.isTilePlayable(position)) {
    return
  }

  // switch all the coins related to position
  commit(types.SWITCH_COINS, [position, ...getters.availableMoves[position.x][position.y]])

  // end the turn and check if the next player can play
  commit(types.END_TURN)
  if (getters.areTilesPlayable) {
    return
  }

  // end the turn and check if the same player can play again
  commit(types.END_TURN)
  if (getters.areTilesPlayable) {
    return
  }

  // end the game because no player can play anymore
  commit(types.END_GAME)

}
