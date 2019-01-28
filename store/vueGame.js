export const state = () => ({
  // карта координат. Хранит диапазоны координат и колбеки
  xyMap: {},

  gameMap: {
    size: {
      width: 900,
      height: 600
    },
    yTranslation: 0,
    hitGrid: {} // y100 { y10:{ x100: { x10: { data + callback } } } }
  },

  hero: {
    immortal: false,
    size: {
      width: 40,
      height: 40,
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
      speed: 5,
    }
  },

  zombie1List: [],


});

export const mutations = {
  heroMove(state, delta) {
    state.hero.position.x += delta.x;
  },
  hitHero(state,dmg){
    if (state.hero.parameters.hp - dmg < 0){
      state.hero.parameters.hp = 0;
    } else {
      state.hero.parameters.hp -= dmg;
    }
  },

  yTranslationChange(state, delta) {
    state.gameMap.yTranslation -= delta;
  },

  addZombie1(state, zombie) {
    state.zombie1List.push(zombie);
  },

  zombie1Move(state, data) {
    if (data.delta.x) state.zombie1List[ data.index ].position.x += data.delta.x;
    if (data.delta.y) state.zombie1List[ data.index ].position.y += data.delta.y;
  },

  zombie1Del(state, i) {
    state.zombie1List[ i ] = null;
  },
};