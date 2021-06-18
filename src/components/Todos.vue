<template>
  <div v-for="todo in todos" :key="todo.id">
    <Todo :todo="todo" data-test="todo" />
  </div>
</template>

<script>
import Todo from "./Todo";

export default {
  props: {
    todos: Array,
  },
  components: {
    Todo,
  },
};
</script>

<style scoped></style>
