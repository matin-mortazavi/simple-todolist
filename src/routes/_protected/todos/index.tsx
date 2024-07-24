import { createFileRoute } from "@tanstack/react-router";
import Todos from "@/pages/todos";
import { todoListOptions } from "@/services/query-options";
import { todoConstant } from "@/constants";

export const Route = createFileRoute("/_protected/todos/")({
  loader: ({ context: { client } }) => {
    client.ensureQueryData(todoListOptions(1, todoConstant.INITIAL_LIMIT));
  },
  component: Todos,
});
