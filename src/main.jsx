import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
});

// TODO: Add this after converting codebase to TS
// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
