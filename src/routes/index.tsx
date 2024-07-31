import { todoConstant } from "@/constants";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/todos",
      search: {
        page: 1,
        limit: todoConstant.INITIAL_LIMIT,
      },
    });
  },
});
