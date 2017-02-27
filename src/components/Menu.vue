<template>
  <div class='menu'>
    <btn color="orange" @click.native="startGame">Start</btn>
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

    .menu {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

    }

</style>
