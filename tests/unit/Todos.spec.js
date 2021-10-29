import { mount } from "@vue/test-utils";
import Todos from "@/components/Todos.vue";
import { createStore } from "vuex";
import PrimeVue from "primevue/config";

function initialState() {
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

describe("Todos.vue", () => {
  const mockStore = createStore();
  const wrapper = mount(Todos, {
    global: {
      plugins: [mockStore, PrimeVue],
    },
  });

  it("renders todos", async () => {
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(0);

    await wrapper.setProps({
      todos: initialState().todos,
    });

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
  });
});
