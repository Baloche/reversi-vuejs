<template>
    <button class='button' @click="onClick" :style="{backgroundColor: color}">
        <slot></slot>
    </button>
</template>

<script>
export default {

  props: {
    onClick: Function,
    color: String
  }

}
</script>

<style scoped lang="scss">

  $unpressed-shadow: 0px 2px 0px 3px black, 0px 2px 10px 3px rgba(0,0,0,0.5);
  $pressed-shadow: 0px 0px 0px 1px black, 0px 0px 20px 1px rgba(0,0,0,0.3);
  $inner-light: inset 0px 0px 50px rgba(255,255,255,0.75);

  .button {
    display: flex;
    box-shadow: $unpressed-shadow;
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 200px;
    outline: none;
    border: none;
    transition: all 0.2s ease;
    position: relative;
    &:active {
      transform: translateY(4px);
      box-shadow: $pressed-shadow;
      &:hover, &:focus {
        box-shadow: $pressed-shadow, $inner-light;
      }
    }

    &:hover, &:focus {
        box-shadow: $unpressed-shadow, $inner-light;
    }
  }

</style>
