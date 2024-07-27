import { create } from "zustand";
import { Todo } from "@/types/todo";

export interface TodoStore {
  todos: Todo[];
  totalTodos: number;
  setTodos: (todos: Todo[]) => void;
  setTotalTodos: (amount: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => {
  return {
    todos: [],
    totalTodos: 0,
    setTodos: (todos) => set(() => ({ todos: todos })),
    setTotalTodos: (amount) => set(() => ({ totalTodos: amount })),
  };
});
