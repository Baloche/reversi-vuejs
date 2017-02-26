<template>
  <div class="tile">
    <div class="coin" :class="color + (hint ? ' hint' : '')"></div>
  </div>
</template>

<script>

  import { COLORS } from '../constants/CoinStates'

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

      hint: Boolean,

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

    &:hover::before, .coin.hint {
        content: '';
        position: absolute;
        width: 80%;
        height: 70%;
        border-radius: 50%;
        transition: all 100ms ease;
        opacity: 0.10;
        background-color: white;
      }


    .coin {
        width: 80%;
        height: 70%;
        border-radius: 50%;
        transition: all 500ms ease;
        position: relative;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.75);
        margin-bottom: 2px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &.black, &.white {
          opacity: 1;
          &::after {
            content: '';
            width: 75%;
            height: 75%;
            border-radius: 50%;
            opacity: 0.10;
          }
        }


        &.black {
          background-color: black; 
          border-bottom-color: white;

          &::after {
            background: linear-gradient(transparent, white);
          }
        }

        &.white {
          background-color: white; 
          border-bottom-color: black;
          
          &::after {
            background: linear-gradient(black, transparent);
          }
        }

    }
}

</style>
