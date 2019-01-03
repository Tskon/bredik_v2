<template>
  <main>
    <h1>canvas-game</h1>
    <p>Цель игры: не попасться квадратом на движущиеся шары.</p>
    <p>
      Управление квадратом: двигать квадрат можно стрелками, после старта дается неуязвимость
      (отображается миганием квадрата).
    </p>
    <canvas id="canvas-game" :width="canvasWidth" :height="canvasHeight" class="game-board"></canvas>
    <div class="controls">
      <button @click="gameStart" class="controls__startBtn">Старт</button>
      <button @click="gameStop" class="controls__stopBtn">Пауза</button>
      <button @click="reset" class="controls__stopBtn">Сбросить</button>
    </div>
  </main>
</template>

<script>
  export default {
    name: "canvas-game",
    data() {
      return {
        canvasWidth: 640,
        canvasHeight: 480,
        heroSize: {w: 50, h: 50},
        interval: undefined,
        isGameStarted: false,
        theHero: {},
        ballsInitData: [
          {
            r: 5,
            color: "red",
            speed: 3
          },
          {
            cx: 250,
            cy: 105,
            r: 30,
            color: "yellow",
            speed: 2
          },
          {
            cx: 500,
            cy: 400,
            r: 50,
            color: "seagreen",
            speed: 1
          },
          {
            cx: 60,
            cy: 60,
            r: 20,
            color: "gold",
            speed: 3
          },
        ],
        ballsList: [],
      }
    },
    computed: {
      canvas() {
        return document.getElementById('canvas-game')
      },
      ctx() {
        return this.canvas.getContext('2d');
      },
    },
    methods: {
      // Запустить после монтирования
      gameInit() {
        this.theHero = this.createHero({heroWidth: this.heroSize.w, heroHeight: this.heroSize.h});
        this.ballsList = this.ballsInitData.map(ball => this.createBall(ball));

        // отрисовываем начальное состояние
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ballsList.forEach(ball => {
          this.drawBall(ball);
        });
        this.drawHero(this.theHero);
      },

      mainDraw() {
        // Очищаем поле каждую итерацию отрисовки
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.ballsList.forEach(ball => {
          // Делам сдвиг в объекте мяча
          ball.move();
          // Рисуем мяч, аргумент - объект мяча
          this.drawBall(ball);
        });

        // Двигаем героя, если требуется
        this.theHero.move();
        // Рисуем героя
        this.drawHero(this.theHero);
      },

      drawBall(circleObj) {
        this.ctx.beginPath();
        this.ctx.arc(circleObj.cx, circleObj.cy, circleObj.r, 0, Math.PI * 2);
        this.ctx.fillStyle = circleObj.color;
        this.ctx.fill();
        this.ctx.closePath();
      },

      drawHero(heroObj) {
        this.ctx.beginPath();
        this.ctx.rect(heroObj.x, heroObj.y, heroObj.width, heroObj.height);
        this.ctx.fillStyle = heroObj.color;
        this.ctx.fill();
        this.ctx.closePath();
      },

      createHero(options = {}, canvasWidth = this.canvasWidth, canvasHeight = this.canvasHeight) {
        class Hero {
          constructor(options = {}, canvasWidth, canvasHeight) {
            this.width = options.heroWidth || 20;
            this.height = options.heroHeight || 20;
            this.x = options.x || (canvasWidth - this.width) / 2;
            this.y = options.y || canvasHeight - this.height;
            this.color = options.color || 'darkblue';
            this.leftBtn = options.rightBtn || 'ArrowLeft';
            this.rightBtn = options.rightBtn || 'ArrowRight';
            this.upBtn = options.rightBtn || 'ArrowUp';
            this.downBtn = options.rightBtn || 'ArrowDown';
            this.speed = options.speed || 2;
            this.leftPressed = false;
            this.rightPressed = false;
            this.upPressed = false;
            this.downPressed = false;
            this.isImmortal = false;

            this.init();
          }

          move() {
            if (this.leftPressed) {
              this.x -= this.speed;
              if (this.x < 0) this.x = 0;
            }
            if (this.rightPressed) {
              this.x += this.speed;
              const rightWallX = canvasWidth - this.width;
              if (this.x > rightWallX) this.x = rightWallX;
            }
            if (this.upPressed) {
              this.y -= this.speed;
              if (this.y < 0) this.y = 0;
            }
            if (this.downPressed) {
              this.y += this.speed;
              const topWallY = canvasHeight - this.height;
              if (this.y > topWallY) this.y = topWallY;
            }
          }

          init() {
            document.addEventListener('keydown', e => this.keyDownHandler(e));
            document.addEventListener('keyup', e => this.keyUpHandler(e));
          }

          keyDownHandler(e) {
            if (e.key === this.leftBtn) {
              e.preventDefault();
              this.leftPressed = true;
            }
            if (e.key === this.rightBtn) {
              e.preventDefault();
              this.rightPressed = true;
            }
            if (e.key === this.upBtn) {
              e.preventDefault();
              this.upPressed = true;
            }
            if (e.key === this.downBtn) {
              e.preventDefault();
              this.downPressed = true;
            }
          }

          keyUpHandler(e) {
            if (e.key === this.leftBtn) {
              this.leftPressed = false;
            }
            if (e.key === this.rightBtn) {
              this.rightPressed = false;
            }
            if (e.key === this.upBtn) {
              e.preventDefault();
              this.upPressed = false;
            }
            if (e.key === this.downBtn) {
              e.preventDefault();
              this.downPressed = false;
            }
          }

          giveImmortal(sec) {
            this.isImmortal = true;

            const initColor = this.color;
            const immortalColor = 'gold';

            // Мигание при неуязвимости
            const blinkInterval = setInterval(() => {
              if (this.color === immortalColor) {
                this.color = initColor;
              } else {
                this.color = immortalColor;
              }
            }, 100);

            setTimeout(() => {
              this.isImmortal = false;
              clearInterval(blinkInterval);
              this.color = initColor;
            }, sec * 1000);
          }
        }

        return new Hero(options, canvasWidth, canvasHeight);
      },

      createBall(options = {}, canvasWidth = this.canvasWidth, canvasHeight = this.canvasHeight) {
        const game = this;

        class Circle {
          constructor(options) {
            this.cx = options.cx || canvasWidth / 2;
            this.cy = options.cy || canvasHeight / 2;
            this.r = options.r || 10;
            this.color = options.color || 'black';
            this.stepX = options.speed || 2;
            this.stepY = -options.speed || -2;
          }

          move() {
            // Меняем направление, если уперлись в стенку
            this.checkWall();

            // Проверяем удар о героя
            this.checkHero();

            // Проверяем удар о другие мячи
            this.checkBalls();

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

          checkBalls() {
            game.ballsList.forEach(ball => {
              if (ball.cx !== this.cx && ball.cy !== this.cy) { // проверяем что это другой шар
                let diffX = ball.cx - this.cx;
                if (diffX < 0) diffX = -diffX;

                let diffY = ball.cy - this.cy;
                if (diffY < 0) diffY = -diffY;

                if (Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < this.r + ball.r) {
                  this.stepX = -this.stepX;
                  this.stepY = -this.stepY;
                }
                ;
              }
            });
          }

          checkHero() {
            // проверка на поппадание
            if (this.cx - this.r < game.theHero.x + game.theHero.width && this.cx + this.r > game.theHero.x) {
              if (this.cy + this.r > game.theHero.y && this.cy - this.r < game.theHero.y + game.theHero.height) {
                const x1 = game.theHero.x;
                const x2 = game.theHero.x + game.theHero.width;
                const y1 = game.theHero.y;
                const y2 = game.theHero.y + game.theHero.height;

                let diffX = game.theHero.x + (game.theHero.width / 2) - this.cx;
                let diffY = game.theHero.y + (game.theHero.height / 2) - this.cy;

                // проверка что герой неуязвим и что ни одна из крайних точек или центром стороны не пересекает границу круга
                if (!game.theHero.isImmortal && (
                  isCrossCircleLine(x1, y1, this.cx, this.cy, this.r) ||
                  isCrossCircleLine(x1, y2, this.cx, this.cy, this.r) ||
                  isCrossCircleLine(x2, y1, this.cx, this.cy, this.r) ||
                  isCrossCircleLine(x2, y2, this.cx, this.cy, this.r) ||
                  Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < this.r + ((game.theHero.width + game.theHero.height) / 2)
                )) {
                  game.gameStop();
                }

                function isCrossCircleLine(dotX, dotY, circleX, circleY, circleR) {
                  // проверка что расстояние от точки до центра круга меньше радиуса
                  return Math.pow(dotX - circleX, 2) + Math.pow(dotY - circleY, 2) < Math.pow(circleR, 2);
                }
              }
            }
          }
        }

        return new Circle(options)
      },

      gameStart() {
        if (!this.isGameStarted) {
          this.isGameStarted = true;
          this.interval = setInterval(this.mainDraw, 10);
          this.theHero.giveImmortal(3);
        }
      },

      gameStop() {
        clearInterval(this.interval);
        this.isGameStarted = false
      },

      reset() {
        this.gameStop();
        this.gameInit();
      }
    },
    mounted() {
      this.gameInit();
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