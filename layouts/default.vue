<template>
  <div class="container">
    <header>
      <div>
        TsKon
      </div>
      <main-menu></main-menu>
    </header>
    <nuxt/>
  </div>
</template>

<script>
  import mainMenu from '~/components/menu/main-menu';

  export default {
    head: {
      bodyAttrs: {
        class: 'body-default'
      }
    },
    components: {
      mainMenu
    }
  }
</script>

<style scoped lang="scss">
  .container{
    max-width: 1100px;
    margin: 0 auto;
    padding: 10px;
  }

</style>