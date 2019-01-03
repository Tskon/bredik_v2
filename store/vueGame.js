export const state = () => ({
  // карта координат. Хранит диапазоны координат и колбеки
  xyMap: {

  },

  hero: {
    immortal: false,
    size:{
      width: 50,
      height: 50,
    },
    position: {
      x: 0,
      y: 0,
    },
    ammo:{
      m4a1: false,
      shotgun: false
    },
    parameters:{
      hp: 100,
      armor: 50,
      speed: 10,
    }
  }

});

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
};