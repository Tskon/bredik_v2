<template>
  <ul class="projects-menu">
    <li class="projects-menu__item">
      <router-link to="/projects/canvas-game">Игра на canvas</router-link>
    </li>
    <li class="projects-menu__item">
      <router-link to="/projects/vue-game">Игра на vue (+vuex)</router-link>
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
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    line-height: 30px;
  }

  .projects-menu__item {
    padding: 0 10px;
    text-decoration: none;
    white-space: nowrap;
    transition: .3s;
    a{
      color: black;
      transition: .3s;
      display: block;
    }
    &:hover {
      background-color: black;
      a{
        color: white;
      }
    }
  }

  .menu-active {
    color: white;
    background-color: black;
  }
</style>