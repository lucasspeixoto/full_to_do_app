import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.component";

import { ThemeProvider } from "@contexts/ThemeContext";
import { TasksContextProvider } from "@core/contexts/TasksContext";

ReactDOM.render(
  <React.StrictMode>
    <TasksContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TasksContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
