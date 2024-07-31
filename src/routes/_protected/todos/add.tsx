import AddTodo from "@/pages/todo/add-todo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/todos/add")({
  component: AddTodo,
});
