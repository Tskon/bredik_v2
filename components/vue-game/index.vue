<template>
  <main>
    <div class="game-wrapper" :style="{backgroundPositionY: yTranslation + 'px'}">
      <hero></hero>
      <zombie1 startX="410" startY="100"></zombie1>
      <zombie1 startX="300" startY="100"></zombie1>
      <hero-stats></hero-stats>
    </div>
    <p>Спрайты и картинки от Louis Ferina</p>
  </main>
</template>

<script>
  import Hero from './hero';
  import HeroStats from './hero-stats';
  import Zombie1 from './zombie1';

  export default {
    components: { HeroStats, Hero, Zombie1},
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