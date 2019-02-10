<template>
  <main>
    <div class="game-wrapper" :style="{backgroundPositionY: yTranslation + 'px'}">
      <hero></hero>
      <template v-for="bullet in heroBullets">
        <bullet :data="bullet"></bullet>
      </template>
      <template v-for="zombie1 in level1.zombie1List">
        <zombie1 :startX="''+zombie1.x" :startY="''+zombie1.y"></zombie1>
      </template>
      <hero-stats></hero-stats>
    </div>
    <p>Спрайты и картинки от Louis Ferina</p>
  </main>
</template>

<script>
  import Hero from './hero';
  import HeroStats from './hero-stats';
  import Bullet from './bullet';
  import Zombie1 from './zombie1';
  import {levels} from './js/data';

  export default {
    components: { HeroStats, Hero, Zombie1, Bullet},
    data(){
      return {
        level1: levels.level1
      }
    },
    computed: {
      yTranslation() {
        return this.$store.state.vueGame.gameMap.yTranslation;
      },
      heroBullets() {
        return this.$store.state.vueGame.hero.bullets;
      },
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