<template>
  <div>
    <div class="options">
      <h3 class="show" for="">Show:</h3>
      <div v-for="option in options" :key="option" class="p-field-radiobutton">
        <RadioButton
          :id="option"
          name="option"
          :value="option"
          v-model="selectedOption"
          class="radioButton"
        />
        <label :for="option">{{ option }}</label>
      </div>
    </div>

    <div class="todos">
      <Todos :todos="filteredTodos" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Todos from "@/components/Todos.vue";
import { mapGetters } from "vuex";
import RadioButton from "primevue/radiobutton";
import { TodoItem } from "@/types";

export default defineComponent({
  name: "ShowTodos",
  data() {
    return {
      selectedOption: "ALL",
      options: ["ALL", "UNCHECKED", "CHECKED"],
    };
  },
  components: {
    Todos,
    RadioButton,
  },
  computed: {
    todos(): TodoItem[] {
      return this.$store.state.moduleTodos.todos;
    },
    ...mapGetters(["doneTodos", "undoneTodos"]),
    filteredTodos(): TodoItem[] {
      switch (this.selectedOption) {
        case "UNCHECKED":
          return this.undoneTodos;
        case "CHECKED":
          return this.doneTodos;
        default:
          return this.todos;
      }
    },
  },
});
</script>

<style scoped>
.options {
  display: flex;
  margin-bottom: 1rem;
}
.show,
label {
  margin-right: 0.5rem;
}
.radioButton {
  margin-right: 0.25rem;
}

.p-field-radiobutton > * {
  cursor: pointer;
}
</style>
