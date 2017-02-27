<template>
  <div class="game">
    <h1 :style="{color: currentColor}">Current player is {{ currentColor }}</h1>
    <div class="board-wrapper">
      <board/>
    </div>
    <big-button color="orange" v-if="!playerCanPlay && !gameIsOver" @click.native="endTurn">Skip</big-button>
    <big-button color="orange" v-if="gameIsOver" @click.native="startGame">Restart</big-button>
  </div>
</template>

<script>
import Board from './Board'
import BigButton from './BigButton'
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'currentColor',
      'playerCanPlay',
      'gameIsOver'
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
    BigButton
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

  .board-wrapper {
    perspective: 900px;
    .board {
      transform: rotateX(20deg);
    }
  }
}
</style>
