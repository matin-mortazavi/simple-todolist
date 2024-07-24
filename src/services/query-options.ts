import { queryOptions } from "@tanstack/react-query";
import { getTodo } from "./todo";

export const todoQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["todos", { id }],
    queryFn: () => getTodo(id),
  });
