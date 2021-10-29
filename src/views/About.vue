<template>
  <div class="containerOutside">
    <div class="containerInside">
      <h3>Built using:</h3>
      <ul>
        <li>Vue 3</li>
        <li>TypeScript</li>
        <li>Vuex</li>
        <li>Vue Router</li>
        <li>PrimeVUE</li>
        <li>JSON Server</li>
        <li>Jest</li>
      </ul>
      <router-link to="/">Go back</router-link>
    </div>
    <img src="../assets/logo.png" alt="Vue logo" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
});
</script>

<style scoped>
ul {
  list-style-position: inside;
  margin-bottom: 0.5rem;
}

h3 {
  margin-bottom: 0.25rem;
}

.containerOutside {
  display: flex;
  align-items: center;
}

.containerOutside > * {
  flex-grow: 1;
}

img {
  height: 125px;
  object-fit: scale-down;
}
</style>
