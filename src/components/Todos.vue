<template>
  <div v-for="todo in todos" :key="todo.id">
    <Todo :todo="todo" data-test="todo" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Todo from "@/components/Todo.vue";
import { TodoItem } from "@/types";

export default defineComponent({
  name: "Todos",
  props: {
    todos: Array as PropType<TodoItem[]>,
  },
  components: {
    Todo,
  },
});
</script>
