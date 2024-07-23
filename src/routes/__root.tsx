import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
export const Route = createRootRoute({
  component: () => (
    <div className="w-[75%] mx-auto py-[32px]">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
