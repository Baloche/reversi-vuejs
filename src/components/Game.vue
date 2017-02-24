<template>
  <div class="game">
    <input type="number" v-model="size">
    <h1 :style="{color: currentColor}">Current player is {{ currentColor }}</h1>
    <board @hasPlayed="hasPlayed()" :size="size" :current="current"></board>
  </div>
</template>

<script>
import Board from './Board'
import { WHITE } from '../constants'
import { getOpponent, getColor } from '../tools'

export default {
  name: 'game',

  data: function () {
    return {
      size: 8,
      current: WHITE
    }
  },

  computed: {
    currentColor: function () {
      return getColor(this.current)
    }
  },

  methods: {
    hasPlayed: function () {
      this.current = getOpponent(this.current)
    }
  },

  components: {
    Board
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.game {
  perspective: 900px;

  .board {
    transform: rotateX(20deg);
  }
}
</style>
