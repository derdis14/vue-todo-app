<template>
  <div class="containerOutside">
    <div class="containerInside">
      <h3>Oops ... this URL doesn't exist</h3>
      <router-link to="/">Go back</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFoundComponent",
});
</script>
