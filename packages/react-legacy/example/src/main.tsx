import React from "react";
import ReactDOM from "react-dom/client";
import { RayAuthProvider } from "../../src/providers";
import App from "./App";
import "./index.css";
import { providers } from "../../src/enums";
import "../../src/tailwind.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RayAuthProvider
      config={{
        clientId: "63fc80e8da0cb8775e46fc73",
        callbackUrl: "http://localhost:5173",
        provider: providers.google,
        cookieName: "Hi"
      }}
    >
      <App />
    </RayAuthProvider>
  </React.StrictMode>
);
