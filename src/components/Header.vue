<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="onHomePage"
      label="ADD"
      icon="pi pi-plus"
      class="p-button-raised p-button-rounded p-button-lg"
      @click="$emit('toggleNewTodo')"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";

export default defineComponent({
  name: "Header",
  props: {
    title: String,
  },
  components: {
    Button,
  },
  emits: ["toggleNewTodo"],
  computed: {
    onHomePage(): boolean {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
});
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
}
</style>
