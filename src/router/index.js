import Vue from 'vue'
import Router from 'vue-router'
import Game from 'components/Game'
import GameOver from 'components/GameOver'
import Menu from 'components/Menu'
import { UNSTARTED, STARTED, FINISHED, ROUTES } from '../constants/GameStates'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        [ROUTES[UNSTARTED]]: Menu,
        [ROUTES[STARTED]]: Game,
        [ROUTES[FINISHED]]: GameOver
      }
    }
  ]
})
