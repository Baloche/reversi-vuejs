<template>
  <div id="app">
    <h1>Reversi</h1>
    <router-view :name="gameState"></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',

    computed: {
      ...mapGetters(['gameState'])
    }
  }
</script>

<style lang="scss">

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-color: #137784;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
