import { createFileRoute } from "@tanstack/react-router";
import Todos from "@/pages/todos";
import { todoListOptions } from "@/services/query-options";

export const Route = createFileRoute("/_protected/todos/")({
  loader: ({ context: { client } }) => {
    client.ensureQueryData(todoListOptions(1,6));
  },
  component: Todos,
});
