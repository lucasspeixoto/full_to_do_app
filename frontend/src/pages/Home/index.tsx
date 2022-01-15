import React, { useState, useEffect, useCallback } from "react";

import toast, { Toaster } from "react-hot-toast";

import api from "@services/api";

import { ITasks } from "@core/types/tasks";

import FilterCard from "@components/pages/FilterCard";
import TaskCard from "@components/pages/TaskCard";

import * as S from "./styles";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import useLocalStorage from "@core/hooks/useLocalStorage";

const filters = [
  { type: "mytasks", title: "Todos" },
  { type: "today", title: "Hoje" },
  { type: "week", title: "Semana" },
  { type: "month", title: "Mês" },
  { type: "year", title: "Ano" },
];

const lastFilter = localStorage.getItem("@todo:selectedFilter");

const Home: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useLocalStorage<string>(
    "@todo:selectedFilter",
    lastFilter ? lastFilter : "mytasks"
  );

  const [tasks, setTasks] = useState<ITasks[]>([]);

  const getTasks = useCallback(async () => {
    await api
      .get(`/task/filter/${selectedFilter}/11:11:11:11:11:11`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        toast.error(err.message, {
          style: { background: "#258FB0", color: "#fff" },
          duration: 2000,
        });
      });
  }, [selectedFilter]);

  const showLateTasks = () => {
    setSelectedFilter("late");
    localStorage.setItem("@todo:selectedFilter", "late");
  };

  useEffect(() => {
    getTasks();
  }, [selectedFilter, getTasks]);

  return (
    <React.Fragment>
      <Header showLateTasks={showLateTasks} />
      <S.Container>
        <Toaster position='top-center' reverseOrder={false} />
        <S.FilterArea>
          {filters.map((filter) => (
            <button
              key={filter.title}
              type='button'
              onClick={() => {
                setSelectedFilter(filter.type);
                localStorage.setItem("@todo:selectedFilter", filter.type);
              }}
            >
              <FilterCard
                title={filter.title}
                actived={selectedFilter === filter.type}
              />
            </button>
          ))}
        </S.FilterArea>
        <S.Title>
          <h2>Tarefas</h2>
        </S.Title>
        {tasks ? (
          <S.TasksArea>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                type={task.type}
                when={task.when}
                done={task.done}
              />
            ))}
          </S.TasksArea>
        ) : null}
      </S.Container>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
