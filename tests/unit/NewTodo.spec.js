import { mount } from "@vue/test-utils";
import NewTodo from "@/components/NewTodo.vue";
import { createStore } from "vuex";
import PrimeVue from "primevue/config";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import RadioButton from "primevue/radiobutton";

describe("NewTodo.vue", () => {
  const mockStore = createStore();
  const wrapper = mount(NewTodo, {
    global: {
      plugins: [mockStore, PrimeVue],
      components: {
        Button,
        InputText,
        Checkbox,
        RadioButton,
      },
    },
    attachTo: document.body,
  });

  beforeEach(async () => {
    await wrapper.setData({
      text: "",
      important: false,
    });
  });

  it("sets todo data", async () => {
    expect(wrapper.vm.text).toBe("");
    expect(wrapper.vm.important).toBe(false);
    const newText = "New todo";

    await wrapper.get('[data-test="text"]').setValue(newText);
    await wrapper.get('[data-test="important"]').trigger("click");

    expect(wrapper.vm.text).toBe(newText);
    expect(wrapper.vm.important).toBe(true);
  });

  it("adds todo", async () => {
    expect(wrapper.get('[data-test="button"]').attributes("type")).toBe(
      "submit"
    );
    mockStore.dispatch = jest.fn();
    const newText = "New todo";

    await wrapper.setData({
      text: newText,
      important: true,
    });
    await wrapper.get('[data-test="form"]').trigger("submit");

    expect(mockStore.dispatch).toBeCalledTimes(1);
    expect(mockStore.dispatch).toBeCalledWith("add", {
      id: undefined,
      text: newText,
      done: false,
      important: true,
    });
  });

  it("clears text after add todo", async () => {
    await wrapper.setData({
      text: "New todo",
      important: true,
    });
    expect(wrapper.vm.text).not.toBe("");

    await wrapper.get('[data-test="form"]').trigger("submit");

    expect(wrapper.vm.text).toBe("");
  });

  it("rejects adding todo without text", async () => {
    expect(wrapper.vm.text).toBe("");
    mockStore.dispatch = jest.fn();
    console.log = jest.fn();

    await wrapper.get('[data-test="form"]').trigger("submit");

    expect(mockStore.dispatch).toBeCalledTimes(0);
    expect(console.log).toBeCalledTimes(1);
  });

  it("has focus on text input on mount", async () => {
    const input = wrapper.get('[data-test="text"]').element;

    expect(input).toBe(document.activeElement);
  });

  it("sets focus on text input on submit", async () => {
    const input = wrapper.get('[data-test="text"]').element;
    await wrapper.get('[data-test="important"]').trigger("click");
    expect(input).not.toBe(document.activeElement);

    await wrapper.get('[data-test="text"]').setValue("New todo");
    await wrapper.get('[data-test="form"]').trigger("submit");

    expect(input).toBe(document.activeElement);
  });

  it("sets focus on text input on invalid submit", async () => {
    const input = wrapper.get('[data-test="text"]').element;
    await wrapper.get('[data-test="important"]').trigger("click");
    expect(input).not.toBe(document.activeElement);

    await wrapper.get('[data-test="form"]').trigger("submit");

    expect(input).toBe(document.activeElement);
  });
});
