<template>
  <div class="coin">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>

  .coin {
      width: 80%;
      height: 70%;
      border-radius: 50%;
      transition: all 1000ms ease;
      position: relative;
      box-shadow: 0px 2px 10px rgba(0,0,0,0.75);
      margin-bottom: 2px;
      border-bottom-width: 2px;
      border-bottom-style: solid;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;

      &.black, &.white {
        opacity: 1;
        &::after {
          content: '';
          position: absolute;
          width: 75%;
          height: 75%;
          border-radius: 50%;
          opacity: 0.10;
        }
      }

      &.black {
        color: white;
        background-color: black; 
        border-bottom-color: white;

        &::after {
          background: linear-gradient(transparent, white);
        }
      }

      &.white {
        color: black;
        background-color: white; 
        border-bottom-color: black;
        
        &::after {
          background: linear-gradient(black, transparent);
        }
      }

      &.hint {
        transition: opacity 100ms ease;
        opacity: 0.1;

        &:hover {
          opacity: 0.5; 
        }
      }
  }

</style>
