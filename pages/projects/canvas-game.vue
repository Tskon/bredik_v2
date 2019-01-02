<template>
  <main>
    <h1>canvas-game</h1>
    <canvas id="canvas-game" :width="canvasWidth" :height="canvasHeight"></canvas>
  </main>
</template>

<script>
  export default {
    name: "canvas-game",
    data() {
      return {
        canvasWidth: 480,
        canvasHeight: 320,
      }
    },
    computed: {
      canvas() {
        return document.getElementById('canvas-game')
      },
      ctx() {
        return this.canvas.getContext('2d');
      },
      ballsList() {
        return [
          this.createBall({
            cx: 100,
            cy: 100,
            r: 100,
            color: "yellow",
            speed: 1
          }),
          this.createBall({
            cx: this.canvasWidth - 60,
            cy: this.canvasHeight - 60,
            r: 60,
            color: "gold",
            speed: 2
          }),
          this.createBall({
            r: 5,
            color: "red",
            speed: 4
          }),
        ]
      },
    },
    methods: {
      mainDraw() {
        // Очищаем поле каждую итерацию отрисовки
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.ballsList.forEach(ball=>{
          // Делам сдвиг в объекте мяча
          ball.move();
          // Рисуем мяч, аргумент - объект мяча
          this.drawBall(ball);
        });
      },

      drawBall(circle) {
        this.ctx.beginPath();
        this.ctx.arc(circle.cx, circle.cy, circle.r, 0, Math.PI * 2);
        this.ctx.fillStyle = circle.color;
        this.ctx.fill();
        this.ctx.closePath();
      },

      createBall(options, canvasWidth = this.canvasWidth, canvasHeight = this.canvasHeight) {
        class Circle {
          constructor(options) {
            this.cx = options.cx || 10;
            this.cy = options.cy || 10;
            this.r = options.r || 10;
            this.color = options.color || 'black';
            this.stepX = options.speed || 2;
            this.stepY = -options.speed || -2;
          }

          move() {
            // Меняем направление, если уперлись в стенку
            this.checkWall();

            // Делаем шаг
            this.cx += this.stepX;
            this.cy += this.stepY;
          }

          checkWall() {
            if (this.cx - this.r < 0 || this.cx + this.r > canvasWidth) {
              this.stepX = -this.stepX;
            }
            if (this.cy - this.r < 0 || this.cy + this.r > canvasHeight) {
              this.stepY = -this.stepY;
            }
          }
        }

        return new Circle(options)
      },
    },
    mounted() {
      setInterval(this.mainDraw, 10);
    }
  }
</script>

<style scoped>
  canvas {
    background: #eee;
    display: block;
    margin: 0 auto;
  }
</style>