import React from "react";

import FilterCard from "@components/pages/FilterCard";
import TaskCard from "@components/pages/TaskCard";

import * as S from "./styles";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import { useTasks } from "@core/hooks/useTasks";

const filters = [
  { type: "mytasks", title: "Todos" },
  { type: "today", title: "Hoje" },
  { type: "week", title: "Semana" },
  { type: "month", title: "Mês" },
  { type: "year", title: "Ano" },
];

const Home: React.FC = () => {
  const { tasks, selectedFilter, changeTasksFilter } = useTasks();

  return (
    <React.Fragment>
      <Header />
      <S.Container>
        <S.FilterArea>
          {filters.map((filter) => (
            <button
              key={filter.title}
              type="button"
              onClick={() => {
                changeTasksFilter(filter.type);
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
          <h2>{selectedFilter === "late" ? "Tarefas Atrasadas" : "Tarefas"}</h2>
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
