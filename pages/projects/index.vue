<template>
  <div>
    <h1>Список проектов:</h1>
    <projects-menu></projects-menu>
  </div>
</template>

<script>
  import projectsMenu from "~/components/menu/projects-menu"

  export default {
    name: "index",
    components: {projectsMenu}
  }
</script>

<style scoped>

</style>