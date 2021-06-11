function initialState() {
  return {
    todos: [
      {
        id: 0,
        text: "Explore todo app",
        done: false,
        important: false,
      },
    ],
    nextId: 1,
  };
}

export default {
  namespaced: false,
  state() {
    return initialState();
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
    setState(state, newState) {
      Object.entries(newState).forEach(([key, value]) => {
        state[key] = value;
      });
    },
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
      newTodo.id = state.nextId;
      state.nextId++;
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
};
