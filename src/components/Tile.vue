<template>
  <div class="tile">
    <coin v-if="coinColor || hint" :class="hint ? 'hint ' + currentColor : coinColor"/>
  </div>
</template>

<script>

  import { COLORS } from '../constants/CoinStates'
  import Coin from './Coin'
  import { mapGetters } from 'vuex'

  export default {

    props: {

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
      ...mapGetters([
        'currentColor'
      ]),

      coinColor: function () {
        return COLORS[this.state]
      }
    },

    components: {
      Coin
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
}

</style>
