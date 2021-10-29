import { createStore } from "vuex";
import todos from "./modules/todos";
import { RootState } from "@/types";

export default createStore<RootState>({
  modules: {
    moduleTodos: todos,
  },
});
