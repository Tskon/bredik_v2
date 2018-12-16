<template>
  <div class="container">
    <header>
      <logo>
        TsKon
      </logo>
      <nav>
        <router-link to="/">Главная</router-link>
        <router-link to="/articles">Блог</router-link>
        <router-link to="/about-me">Обо мне</router-link>
      </nav>
    </header>
    <nuxt/>
  </div>
</template>

<script>
  export default {
    head: {
      bodyAttrs: {
        class: 'body-default'
      }
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