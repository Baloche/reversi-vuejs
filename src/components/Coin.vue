<template>
  <div class="coin"></div>
</template>

<style lang="scss" scoped>

  .coin {
      width: 80%;
      height: 70%;
      border-radius: 50%;
      transition: all 1000ms ease;
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

      &.hint {
        transition: opacity 100ms ease;
        opacity: 0.1;

        &:hover {
          opacity: 0.5; 
        }
      }
  }

</style>
