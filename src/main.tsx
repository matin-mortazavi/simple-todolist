import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const client = new QueryClient();
const rootElem = document.getElementById("root")!;
if (!rootElem.innerHTML) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <StrictMode>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
