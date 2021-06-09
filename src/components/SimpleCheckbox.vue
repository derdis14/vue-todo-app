<template>
  <span class="material-icons-outlined" @click="$emit('toggle', !checked)">
    {{ checked ? "check_box" : "check_box_outline_blank" }}
  </span>
</template>

<script>
export default {
  name: "SimpleCheckbox",
  props: {
    checked: Boolean,
  },
  emits: ["toggle"],
};
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>
