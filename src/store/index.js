import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      todos: [
        {
          id: 0,
          text: "First todo",
          done: false,
          important: true,
        },
        {
          id: 1,
          text: "Second todo",
          done: true,
          important: false,
        },
        {
          id: 2,
          text: "Third todo",
          done: false,
          important: false,
        },
      ],
    };
  },
  mutations: {},
  actions: {},
  modules: {},
});
