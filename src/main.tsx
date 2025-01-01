import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function startApp() {
  // Only try to start MSW in development
  if (process.env.NODE_ENV === "development") {
    try {
      const { worker } = await import("./mocks/browser");
      await worker
        .start({
          onUnhandledRequest: "bypass",
        })
        .catch(console.error);
    } catch (error) {
      console.warn("MSW initialization failed:", error);
    }
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

startApp();
