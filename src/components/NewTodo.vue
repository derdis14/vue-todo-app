<template>
  <form @submit.prevent="onSubmit">
    <div class="todo">
      <span class="p-float-label">
        <InputText id="todo" type="text" v-model="text" />
        <label for="todo">New Task</label>
      </span>
    </div>

    <div class="important">
      <label for="important">Important</label>
      <Checkbox id="important" v-model="important" :binary="true" />
    </div>

    <Button label="SAVE" class="p-button" type="submit" />
  </form>
</template>

<script>
export default {
  name: "NewTodo",
  data() {
    return {
      text: "",
      important: false,
    };
  },
  methods: {
    onSubmit() {},
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
