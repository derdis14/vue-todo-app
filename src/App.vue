<template>
  <div class="container">
    <Header title="Todo App" @toggleNewTodo="toggleNewTodo" />
    <router-view :showNewTodo="showNewTodo"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  data() {
    return {
      showNewTodo: false,
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    toggleNewTodo() {
      this.showNewTodo = !this.showNewTodo;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  border: 1px solid black;
  border-radius: 5px;
  max-width: 500px;
  margin: 30px auto;
  padding: 30px;
}

a {
  color: black;
}

/* .material-icons-outlined.primary {
  color: var(--primary-color);
} */
</style>
