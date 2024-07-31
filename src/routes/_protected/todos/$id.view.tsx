import ViewTodo from "@/pages/todo/view-todo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/todos/$id/view")({
  component: ViewTodo,
});
