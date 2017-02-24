<template>
  <div class="board">
    <template v-for="(rows, x) in tiles">
      <tile v-for="(tile, y) in rows"
        :state="getState(x, y)"
        :x="x"
        :y="y"
        @click.native="play(x,y)"
        :style="{ width: 100/size + '%', height: 100/size + '%'  }"
      ></tile>
    </template>
  </div>
</template>

<script>

  import Tile from './Tile'
  import { BLACK, WHITE, EMPTY } from '../constants/coin'

  export default {

    name: 'board',

    props: {
      size: {
        type: Number,
        default: 8,
        validator: (value) => {
          return value >= 4 && value <= 12
        }
      },

      current: Number
    },

    created: function () {
      this.init()
    },

    data: function () {
      return { tiles: Array(...Array(this.size)).map(() => Array(this.size).fill(0)) }
    },

    methods: {
      play: function (x, y) {
        let tile = { x, y }

        if (!this.isEmpty(tile)) {
          return
        }

        let switchableTiles = [
          ...this.searchSwitchableTiles(-1, 0, x, y),
          ...this.searchSwitchableTiles(0, -1, x, y),
          ...this.searchSwitchableTiles(1, 0, x, y),
          ...this.searchSwitchableTiles(0, 1, x, y),
          ...this.searchSwitchableTiles(-1, -1, x, y),
          ...this.searchSwitchableTiles(1, 1, x, y),
          ...this.searchSwitchableTiles(-1, 1, x, y),
          ...this.searchSwitchableTiles(1, -1, x, y)
        ]

        if (switchableTiles.length > 0) {
          switchableTiles.concat({x, y}).forEach(tile => { this.setColor(tile.x, tile.y, this.current) })
          this.$emit('hasPlayed')
        }
      },

      searchSwitchableTiles: function (xDir, yDir, xPos, yPos) {
        let x = xPos + xDir
        let y = yPos + yDir
        let tile
        let tiles = []
        while (x >= 0 && x < this.size && y >= 0 && y < this.size) {
          tile = this.tiles[x][y]
          if (this.isOpponent({ x, y })) {
            tiles.push({ x, y })
          } else if (tile === this.current) {
            return tiles
          } else {
            break
          }

          x += xDir
          y += yDir
        }
        return []
      },

      setColor: function (x, y, color) {
        this.$set(this.tiles[x], y, color)
      },

      init: function () {
        this.setColor(this.size / 2, this.size / 2 - 1, BLACK)
        this.setColor(this.size / 2 - 1, this.size / 2, BLACK)
        this.setColor(this.size / 2, this.size / 2, WHITE)
        this.setColor(this.size / 2 - 1, this.size / 2 - 1, WHITE)
      },

      isOpponent: function (tile) {
        let color = this.tiles[tile.x][tile.y]
        return this.current === BLACK ? color === WHITE : color === BLACK
      },

      isEmpty: function (tile) {
        let color = this.tiles[tile.x][tile.y]
        return color === TRANSPARENT
      },

      getState: function (rowIndex, tileIndex) {
        return this.tiles[rowIndex][tileIndex]
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
