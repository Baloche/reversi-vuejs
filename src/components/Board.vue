<template>
  <div class="board">
    <template v-for="(rows, x) in board">
      <tile v-for="(tile, y) in rows"
        :state="getTileState({x, y})"
        :hint="isTilePlayable({x, y})"
        :x="x"
        :y="y"
        @click.native="play({x,y})"
        :style="{ width: 100/size + '%', height: 100/size + '%'  }"
      ></tile>
    </template>
  </div>
</template>

<script>

  import Tile from './Tile'
  import { mapGetters, mapActions } from 'vuex'

  export default {

    name: 'board',

    computed: {
      ...mapGetters([
        'board',
        'size',
        'getTileState',
        'availableMoves',
        'isTilePlayable'
      ])
    },

    created: function () {
      this.initBoard(8)
    },

    methods: {
      ...mapActions([
        'initBoard',
        'playCoin',
        'switchCoins',
        'endTurn'
      ]),

      play: function (tile) {
        if (this.isTilePlayable(tile)) {
          let switchables = this.availableMoves[tile.x][tile.y]
          this.playCoin(tile)
          this.switchCoins(switchables)
          this.endTurn()
        }
      },

      print: function () {
        this.tiles.forEach((row, rowIndex) => {
          console.log(rowIndex, row.join(' | '))
        })
      }
    },

    components: {
      Tile
    }
  }

</script>

<style lang="scss">

.board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;

    height: 500px;
    width: 500px;
    background: green;
    margin: auto;
    // box-shadow: 0px 0.5px 0px 0.5px white, 0px 5px 0px 5px #001900;

    .tile {
      flex-grow: 1;
    }
}

</style>
