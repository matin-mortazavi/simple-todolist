import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthStore } from "@/store/auth";
import { QueryClient } from "@tanstack/react-query";
export const Route = createRootRouteWithContext<{
  auth: AuthStore;
  client: QueryClient;
}>()({
  component: () => (
    <div className="w-[75%] mx-auto py-[32px]">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
