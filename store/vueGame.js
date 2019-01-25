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
  hitGridAddObject(state, data) {

    const width = data.width;
    const height = data.height;

    // цикл для заполнения положения объекта в сетку на карте. Заполняется кратно 10 пикселям
    for (let y = 0; y < height; y += 10) {
      for (let x = 0; x < width; x += 10) {
        fillIteration(x, y, data.isNeedClear || false);
      }
    }

    // заполняет hitGrid, вызывает коллбеки объектов при коллизии
    function fillIteration(x, y, clear = false) {
      const parsedY = parseNumber(data.y + y, 'y');
      const parsedX = parseNumber(data.x + x, 'x');

      // Если запись не пустая
      if (state.gameMap.hitGrid[ parsedY.hundred ] && state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ] &&
        state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ][ parsedX.hundred ] &&
        state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ][ parsedX.hundred ][ parsedX.decimal ]) {

        const hitGridObj = state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ][ parsedX.hundred ][ parsedX.decimal ];

        if (!clear){ // когда не надо очищать поле
          if (typeof data.callback === 'function') {
            data.callback({
              passive: false, // владелец коллбека сам взаимодействует с объектом
              object: hitGridObj.object
            });
          }
          if (typeof hitGridObj.callback === 'function') {
            hitGridObj.callback({
              passive: true, // другой объект взаимодействует с владельцем коллбека
              object: data.self
            });
          }
        } else { // когда надо очищать поле
          state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ][ parsedX.hundred ] = {};
        }


        // Если не ничего записано
      } else if(!clear) {
        if (!state.gameMap.hitGrid.hasOwnProperty(parsedY.hundred)) state.gameMap.hitGrid[ parsedY.hundred ] = {};
        if (!state.gameMap.hitGrid[ parsedY.hundred ].hasOwnProperty(parsedY.decimal)) state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ] = {};
        if (!state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ].hasOwnProperty(parsedX.hundred)) state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ][ parsedX.hundred ] = {};

        state.gameMap.hitGrid[ parsedY.hundred ][ parsedY.decimal ][ parsedX.hundred ][ parsedX.decimal ] = {
          object: data.self,
          callback: (typeof data.callback === 'function') ? data.callback : () => {
          }
        };
      }
    }

    function parseNumber(num, prefix) {
      const hundred = (num < 0) ? Math.ceil(num / 100) * 100 : Math.floor(num / 100) * 100;
      const decimal = prefix + (num < 0) ? Math.ceil((num - hundred) / 10) * 10 : Math.floor((num - hundred) / 10) * 10;
      return { hundred: prefix + hundred, decimal: prefix + decimal }
    }
  },

  heroMove(state, delta) {
    state.hero.position.x += delta.x;
  },
  hitHero(state,dmg){
    state.hero.parameters.hp -= dmg;
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