import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context: { auth }, location }) => {
    if (auth.isAuthorized) return { username: auth.user.username };

    throw redirect({
      to: "/login",
      search: {
        redirect: location.href,
      },
    });
  },
});
