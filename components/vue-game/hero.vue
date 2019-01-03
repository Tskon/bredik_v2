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
       top: hero.position.y + 'px',
       left: hero.position.x + 'px',
       }"></div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: "hero",
    data() {
      return {
        isWalk: false,
        isShoot: false,
        direction: 'up',
        directionCodes: {
          'left': 37,
          'up': 38,
          'right': 39,
          'down': 40,
        }
      }
    },
    computed: {
      hero() {
        return this.$store.state.vueGame.hero;
      }
    },
    methods: {
      keyDownHandler(e) {
        //  37 left, 38 up, 39 right, 40 down
        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
          e.preventDefault();
          this.isWalk = true;

          if (e.keyCode === 37) {
            this.direction = 'left';
          }
          if (e.keyCode === 38) {
            this.direction = 'up';
          }
          if (e.keyCode === 39) {
            this.direction = 'right';
          }
          if (e.keyCode === 40) {
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
      move() {
        if (this.direction === 'left' || this.direction === 'right') {
          this.heroMoveX((this.direction === 'left') ? -this.hero.parameters.speed : this.hero.parameters.speed)
        } else if (this.direction === 'up' || this.direction === 'down') {
          this.heroMoveY((this.direction === 'up') ? -this.hero.parameters.speed : this.hero.parameters.speed)
        }
      },
      ...mapMutations({
        heroMoveX: 'vueGame/heroMoveX',
        heroMoveY: 'vueGame/heroMoveY',
      })
    },
    mounted() {
      document.addEventListener('keydown', e => this.keyDownHandler(e));
      document.addEventListener('keyup', e => this.keyUpHandler(e));

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
  .hero {
    position: absolute;
    background-size: cover;
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