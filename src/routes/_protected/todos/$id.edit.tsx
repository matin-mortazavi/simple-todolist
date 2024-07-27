import EditTodo from "@/pages/todo/edit-todo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/todos/$id/edit")({
  component: EditTodo,
});
