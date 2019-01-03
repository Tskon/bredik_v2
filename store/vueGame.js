export const state = () => ({
  list: [5,3,7]
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