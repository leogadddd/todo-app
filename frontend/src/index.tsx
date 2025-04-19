import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.css";
import App from "./App";
import { TodoProvider } from "./context/todo-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>
);
