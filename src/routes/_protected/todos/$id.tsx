import NotFound from "@/components/todo/not-found";
import Todo from "@/pages/todo";
import { todoQueryOptions } from "@/services/query-options";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/todos/$id")({
  loader: ({ context: { client }, params: { id } }) =>
    client.ensureQueryData(todoQueryOptions(id)),
  errorComponent: NotFound,
  component: Todo,
});
