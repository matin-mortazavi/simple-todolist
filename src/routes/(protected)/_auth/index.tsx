import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/_auth/")({
  beforeLoad: ({ context: { auth }, location }) => {
    if (!auth.isAuthorized) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    return {
      username: auth.user.username,
    };
  },
});
