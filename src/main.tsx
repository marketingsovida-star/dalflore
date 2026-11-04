import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import "./design.css";
import "./science.css";
import "./microbiota-why.css";
import "./cards.css";
import "./header.css";
import "./catalog.css";
import "./expert.css";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

