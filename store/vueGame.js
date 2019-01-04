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

  zombie1List: [],
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

  addZombie1(state, zombie){
    state.zombie1List.push(zombie);
  },
  zombie1MoveX(state, dx, i) {
    if(i && state.zombie1List[0]) state.zombie1List[0].position.x += dx;
    console.log(state.zombie1List[0])
  },
  zombie1MoveY(state, dy, i) {
    if(i && state.zombie1List[0]) state.zombie1List[i].position.y += dy;
  },
};