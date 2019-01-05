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
       width: zombie1 ? zombie1.size.width + 'px' : 0,
       height: zombie1 ? zombie1.size.height + 'px' : 0,
       top: zombie1 ? zombie1.position.y + yTranslation + 'px' : 0,
       left: zombie1 ? zombie1.position.x + 'px' : 0,
       }"></div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: "zombie1",
    data() {
      return {
        isSpawn: false,
        isDead: false,
        isWalk: true,
        direction: 'left',
        zombie1Index: 0,
      }
    },
    computed: {
      zombie1() {
        return this.$store.state.vueGame.zombie1List[this.zombie1Index];
      },
      yTranslation() {
        return this.$store.state.vueGame.gameMap.yTranslation;
      },
      mapWidth(){
        return this.$store.state.vueGame.gameMap.size.width;
      }
    },
    methods: {
      move() {
        if (this.direction === 'left' || this.direction === 'right') {
          if (this.zombie1.position.x < -200 || this.zombie1.position.x > this.mapWidth + 200){
            this.isDead = true;
            this.zombie1Del(this.zombie1Index);
          }else {
            this.zombie1MoveX(
              (this.direction === 'left') ? -this.zombie1.parameters.speed : this.zombie1.parameters.speed,
              this.zombie1.index
            );
          }
        } else if (this.direction === 'up' || this.direction === 'down') {
          this.zombie1MoveX(
            (this.direction === 'up') ? -this.zombie1.parameters.speed : this.zombie1.parameters.speed,
            this.zombie1.index
          );
        }
      },
      initZombie(i) {
        class Zombie1 {
          constructor(index) {
            this.immortal = false;
            this.index = index; // номер в массиве зомби во vuex
            this.size = {
              width: 80,
              height:
                80,
            };
            this.position = {
              x: 410,
              y:
                100,
            };
            this.parameters = {
              hp: 100,
              speed:
                1,
            }
          }
        };
        return new Zombie1(i);
      },
      ...mapMutations({
        addZombie1: 'vueGame/addZombie1',
        zombie1MoveX: 'vueGame/zombie1MoveX',
        zombie1MoveY: 'vueGame/zombie1MoveY',
        zombie1Del: 'vueGame/zombie1Del',
      })
    },
    mounted() {
      // добавляем экзкмпляр в массив в сторе
      this.zombie1Index = this.$store.state.vueGame.zombie1List.length;
      this.addZombie1(this.initZombie(this.zombie1Index));

      // включаем анимацию
      const animate = highResTimestamp => {
        requestAnimationFrame(animate);
        if (this.isWalk && !this.isDead) {
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
    background: url("/vue-game/sprites/zombie1_walk2.gif") no-repeat;
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