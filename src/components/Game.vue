<template>
  <div class="game">
    <h1 :style="{color: currentColor}">Current player is {{ currentColor }}</h1>
    <board/>
  </div>
</template>

<script>
import Board from './Board'
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'currentColor'
    ])
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
