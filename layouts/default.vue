<template>
  <div class="container">
    <header>
      <logo>
        TsKon
      </logo>
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
  main{
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }

</style>