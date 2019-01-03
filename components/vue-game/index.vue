<template>
  <main>
    <div class="game-wrapper">
    <hero></hero>
    </div>
    <p>Спрайты и картинки от Louis Ferina</p>
  </main>
</template>

<script>
  import Hero from './hero';

  export default {
    components: {Hero},
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  .game-wrapper{
    width: 900px;
    height: 600px;
    border: 2px solid darkgreen;
    background: url("/vue-game/tiles/ground01.gif") repeat-y;
    background-size: contain;
    position: relative;
  }
</style>