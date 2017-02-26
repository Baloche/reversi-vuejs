import Vue from 'vue'
import Vuex from 'vuex'
import { WHITE } from '../constants/CoinStates'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  currentTurn: WHITE,
  board: []
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters
})
