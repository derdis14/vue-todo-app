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
        :style="todo.done ? 'text-decoration: line-through' : null"
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

<script>
import { mapActions } from "vuex";

export default {
  props: {
    todo: Object,
  },
  methods: {
    ...mapActions(["update", "remove"]),
    toggleDone() {
      this.update({ ...this.todo, done: !this.todo.done });
    },
  },
};
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
