import React from "react";
import ReactDOM from "react-dom/client";
import { RayAuthProvider, providers } from "rayauth-react/src";
import App from "./App";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RayAuthProvider
      config={{
        clientId: "63fc80e8da0cb8775e46fc73",
        callbackUrl: "http://localhost:5173",
        provider: providers.google,
        cookieName: "cookie"
      }}
    >
      <App />
    </RayAuthProvider>
  </React.StrictMode>
);
