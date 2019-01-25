<template>
  <div class="zombie"
       :class="{
       zombie_stay: !isWalk,
       zombie_walk: isWalk,
       zombie_fight: isFight,
       zombie_up: direction === 'up',
       zombie_left: direction === 'left',
       zombie_down: direction === 'down',
       }"
       :style="{
       width: zombie1 ? zombie1.size.width + 'px' : 0,
       height: zombie1 ? zombie1.size.height + 'px' : 0,
       top: zombie1 ? zombie1.position.y + cacheMove.y + yTranslation + 'px' : 0,
       left: zombie1 ? zombie1.position.x + cacheMove.x + 'px' : 0,
       }"></div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { getCollisionObject } from './js/helper';
  export default {
    name: "zombie1",
    data() {
      return {
        isSpawn: false,
        isDead: false,
        isWalk: false,
        isFight: false,
        direction: 'down',
        zombie1Index: 0,
        cacheMove: { x: 0, y: 0 }, // для уменьшения количества запросов к стору
        collisions: [],
        hitInterval: false,
      }
    },
    computed: {
      zombie1() {
        return this.$store.state.vueGame.zombie1List[ this.zombie1Index ];
      },
      yTranslation() {
        return this.$store.state.vueGame.gameMap.yTranslation;
      },
      mapWidth() {
        return this.$store.state.vueGame.gameMap.size.width;
      },
      enemy() {
        return this.$store.state.vueGame.hero;
      }
    },
    props: {
      startX: {
        default: 0,
        type: String
      },
      startY: {
        default: 0,
        type: String
      }
    },
    watch: {
      isFight(){
        if(this.isFight){
          this.hitInterval = setInterval(()=>{
            this.hitHero(this.zombie1.parameters.attack);
          }, 1000);
        } else {
          clearInterval(this.hitInterval);
        }
      },
    },
    methods: {
      move() {
        if (this.direction === 'left' || this.direction === 'right') {
          if (this.zombie1.position.x < -200 || this.zombie1.position.x > this.mapWidth + 200) { // уничтожение зомби после выхода с карты
            this.isDead = true;
            this.zombie1Del(this.zombie1Index);
          } else {
            (this.direction === 'left') ?
              this.cacheMove.x -= this.zombie1.parameters.speed :
              this.cacheMove.x += this.zombie1.parameters.speed;
          }
        } else if (this.direction === 'up' || this.direction === 'down') {
          (this.direction === 'up') ?
            this.cacheMove.y -= this.zombie1.parameters.speed :
            this.cacheMove.y += this.zombie1.parameters.speed;
        }
      },

      collisionCallback(options = {}) {
        this.isFight = true;
        setTimeout(() => {
          this.isFight = false;
        }, 3000);
      },

      getObjectForCollision() {
        return {
          x: this.zombie1.position.x,
          y: this.zombie1.position.y,
          width: this.zombie1.size.width,
          height: this.zombie1.size.height,
          callback: this.collisionCallback,
          self: this.zombie1
        }
      },

      cachingMoveRequests() {
        setInterval(() => {
          if (this.cacheMove.x || this.cacheMove.y) {
            this.zombie1Move({
              delta: this.cacheMove,
              index: this.zombie1.index
            });
            this.cacheMove.x = 0;
            this.cacheMove.y = 0;
          }
        }, 50);
      },

      goToTheHero(delta = 500) {
        const deltaX = (this.zombie1.position.x - this.enemy.position.x < 0) ?
          this.enemy.position.x - this.zombie1.position.x :
          this.zombie1.position.x - this.enemy.position.x;
        const deltaY = (this.zombie1.position.y - this.enemy.position.y - this.yTranslation < 0) ?
          this.enemy.position.y - this.yTranslation - this.zombie1.position.y :
          this.zombie1.position.y - this.enemy.position.y - this.yTranslation;

        if (deltaX < delta && deltaY < delta){
          const width = this.zombie1.size.width + (delta * 2);
          const height = this.zombie1.size.height + (delta * 2);
          const x = this.zombie1.position.x - delta;
          const y = this.zombie1.position.y - delta;


          const collisions = getCollisionObject({
            object: {
              position: {x, y},
              size: {
                width,
                height
              },
            },
            targetTranslationY: this.$store.state.vueGame.gameMap.yTranslation,
            targets: [this.$store.state.vueGame.hero]
          });

          this.direction = collisions[0].collisionFrom;
          this.isWalk = true;

        } else {
          this.isWalk = false;
        }
      },

      initZombie(i, startX, startY) {
        class Zombie1 {
          constructor(index, startX, startY) {
            this.immortal = false;
            this.index = index; // номер в массиве зомби во vuex
            this.size = {
              width: 60,
              height: 60,
            };
            this.position = {
              x: +startX,
              y: +startY,
            };
            this.parameters = {
              hp: 100,
              speed: 1,
              attack: 10
            }
          }
        };
        return new Zombie1(i, startX, startY);
      },

      ...mapMutations({
        addZombie1: 'vueGame/addZombie1',
        zombie1Move: 'vueGame/zombie1Move',
        zombie1Del: 'vueGame/zombie1Del',
        hitHero: 'vueGame/hitHero',
      })
    },
    mounted() {
      // добавляем экзкмпляр в массив в сторе
      this.zombie1Index = this.$store.state.vueGame.zombie1List.length;
      this.addZombie1(this.initZombie(this.zombie1Index, this.startX, this.startY));

      // включаем анимацию и кэш для уменьшения количества запросов в стор
      this.cachingMoveRequests();
      const animate = highResTimestamp => {
        requestAnimationFrame(animate);
        if (this.isWalk && !this.isDead) {
          this.move();
        }
        this.collisions = getCollisionObject({
          object: this.zombie1,
          targetTranslationY: this.$store.state.vueGame.gameMap.yTranslation,
          targets: [this.$store.state.vueGame.hero]
        });

        if(this.collisions.length){
          this.direction = this.collisions[0].collisionFrom;
          this.isFight = true;
        } else {
          this.isFight = false;
        }

        // смотрим расстояние до героя и идем к нему если надо
        this.goToTheHero();

      };
      requestAnimationFrame(animate);
    }

  }
</script>

<style scoped>
  .zombie {
    position: absolute;
    background-size: cover;
    box-sizing: content-box;
    padding: 30px;
  }

  .zombie_spawn {
    background: url("/vue-game/sprites/zombie1_spawn1.gif") no-repeat;
    background-size: 100%;
    background-position: center;
  }

  .zombie_stay {
    background: url("/vue-game/sprites/zombie1_stay1.gif") no-repeat;
    background-size: 50%;
    background-position: center;
  }

  .zombie_walk {
    background: url("/vue-game/sprites/zombie1_walk2.gif") no-repeat;
    background-position: center;
    background-size: 85%;
  }

  .zombie_fight {
    background: url("/vue-game/sprites/zombie1_attack1.gif") no-repeat;
    background-position-y: center;
    background-position-x: 20px;
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