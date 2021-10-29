import { mount } from "@vue/test-utils";
import Todo from "@/components/Todo.vue";
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

describe("Todo.vue", () => {
  const mockStore = createStore();
  const wrapper = mount(Todo, {
    global: {
      plugins: [mockStore, PrimeVue],
    },
    props: {
      todo: initialState().todos[0],
    },
  });

  beforeEach(async () => {
    await wrapper.setProps({
      todo: initialState().todos[0],
    });
  });

  it("renders element for prop 'important'", async () => {
    expect(wrapper.find('[data-test="important"]').exists()).toBe(false);

    await wrapper.setProps({
      todo: initialState().todos[1],
    });

    expect(wrapper.find('[data-test="important"]').exists()).toBe(true);
  });

  it("changes style for prop 'done'", async () => {
    expect(wrapper.get('[data-test="done"]').attributes("style")).toBe(
      undefined
    );

    await wrapper.setProps({
      todo: initialState().todos[1],
    });

    expect(wrapper.get('[data-test="done"]').attributes("style")).toBe(
      "text-decoration: line-through;"
    );
  });

  it("toggles prop 'done'", async () => {
    expect(wrapper.props("todo").done).toBe(false);
    mockStore.dispatch = jest.fn();

    await wrapper.get('[data-test="toggleDone"]').trigger("click");

    expect(mockStore.dispatch).toBeCalledWith("update", {
      ...initialState().todos[0],
      done: true,
    });
  });

  it("removes todo", async () => {
    mockStore.dispatch = jest.fn();

    await wrapper.get('[data-test="remove"]').trigger("click");

    expect(mockStore.dispatch).toBeCalledWith(
      "remove",
      initialState().todos[0].id
    );
  });
});
