import React, { createContext, useState, useEffect, useCallback } from "react";

import useLocalStorage from "@core/hooks/useLocalStorage";
import { ITasks } from "@core/types/tasks";
import api from "@core/services/api";

import toast, { ToastBar, Toaster } from "react-hot-toast";

export interface TasksContextType {
  tasks: ITasks[];
  selectedFilter: string;
  changeTasksFilter: (filter: string) => void;
  getTasks: () => Promise<void>;
  checkLateTasks: () => void;
  lateTasksNumber: number;
  createTask: (task: Partial<ITasks>) => Promise<void>;
}

const lastFilter = localStorage.getItem("@todo:selectedFilter");

export const TasksContext = createContext({} as TasksContextType);

export const TasksContextProvider: React.FC = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useLocalStorage<string>(
    "@todo:selectedFilter",
    lastFilter ? lastFilter : "mytasks"
  );

  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [lateTasksNumber, setLateTasksNumber] = useState();

  const getTasks = useCallback(async () => {
    await api
      .get(`/task/filter/${selectedFilter}/11:11:11:11:11:11`)
      .then((response) => {
        setTasks(response.data);
      });
  }, [selectedFilter]);

  const changeTasksFilter = useCallback(
    (filter: string) => {
      setSelectedFilter(filter);
      localStorage.setItem("@todo:selectedFilter", filter);
    },
    [setSelectedFilter]
  );

  const checkLateTasks = useCallback(async () => {
    await api.get(`/task/filter/late/11:11:11:11:11:11`).then((response) => {
      if (response.data) {
        const numberOfLateTasks = response.data.length;
        setLateTasksNumber(numberOfLateTasks);
      }
    });
  }, []);

  const createTask = async (task: Partial<ITasks>) => {
    await api
      .post("/task", task)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message, {
            style: { background: "#4E41F0", color: "#fff" },
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error("Teste", {
          style: { background: "#f04141", color: "#fff" },
          duration: 3000,
        });
      });
  };

  useEffect(() => {
    getTasks();
  }, [selectedFilter, getTasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        selectedFilter,
        changeTasksFilter,
        getTasks,
        checkLateTasks,
        lateTasksNumber,
        createTask,
      }}
    >
      <>
        <Toaster position='top-right' reverseOrder={false}>
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? "custom-enter 1s ease"
                  : "custom-exit 1s ease",
              }}
            />
          )}
        </Toaster>
        {children}
      </>
    </TasksContext.Provider>
  );
};
