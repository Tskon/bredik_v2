<template>
  <div class="bullet"
       :style="{top: data.y + yTransition + 'px',left: data.x + 'px'}"
  ></div>
</template>

<script>
  export default {
    name: "bullet",
    data() {
      return {}
    },
    computed: {
      x() {
        return this.data.x;
      },
      y() {
        return this.data.y;
      },
      direction() {
        return this.data.direction;
      },
      yTransition() {
        return this.$store.state.vueGame.gameMap.yTranslation
      }
    },
    props: {
      data: {
        type: Object,
        required: true,
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .bullet{
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
  }
</style>