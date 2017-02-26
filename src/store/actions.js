import * as types from '../constants/ActionTypes'

const makeAction = type => ({commit}, ...args) => commit(type, ...args)

export const initBoard = makeAction(types.INIT_BOARD)
export const playCoin = makeAction(types.PLAY_COIN)
export const switchCoins = makeAction(types.SWITCH_COINS)
export const endTurn = makeAction(types.END_TURN)
