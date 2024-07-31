import { queryOptions } from "@tanstack/react-query";
import { getTodo, getTodos } from "./todo";

export const todosQueryOptions = (page: number, limit: number) =>
  queryOptions({
    queryKey: ["todos", page],
    queryFn: () => getTodos(page, limit),
  });

export const todoQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["todos", { id }],
    queryFn: () => getTodo(id),
  });
