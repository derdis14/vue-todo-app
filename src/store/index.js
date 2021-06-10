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
      counter: 3,
    };
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter((todo) => todo.done === true);
    },
    undoneTodos(state) {
      return state.todos.filter((todo) => todo.done === false);
    },
  },
  mutations: {
    update(state, updatedTodo) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        } else {
          return todo;
        }
      });
    },
    add(state, newTodo) {
      newTodo.id = state.counter;
      state.counter++;
      state.todos.push(newTodo);
    },
    remove(state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index >= 0) {
        state.todos.splice(index, 1);
      } else {
        console.warn(`Todo with id=${id} doesn't exist.`);
      }
    },
  },
  actions: {},
  modules: {},
});
