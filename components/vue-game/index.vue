<template>
  <main>
    <div class="game-wrapper"></div>
    <p>Спрайты и картинки от Louis Ferina</p>
  </main>
</template>

<script>
  export default {
    computed: {
      hero(){
        return this.$store.state.vueGame.hero;
        // return [];
      }
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
  }
</style>