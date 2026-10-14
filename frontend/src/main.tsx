import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";

const useMocks =
  import.meta.env.VITE_USE_MOCKS === "true" ||
  (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS !== "false");

if (useMocks) {
  const { worker } = await import("./mocks/browser");
  await worker.start();
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root was not found.");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
