import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route.jsx";
import AuthProvider from "./Providers/AuthProvider";
import { TaskProvider } from "./Context/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
