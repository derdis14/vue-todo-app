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
      <Todos :todos="todos" />
    </div>
  </div>
</template>

<script>
import Todos from "./Todos";
import { mapState } from "vuex";

export default {
  name: "ShowTodos",
  data() {
    return {
      selectedOption: "ALL",
      options: ["ALL", "UNCHECKED", "CHECKED"],
    };
  },
  components: {
    Todos,
  },
  computed: {
    ...mapState(["todos"]),
  },
};
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
