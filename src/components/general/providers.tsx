import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { useAuthStore } from "@/store/auth";
import NotFound from "@/pages/not-found";

const client = new QueryClient();

const router = createRouter({
  routeTree,
  // defaultPendingComponent: () => <Spin />,
  defaultNotFoundComponent: () => <NotFound />,
  //   defaultErrorComponent: ({ error }) => <span>sth went wrong {error}</span> />,
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
      <RouterProvider router={router} context={{ auth, client }} />
    </QueryClientProvider>
  );
};

export default Providers;
