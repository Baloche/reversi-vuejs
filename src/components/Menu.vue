<template>
    <big-button color="orange" @click.native="startGame">Start</big-button>
</template>

<script>

  import BigButton from './BigButton'
  import { mapActions } from 'vuex'

  export default {

    methods: {
      ...mapActions([
        'startGame'
      ])
    },

    components: {
      BigButton
    }

  }
</script>

<style scoped>

</style>
