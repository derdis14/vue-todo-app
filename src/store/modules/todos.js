import axios from "axios";

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
  actions: {
    async loadState({ commit }) {
      const newState = await fetchAll();
      if (!newState) {
        return;
      }

      newState.nextId = newState.counter.nextId;
      delete newState.counter;
      commit("setState", newState);
    },

    async update({ commit }, updatedTodo) {
      try {
        await axios.get(`api/todos/${updatedTodo.id}`);
        const res = await axios.put(`api/todos/${updatedTodo.id}`, updatedTodo);
        commit("update", res.data);
      } catch (error) {
        console.error(error.message);
      }
    },

    async add({ commit }, newTodo) {
      try {
        const nextId = (await axios.get("api/counter")).data.nextId;
        newTodo.id = nextId;
        const counter = { nextId: nextId + 1 };

        const res = await axios.post("api/todos", newTodo);
        await axios.put("api/counter", counter);

        commit("add", res.data);
      } catch (error) {
        console.error(error.message);
      }
    },

    async remove({ commit }, id) {
      try {
        await axios.delete(`api/todos/${id}`);
        commit("remove", id);
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};

async function fetchAll() {
  try {
    const todos = axios.get("api/todos");
    const counter = axios.get("api/counter");
    const res = await Promise.all([todos, counter]);
    const resState = {
      todos: res[0].data,
      counter: res[1].data,
    };
    return resState;
  } catch (error) {
    console.error(error.message);
    if (error.response && error.response.status >= 500) {
      console.log("TERMINAL COMMAND TO START BACKEND: \nnpm run backend");
    }
  }
}
