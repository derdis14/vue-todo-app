<template>
  <NewTodo v-if="showNewTodo" class="form" />
  <ShowTodos />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import NewTodo from "@/components/NewTodo.vue";
import ShowTodos from "@/components/ShowTodos.vue";

export default defineComponent({
  name: "Home",
  props: {
    showNewTodo: {
      type: Boolean,
    },
  },
  components: {
    NewTodo,
    ShowTodos,
  },
});
</script>

<style scoped>
.form {
  margin-bottom: 3rem;
}
</style>
