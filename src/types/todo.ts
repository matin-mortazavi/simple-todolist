export interface Todo {
  id: string;
  isComplated: boolean;
  title: string;
  priority: "high" | "low" | "medium";
}
