<template>
  <ul class="projects-menu">
    <li class="projects-menu__item">
      <router-link class="projects-menu__item" to="/projects/canvas-game">Игра на canvas</router-link>
      <router-link class="projects-menu__item" to="/projects/vue-game">Игра на vue (+vuex)</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "projects-menu",
  }
</script>

<style scoped lang="scss">
  .projects-menu {
    display: flex;
    justify-content: center;
    font-size: 18px;
    line-height: 30px;
  }

  .projects-menu__item {
    padding: 0 10px;
    text-decoration: none;
    color: black;
    white-space: nowrap;
    transition: .3s;
    &:hover {
      color: white;
      background-color: black;
    }
  }

  .menu-active {
    color: white;
    background-color: black;
  }
</style>