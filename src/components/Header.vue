<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="homePage"
      label="ADD"
      icon="pi pi-plus"
      class="p-button-raised p-button-rounded p-button-lg"
    />
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
};
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
