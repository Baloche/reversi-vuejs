<template>
  <div class="tile" @click="play()">
    <div class="coin" :class="color"></div>
  </div>
</template>

<script>

  import { COLORS } from '../constants'

  export default {

    name: 'tile',

    props: {

      x: {
        type: Number,
        required: true
      },

      y: {
        type: Number,
        required: true
      },

      state: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
          return value === 0 || value === 1 || value === 2
        }
      }
    },

    computed: {
      color: function () {
        return COLORS[this.state]
      }
    },

    methods: {
      play: function () {
        this.$emit('play', { x: this.x, y: this.y })
      }
    }
  }

</script>

<style lang="scss" scoped>

.tile {
    border: 2px solid rgba(0,0,0,0.5);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover::before {
        content: '';
        position: absolute;
        width: 80%;
        height: 80%;
        border-radius: 50%;
        transition: all 100ms ease;
        opacity: 0.15;
        background-color: white;
        // border-bottom: 2px solid black;
        // box-shadow: 0px 2px 4px rgba(0,0,0,0.75);
      }


    .coin {
        width: 80%;
        height: 80%;
        border-radius: 50%;
        transition: all 500ms ease;
        position: relative;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.75);
        margin-bottom: 2px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        opacity: 0;


        &.black {
          opacity: 1;
          background-color: black; 
          border-bottom-color: white;
        }

        &.white {
          opacity: 1;
          background-color: white; 
          border-bottom-color: black;
          
        }

    }
}

</style>
