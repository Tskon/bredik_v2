<template>
  <!--<div>-->
  <div class="hero"
       :class="{
       hero_stay: !isWalk,
       hero_walk: isWalk,
       hero_shoot: isShoot,
       hero_up: direction === 'up',
       hero_right: direction === 'right',
       hero_down: direction === 'down',
       }"
       :style="{
       width: hero.size.width + 'px',
       height: hero.size.height + 'px',
       top: hero.position.y + cacheMove.y + 'px',
       left: hero.position.x + cacheMove.x + 'px',
       }"></div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: "hero",
    data() {
      return {
        isWalk: false,
        isShoot: false,
        direction: 'up',
        directionCodes: {
          'left': 'ArrowLeft',
          'up': 'ArrowUp',
          'right': 'ArrowRight',
          'down': 'ArrowUp',
        },
        cacheMove: { x: 0, y: 0 }, // для уменьшения количества запросов к стору
      }
    },
    computed: {
      hero() {
        return this.$store.state.vueGame.hero;
      },
      mapWidth() {
        return this.$store.state.vueGame.gameMap.size.width;
      }
    },
    methods: {
      keyDownHandler(e) {
        if (e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'ArrowRight' || e.code === 'ArrowDown') {
          e.preventDefault();
          this.isWalk = true;

          if (e.code === 'ArrowLeft') {
            this.direction = 'left';
          }
          if (e.code === 'ArrowUp') {
            this.direction = 'up';
          }
          if (e.code === 'ArrowRight') {
            this.direction = 'right';
          }
          if (e.code === 'ArrowDown') {
            this.direction = 'down';
          }

        }
      },
      keyUpHandler(e) {
        //  37 left, 38 up, 39 right, 40 down
        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
          this.isWalk = false;
        }
      },
      collisionCallback(options = {}) {
        // в коллбэк должен прокидываться дамаг и прочие зависимости
        console.log('hero callback!')
        const dmg = options.dmg || 0;
      },
      move() {
        if (this.direction === 'left' || this.direction === 'right') {
          let deltaMod = (this.direction === 'left') ? -this.hero.parameters.speed : this.hero.parameters.speed;
          let newCacheVal = this.hero.position.x + this.cacheMove.x + deltaMod;
          if (newCacheVal < 0 || newCacheVal > this.mapWidth - this.hero.size.width) deltaMod = 0;

          this.cacheMove.x += deltaMod;

        } else if (this.direction === 'up' || this.direction === 'down') {
          (this.direction === 'up') ?
            this.yTranslationChange(-this.hero.parameters.speed) :
            this.yTranslationChange(this.hero.parameters.speed);
        }
      },
      cachingMoveRequests() {
        setInterval(() => {
          // передача кэша в стор
          if (this.cacheMove.x) {
            this.heroMove(this.cacheMove);
            this.cacheMove.x = 0;
          }
        }, 50);
      },
      getObjectForCollision(){
        return {
          x: this.hero.position.x,
          y: this.hero.position.y - this.$store.state.vueGame.gameMap.yTranslation,
          width: this.hero.size.width,
          height: this.hero.size.height,
          callback: this.collisionCallback,
          self: this.hero
        };
      },
      ...mapMutations({
        heroMove: 'vueGame/heroMove',
        yTranslationChange: 'vueGame/yTranslationChange',
      })
    },
    mounted() {
      document.addEventListener('keydown', e => this.keyDownHandler(e));
      document.addEventListener('keyup', e => this.keyUpHandler(e));

      // включаем анимацию и кэш для уменьшения количества запросов в стор
      this.cachingMoveRequests();
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
  .hero {
    position: absolute;
    background-size: cover;
    z-index: 10;
  }

  .hero_stay {
    background: url("/vue-game/sprites/hero_stay1.gif") no-repeat;
    background-size: 200%;
    background-position: center;
  }

  .hero_walk {
    background: url("/vue-game/sprites/hero_walk3.gif") no-repeat;
    background-position: center;
    background-size: 100%;
  }

  .hero_right {
    transform: rotate(180deg);
  }

  .hero_up {
    transform: rotate(90deg);
  }

  .hero_down {
    transform: rotate(-90deg);
  }

</style>