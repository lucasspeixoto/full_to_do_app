import React, { createContext, useState, useEffect, useCallback } from "react";

import useLocalStorage from "@core/hooks/useLocalStorage";
import { ITasks } from "@core/types/tasks";
import api from "@core/services/api";

import toast, { ToastBar, Toaster } from "react-hot-toast";

export interface TasksContextType {
  tasks: ITasks[];
  task: ITasks;
  selectedFilter: string;
  changeTasksFilter: (filter: string) => void;
  getTasks: () => Promise<void>;
  checkLateTasks: () => void;
  lateTasksNumber: number;
  createTask: (task: Partial<ITasks>) => Promise<void>;
  loadTask: (_id: string) => Promise<void>;
  updateTask: (task: Partial<ITasks>, _id: string) => Promise<void>;
  deleteTask(_id: string): Promise<void>;
}

const lastFilter = localStorage.getItem("@todo:selectedFilter");

export const TasksContext = createContext({} as TasksContextType);

export const TasksContextProvider: React.FC = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useLocalStorage<string>(
    "@todo:selectedFilter",
    lastFilter ? lastFilter : "mytasks"
  );

  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [task, setTask] = useState<ITasks>();
  const [lateTasksNumber, setLateTasksNumber] = useState();

  const changeTasksFilter = useCallback(
    (filter: string) => {
      setSelectedFilter(filter);
      localStorage.setItem("@todo:selectedFilter", filter);
    },
    [setSelectedFilter]
  );

  const getTasks = useCallback(async () => {
    await api
      .get(`/task/filter/${selectedFilter}/11:11:11:11:11:11`)
      .then((response) => {
        setTasks(response.data);
      });
  }, [selectedFilter]);

  const checkLateTasks = useCallback(async () => {
    await api
      .get(`/task/filter/late/11:11:11:11:11:11`)
      .then((response) => {
        if (response.data) {
          const numberOfLateTasks = response.data.length;
          setLateTasksNumber(numberOfLateTasks);
        }
      })
      .catch(() => {
        toast.error(
          "Um erro ocorreu ao selecionar as tarefas atrasadas. Tente novamente.",
          {
            style: { background: "#f04141", color: "#fff" },
            duration: 3000,
          }
        );
      });
  }, []);

  const createTask = useCallback(async (task: Partial<ITasks>) => {
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
      .catch(() => {
        toast.error(
          "Um erro ocorreu ao tentar criar está tarefa. Tente novamente.",
          {
            style: { background: "#f04141", color: "#fff" },
            duration: 3000,
          }
        );
      });
  }, []);

  const loadTask = useCallback(async (_id: string) => {
    if (_id) {
      await api
        .get(`/task/${_id}`)
        .then((response) => {
          if (response.data) {
            setTask(response.data);
          }
        })
        .catch(() => {
          toast.error(
            "Um erro ocorreu ao selecionar as tarefas atrasadas. Tente novamente.",
            {
              style: { background: "#f04141", color: "#fff" },
              duration: 3000,
            }
          );
        });
    } else {
      setTask(null);
    }
  }, []);

  const updateTask = useCallback(async (task: Partial<ITasks>, _id: string) => {
    if (_id) {
      await api
        .put(`/task/${_id}`, task)
        .then((response) => {
          if (response.data) {
            toast.success(response.data.message, {
              style: { background: "#4E41F0", color: "#fff" },
              duration: 3000,
            });
          }
        })
        .catch(() => {
          toast.error(
            "Um erro ocorreu ao atualizar está tarefa. Tente novamente.",
            {
              style: { background: "#f04141", color: "#fff" },
              duration: 3000,
            }
          );
        });
    } else {
      toast.error(
        "Id não informado ou inexistente, recarrega a página. Tente novamente.",
        {
          style: { background: "#f04141", color: "#fff" },
          duration: 3000,
        }
      );
    }
  }, []);

  const deleteTask = useCallback(async (_id: string) => {
    if (_id) {
      await api
        .delete(`/task/${_id}`)
        .then((response) => {
          if (response.data) {
            toast.success(response.data.message, {
              style: { background: "#4E41F0", color: "#fff" },
              duration: 3000,
            });
          }
        })
        .catch(() => {
          toast.error(
            "Um erro ocorreu ao deletar está tarefa. Tente novamente.",
            {
              style: { background: "#f04141", color: "#fff" },
              duration: 3000,
            }
          );
        });
    } else {
      toast.error(
        "Id não informado ou inexistente, recarrega a página. Tente novamente.",
        {
          style: { background: "#f04141", color: "#fff" },
          duration: 3000,
        }
      );
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, [selectedFilter, getTasks, updateTask]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        task,
        selectedFilter,
        changeTasksFilter,
        getTasks,
        checkLateTasks,
        lateTasksNumber,
        createTask,
        loadTask,
        updateTask,
        deleteTask,
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
