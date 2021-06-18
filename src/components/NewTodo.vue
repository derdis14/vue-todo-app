<template>
  <form @submit.prevent="onSubmit" data-test="form">
    <div class="todo">
      <span class="p-float-label">
        <InputText
          id="todo"
          type="text"
          v-model="text"
          ref="input"
          data-test="text"
        />
        <label for="todo">New Task</label>
      </span>
    </div>

    <div class="important">
      <label for="important">Important</label>
      <Checkbox
        id="important"
        v-model="important"
        :binary="true"
        data-test="important"
      />
    </div>

    <Button label="SAVE" class="p-button" type="submit" data-test="button" />
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NewTodo",
  data() {
    return {
      text: "",
      important: false,
    };
  },
  methods: {
    ...mapActions(["add"]),
    onSubmit() {
      if (this.text.length <= 0) {
        console.log("Please add text!");
      } else {
        const newTodo = {
          text: this.text,
          done: false,
          important: this.important,
        };
        this.add(newTodo);
        this.text = "";
      }
      this.focusInput();
    },
    focusInput() {
      this.$refs.input.$el.focus();
    },
  },
  mounted() {
    this.focusInput();
  },
};
</script>

<style scoped>
div {
  margin-bottom: 0.5rem;
}

.important {
  display: flex;
  align-items: flex-start;
}
.important > * {
  margin-right: 0.5rem;
}

#todo {
  width: 100%;
}

.p-button {
  width: 100%;
}
</style>
