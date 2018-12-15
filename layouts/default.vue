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
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
  export default {
    name: "default"
  }
</script>

<style scoped>

</style>