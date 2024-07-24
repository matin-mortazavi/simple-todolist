import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { useAuthStore } from "../store/auth";

const client = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    client,
  },
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Providers = () => {
  const auth = useAuthStore((state) => state);

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
};

export default Providers;
