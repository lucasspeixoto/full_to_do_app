import { useContext } from "react";
import { TasksContext } from "@contexts/TasksContext";

export function useTasks() {
  const contextData = useContext(TasksContext);

  return contextData;
}
