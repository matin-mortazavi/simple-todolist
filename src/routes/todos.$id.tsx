import { createFileRoute } from "@tanstack/react-router";
import { getTodo } from "../services/todo";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/todos/$id")({
  component: Todo,
});

function Todo() {
  const { id } = Route.useParams();

  const { data } = useQuery({
    queryKey: ["todos", { id }],
    queryFn: () => getTodo({ id }),
  });

  console.log(data);
}
