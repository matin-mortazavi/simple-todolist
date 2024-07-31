export interface Todo {
  id: string;
  isCompleted: boolean;
  title: string;
  priority: "high" | "low" | "medium";
}

export interface OptimisticTodo extends Todo {
  isPending: boolean;
}

export interface FetchedTodos {
  items: Todo[];
  total: number;
}
