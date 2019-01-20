<template>
  <main>
    <div class="game-wrapper" :style="{backgroundPositionY: yTranslation + 'px'}">
      <hero></hero>
      <zombie1 startX="41" startY="1"></zombie1>
      <zombie1 startX="30" startY="1"></zombie1>
    </div>
    <p>Спрайты и картинки от Louis Ferina</p>
  </main>
</template>

<script>
  import Hero from './hero';
  import Zombie1 from './zombie1';

  export default {
    components: {Hero, Zombie1},
    computed: {
      yTranslation() {
        return this.$store.state.vueGame.gameMap.yTranslation;
      }
    },
  }
</script>

<style scoped lang="scss">
  .game-wrapper {
    width: 900px;
    height: 600px;
    border: 2px solid darkgreen;
    background: url("/vue-game/tiles/ground01.gif") repeat-y;
    background-size: contain;
    position: relative;
    overflow: hidden;
  }
</style>