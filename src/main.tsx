import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Providers from "./components/providers";

import "./index.css";

const rootElem = document.getElementById("root")!;
if (!rootElem.innerHTML) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <StrictMode>
      <Providers />
    </StrictMode>
  );
}
