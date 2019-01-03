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

  zombie1: {
    immortal: false,
    size: {
      width: 80,
      height: 80,
    },
    position: {
      x: 410,
      y: 100,
    },
    parameters: {
      hp: 100,
      speed: 1,
    }
  }
});

export const mutations = {
  heroMoveX(state, x) {
    let newPos = state.hero.position.x += x;
    if (newPos < 0) newPos = 0;
    const lastXPoint = state.gameMap.size.width - state.hero.size.width - 4;
    if (newPos > lastXPoint) newPos = lastXPoint;
    state.hero.position.x = newPos;
  },
  heroMoveY(state, y) {
    state.gameMap.yTranslation -= y;
  },
};