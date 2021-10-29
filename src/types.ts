export interface TodoItem {
  id: number;
  text: string;
  done: boolean;
  important: boolean;
}

export interface TodosState {
  todos: TodoItem[];
  nextId: number;
}

export interface RootState {
  moduleTodos: TodosState;
}
