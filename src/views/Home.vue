<template>
  <NewTodo class="form" />
  <ShowTodos />
</template>

<script>
import NewTodo from "../components/NewTodo";
import ShowTodos from "../components/ShowTodos";

export default {
  name: "Home",
  components: {
    NewTodo,
    ShowTodos,
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 3rem;
}
</style>
