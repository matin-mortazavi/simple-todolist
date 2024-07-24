import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { auth } from "./utils/auth";
import Providers from "./components/providers";


const rootElem = document.getElementById("root")!;
if (!rootElem.innerHTML) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <StrictMode>
     <Providers/>
    </StrictMode>
  );
}
