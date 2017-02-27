<template>
  <div class='game-over'>
    <btn color="orange" @click.native="startGame">Restart</btn>
  </div>
</template>

<script>

  import Button from './Button'
  import { mapActions } from 'vuex'

  export default {

    methods: {
      ...mapActions([
        'startGame'
      ])
    },

    components: {
      btn: Button
    }

  }
</script>

<style scoped>

    .game-over {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

</style>
