<template>
  <nav class="main-menu">
    <router-link class="main-menu__item" to="/" exact>Главная</router-link>
    <router-link class="main-menu__item" to="/articles">Блог</router-link>
    <router-link class="main-menu__item" to="/about-me">Обо мне</router-link>
  </nav>
</template>

<script>
  export default {
    name: "main-menu",

  }
</script>

<style scoped lang="scss">
  .main-menu{
    display: flex;
    justify-content: center;
    font-size: 18px;
    line-height: 30px;
  }
  .main-menu__item{
    padding: 0 10px;
    text-decoration: none;
    color: black;
    white-space: nowrap;
    transition: .3s;
    &:hover{
      color: white;
      background-color: black;
    }
  }
  .menu-active{
    color: white;
    background-color: black;
  }
</style>