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
      speed: 5,
    }
  },

  zombie1List: [],


});

export const mutations = {
  hitGridAddObject(state, data){
    const testData = {
      x:253,
      y:1631,
      width: 60,
      height: 60,
      callback: ()=>{console.log('=== test object callback ===')}
    };
    data = testData;

    const parsedY = parseNumber(data.y);
    const parsedX = parseNumber(data.x);

    if (state.gameMap.hitGrid[data.y.hundred] && state.gameMap.hitGrid[data.y.hundred][data.y.decimal] &&
        state.gameMap.hitGrid[data.y.hundred][data.y.decimal][data.x.hundred] &&
        state.gameMap.hitGrid[data.y.hundred][data.y.decimal][data.x.hundred][data.x.decimal]){

      console.log('Координата занята')

    } else {
      if (!state.gameMap.hitGrid.hasOwnProperty(data.y.hundred)) state.gameMap.hitGrid[data.y.hundred] = {};
      if (!state.gameMap.hitGrid[data.y.hundred].hasOwnProperty(data.y.decimal)) state.gameMap.hitGrid[data.y.hundred][data.y.decimal] = {};
      if (!state.gameMap.hitGrid[data.y.hundred][data.y.decimal].hasOwnProperty(data.x.hundred)) state.gameMap.hitGrid[data.y.hundred][data.y.decimal][data.x.hundred] = {};

      state.gameMap.hitGrid[data.y.hundred][data.y.decimal][data.x.hundred][data.x.decimal] = 'testStr';
    }


    console.log(state.gameMap.hitGrid[data.y.hundred][data.y.decimal][data.x.hundred][data.x.decimal]);

    function parseNumber(num){
      const hundred = Math.floor(num / 100) * 100;
      const decimal = Math.floor((num - hundred) / 10) * 10;
      return { hundred, decimal}
    }
  },
  heroMove(state, delta) {
    state.hero.position.x += delta.x;
  },
  yTranslationChange(state, delta) {
    state.gameMap.yTranslation -= delta;
  },
  addZombie1(state, zombie) {
    state.zombie1List.push(zombie);
  },
  zombie1Move(state, data) {
    if (data.delta.x) state.zombie1List[data.index].position.x += data.delta.x;
    if (data.delta.y) state.zombie1List[data.index].position.y += data.delta.y;
  },
  zombie1Del(state, i) {
    state.zombie1List[i] = null;
  },
};