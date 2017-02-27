<template>
  <div class="game">
    <div class="header">
      <div class="coin-wrapper">
        <coin class="white"><h1>{{whiteCount}}</h1></coin>
      </div>
      <h1 :style="{color: currentColor}">Current player is {{ currentColor }}</h1>
      <div class="coin-wrapper">
        <coin class="black"><h1>{{blackCount}}</h1></coin>
      </div>
    </div>
    <div class="board-wrapper">
      <board/>
    </div>
    <big-button color="orange" v-if="!playerCanPlay && !gameIsOver" @click.native="endTurn">Skip</big-button>
    <big-button color="orange" v-if="gameIsOver" @click.native="startGame">Restart</big-button>

  </div>
</template>

<script>
import Board from './Board'
import Coin from './Coin'
import BigButton from './BigButton'
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'currentColor',
      'playerCanPlay',
      'gameIsOver',
      'whiteCount',
      'blackCount'
    ])
  },

  methods: {
    ...mapActions([
      'endTurn',
      'startGame'
    ])
  },

  components: {
    Board,
    BigButton,
    Coin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.game {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .header {
    display: flex;

    .coin-wrapper {
      height: 100px;
      width: 100px;
      margin: 10px;
      display: flex;
      justify-content: center;
    }
  }

  .board-wrapper {
    perspective: 900px;
    .board {
      transform: rotateX(20deg);
    }
  }
}
</style>
