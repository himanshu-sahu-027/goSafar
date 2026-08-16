import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./styles/style.scss";
import App from "./App.jsx";

import UserAuthProvider from "./features/auth/contexts/userAuth.context.jsx";
import CaptainAuthProvider from "./features/auth/contexts/captainAuth.context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CaptainAuthProvider>
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </CaptainAuthProvider>
  </BrowserRouter>,
);
