<template>
  <div class="todo">
    <div class="todoA">
      <Checkbox
        class="checkbox"
        :modelValue="todo.done"
        :binary="true"
        @click="log('toggled')"
      />

      <span v-if="todo.important" class="material-icons-outlined">
        priority_high
      </span>

      <span :style="todo.done ? 'text-decoration: line-through' : null">
        {{ todo.text }}
      </span>
    </div>

    <Button icon="pi pi-times" class="p-button-rounded p-button-text" />
  </div>
</template>

<script>
export default {
  props: {
    todo: Object,
  },
  computed: {
    log: () => console.log,
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
