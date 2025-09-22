import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import "./index.css";

const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE; // optional
const redirectUri = window.location.origin;

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: redirectUri,
      ...(audience ? { audience } : {}), // ✅ only add if defined
      scope: "openid profile email",
    }}
  >
    <App />
  </Auth0Provider>
);
