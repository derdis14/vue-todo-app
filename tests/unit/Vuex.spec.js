import $store from "@/store";
import moduleTodos from "@/store/modules/todos";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

function firstState() {
  return {
    todos: [
      {
        id: 0,
        text: "First todo",
        done: false,
        important: false,
      },
      {
        id: 1,
        text: "Second todo",
        done: true,
        important: true,
      },
    ],
    nextId: 2,
  };
}

function secondState() {
  return {
    todos: [
      {
        id: 0,
        text: "First todo",
        done: false,
        important: false,
      },
    ],
    nextId: 1,
  };
}

function newTodo() {
  return {
    id: 1000,
    text: "New todo",
    done: false,
    important: false,
  };
}

function updatedTodo() {
  return {
    id: 1,
    text: "Second todo UPDATED",
    done: false,
    important: true,
  };
}

describe("Vuex getters", () => {
  beforeEach(() => {
    $store.commit("setState", firstState());
  });

  test("doneTodos", () => {
    expect($store.getters.doneTodos).toStrictEqual([
      $store.state.moduleTodos.todos[1],
    ]);
  });

  test("undoneTodos", () => {
    expect($store.getters.undoneTodos).toStrictEqual([
      $store.state.moduleTodos.todos[0],
    ]);
  });
});

describe("Vuex mutations", () => {
  beforeEach(() => {
    $store.commit("setState", firstState());
  });

  test("setState()", () => {
    expect($store.state.moduleTodos).toStrictEqual(firstState());

    $store.commit("setState", secondState());

    expect($store.state.moduleTodos).not.toStrictEqual(firstState());
    expect($store.state.moduleTodos).toStrictEqual(secondState());
  });

  test("update()", () => {
    expect($store.state.moduleTodos.todos[1]).not.toStrictEqual(updatedTodo());

    $store.commit("update", updatedTodo());

    expect($store.state.moduleTodos.todos[1]).toStrictEqual(updatedTodo());
  });

  test("add()", () => {
    expect($store.state.moduleTodos.todos).toHaveLength(2);

    $store.commit("add", newTodo());

    expect($store.state.moduleTodos.todos).toHaveLength(3);
    expect($store.state.moduleTodos.todos[2]).toStrictEqual({
      ...newTodo(),
      id: 2,
    });
  });

  test("remove()", () => {
    expect($store.state.moduleTodos.todos).toHaveLength(2);
    expect($store.state.moduleTodos.todos[0].id).toBe(0);

    $store.commit("remove", 0);

    expect($store.state.moduleTodos.todos).toHaveLength(1);
    expect($store.state.moduleTodos.todos[0].id).toBe(1);
  });

  test("remove() for invalid id", () => {
    expect($store.state.moduleTodos.todos).toHaveLength(2);
    console.warn = jest.fn();

    $store.commit("remove", 1000);

    expect($store.state.moduleTodos.todos).toHaveLength(2);
    expect(console.warn).toBeCalledTimes(1);
  });
});

function firstStateRemote() {
  return {
    todos: [
      {
        id: 0,
        text: "First todo",
        done: false,
        important: false,
      },
      {
        id: 1,
        text: "Second todo",
        done: true,
        important: true,
      },
    ],
    counter: {
      nextId: 2,
    },
  };
}

describe("Vuex actions", () => {
  test("loadState()", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios
      .onGet("api/counter")
      .reply(200, firstStateRemote().counter)
      .onGet("api/todos")
      .reply(200, firstStateRemote().todos);
    const commit = jest.fn();

    await moduleTodos.actions.loadState({ commit });

    expect(commit).toBeCalledWith("setState", firstState());
  });

  test("update()", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios
      .onGet("api/todos/1")
      .reply(200)
      .onPut("api/todos/1")
      .reply(200, updatedTodo());
    const commit = jest.fn();

    await moduleTodos.actions.update({ commit }, updatedTodo());

    expect(commit).toBeCalledWith("update", updatedTodo());
  });

  test("add()", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios
      .onGet("api/counter")
      .reply(200, firstStateRemote().counter)
      .onPost("api/todos")
      .reply(200, { ...newTodo(), id: 2 })
      .onPut("api/counter")
      .reply(200);
    const commit = jest.fn();

    await moduleTodos.actions.add({ commit }, newTodo());

    expect(commit).toBeCalledWith("add", { ...newTodo(), id: 2 });
  });

  test("remove()", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onDelete("api/todos/1").reply(200);
    const commit = jest.fn();

    await moduleTodos.actions.remove({ commit }, 1);

    expect(commit).toBeCalledWith("remove", 1);
  });

  it("catches axios errors", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onAny().networkError();
    const commit = jest.fn();
    console.error = jest.fn();

    await moduleTodos.actions.loadState({ commit });
    await moduleTodos.actions.update({ commit }, updatedTodo());
    await moduleTodos.actions.add({ commit }, newTodo());
    await moduleTodos.actions.remove({ commit }, 1);

    expect(console.error).toBeCalledTimes(4);
  });

  it("handles axios internal server error", async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onAny().reply(500);
    const commit = jest.fn();
    console.error = jest.fn();
    console.log = jest.fn();

    await moduleTodos.actions.loadState({ commit });

    expect(console.error).toBeCalledTimes(1);
    expect(console.log).toBeCalledTimes(1);
  });
});
