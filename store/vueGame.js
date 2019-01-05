export const state = () => ({
  // карта координат. Хранит диапазоны координат и колбеки
  xyMap: {},

  gameMap: {
    size: {
      width: 900,
      height: 600
    },
    yTranslation: 0
  },

  hero: {
    immortal: false,
    size: {
      width: 80,
      height: 80,
    },
    position: {
      x: 410,
      y: 400,
    },
    ammo: {
      m4a1: false,
      shotgun: false
    },
    parameters: {
      hp: 100,
      armor: 50,
      speed: 4,
    }
  },

  zombie1List: [
    // {
    //   immortal: false,
    //   index: 22, // номер в массиве зомби во vuex
    //   size: {
    //     width: 80,
    //     height: 80,
    //   },
    //   position: {
    //     x: 410,
    //     y:
    //       100,
    //   },
    //   parameters: {
    //     hp: 100,
    //     speed:
    //       1,
    //   }
    // }
  ],
});

export const mutations = {
  heroMoveX(state, dx) {
    let newPos = state.hero.position.x += dx;
    if (newPos < 0) newPos = 0;
    const lastXPoint = state.gameMap.size.width - state.hero.size.width - 4;
    if (newPos > lastXPoint) newPos = lastXPoint;
    state.hero.position.x = newPos;
  },
  heroMoveY(state, dy) {
    state.gameMap.yTranslation -= dy;
  },

  addZombie1(state, zombie) {
    state.zombie1List.push(zombie);
  },
  zombie1MoveX(state, dx, i) {
    state.zombie1List[0].position.x += dx;
  },
  zombie1MoveY(state, dy, i) {
    state.zombie1List[i].position.y += dy;
  },
  zombie1Del(state, i) {
    state.zombie1List[i] = null;
  },
};