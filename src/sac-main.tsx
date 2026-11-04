import React from "react";
import { createRoot } from "react-dom/client";
import { SacPage } from "./SacPage";
import "./style.css";
import "./design.css";
import "./cards.css";
import "./header.css";
import "./expert.css";
import "./footer.css";
import "./sac.css";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SacPage />
  </React.StrictMode>,
);
