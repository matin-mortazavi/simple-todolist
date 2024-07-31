import { createFileRoute } from "@tanstack/react-router";
import Todos from "@/pages/todo/todos";
import { todosQueryOptions } from "@/services/query-options";
import { todoConstant } from "@/constants";

interface todosSearch {
  page: number;
  limit: number;
}

export const Route = createFileRoute("/_protected/todos")({
  loader: ({ context: { client } }) => {
    client.ensureQueryData(todosQueryOptions(1, todoConstant.INITIAL_LIMIT));
  },
  component: Todos,
  validateSearch: (search: Record<string, unknown>): todosSearch => {
    return {
      page: Number(search?.page ?? 1),
      limit: Number(search?.limit ?? todoConstant.INITIAL_LIMIT),
    };
  },
});
