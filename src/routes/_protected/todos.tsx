import { createFileRoute } from "@tanstack/react-router";
import Todos from "../../pages/todos";

export const Route = createFileRoute("/_protected/todos")({
  component: Todos,
});
