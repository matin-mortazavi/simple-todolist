import { create } from "zustand";
import { Todo } from "../types/todo";

export const useTodoStore = create((set) => {
  return {
    todos: [],
    setTodos: (todos: Todo[]) => set(() => ({ todos: todos })),
  };
});
