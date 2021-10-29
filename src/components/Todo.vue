<template>
  <div class="todo">
    <div class="todoA">
      <Checkbox
        class="checkbox"
        :modelValue="todo.done"
        :binary="true"
        @click="toggleDone"
        data-test="toggleDone"
      />

      <span
        v-if="todo.important"
        class="material-icons-outlined"
        data-test="important"
      >
        priority_high
      </span>

      <span
        :style="todo.done ? 'text-decoration: line-through' : undefined"
        data-test="done"
      >
        {{ todo.text }}
      </span>
    </div>

    <Button
      icon="pi pi-times"
      class="p-button-rounded p-button-text"
      @click="remove(todo.id)"
      data-test="remove"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useStore, mapActions } from "vuex";
import { TodoItem } from "@/types";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";

export default defineComponent({
  name: "Todo",
  props: {
    todo: {
      type: Object as PropType<TodoItem>,
      required: true,
    },
  },
  components: {
    Checkbox,
    Button,
  },
  /* setup(props) {
    const store = useStore();
    function update(updatedTodo: TodoItem) {
      store.dispatch("update", updatedTodo);
    }
    function remove(id: number) {
      store.dispatch("remove", id);
    }
    function toggleDone() {
      update({ ...props.todo, done: !props.todo.done });
    }
    return {
      update,
      remove,
      toggleDone,
    };
  }, */
  methods: {
    ...mapActions(["update", "remove"]),
    toggleDone() {
      this.update({ ...this.todo, done: !this.todo.done });
    },
  },
});
</script>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bluegray-100);
  margin: 0.5rem 0;
  padding: 0.25rem 0.5rem;
}

.todoA {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.checkbox {
  margin-right: 0.5rem;
}
</style>
