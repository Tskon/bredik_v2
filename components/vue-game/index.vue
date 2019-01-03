<template>
  <main>
    <div v-for="item in list">{{item}}</div>
    {{list}}
    <p>Спрайты и картинки от Louis Ferina</p>
  </main>
</template>

<script>
  export default {
    computed: {
      list(){
        return this.$store.state.vueGame.list;
        // return [];
      }
    }
  }
</script>

<style scoped>

</style>