<template>
  <div class="stats">
    <span class="stats__hp">{{hero.parameters.hp}} HP</span>
  </div>
</template>

<script>
  export default {
    name: "hero-stats",
    computed: {
      hero(){
        return this.$store.state.vueGame.hero;
      }
    }
  }
</script>

<style scoped lang="scss">
  .stats{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .stats__hp{
    color: red;
    font-family: "Arial Black";
    font-size: 40px;
    font-weight: 900;
    text-shadow: 0 0 10px rgba(255,255,255,1);
    stroke: white;
  }
</style>