<template>
  <div class="zombie"
       :class="{
       zombie_stay: !isWalk,
       zombie_walk: isWalk,
       zombie_up: direction === 'up',
       zombie_left: direction === 'left',
       zombie_down: direction === 'down',
       }"
       :style="{
       width: zombie1.size.width + 'px',
       height: zombie1.size.height + 'px',
       top: zombie1.position.y + yTranslation + 'px',
       left: zombie1.position.x + 'px',
       }"></div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: "zombie1",
    data() {
      return {
        isSpawn: false,
        isWalk: true,
        direction: 'down',
        zombie1: {
          size:{width:0, height:0},
          position:{x:0, y:0}
        }
      }
    },
    computed: {
      yTranslation(){
        return this.$store.state.vueGame.gameMap.yTranslation;
      }
    },
    methods: {
      initZombie(){
        this.zombie1 = this.$store.state.vueGame.zombie1;
      },
      move() {
        if (this.direction === 'left' || this.direction === 'right') {

        } else if (this.direction === 'up' || this.direction === 'down') {

        }
      },
      ...mapMutations({
        zombie1MoveX: 'vueGame/zombie1MoveX',
        zombie1MoveY: 'vueGame/zombie1MoveY',
      })
    },
    mounted() {
      // полуаем начальные значения из стора
      this.initZombie();

      // включаем анимацию
      const animate = highResTimestamp => {
        requestAnimationFrame(animate);
        if (this.isWalk) {
          this.move();
        }
      };
      requestAnimationFrame(animate);
    }

  }
</script>

<style scoped>
  .zombie {
    position: absolute;
    background-size: cover;
  }

  .zombie_spawn {
    background: url("/vue-game/sprites/zombie1_spawn1.gif") no-repeat;
    background-size: 100%;
    background-position: center;
  }

  .zombie_stay {
    background: url("/vue-game/sprites/zombie1_stay1.gif") no-repeat;
    background-size: 65%;
    background-position: center;
  }

  .zombie_walk {
    background: url("/vue-game/sprites/zombie1_walk1.gif") no-repeat;
    background-position: center;
    background-size: 100%;
  }

  .zombie_left {
    transform: rotate(180deg);
  }

  .zombie_up {
    transform: rotate(-90deg);
  }

  .zombie_down {
    transform: rotate(90deg);
  }

</style>