import React, { useState, useEffect, Children } from "react";

import FilterCard from "@components/pages/FilterCard";
import TaskCard from "@components/pages/TaskCard";

import * as S from "./styles";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import { useTasks } from "@core/hooks/useTasks";
import { Link, Navigate } from "react-router-dom";

const filters = [
  { type: "mytasks", title: "Todos" },
  { type: "today", title: "Hoje" },
  { type: "week", title: "Semana" },
  { type: "month", title: "Mês" },
  { type: "year", title: "Ano" },
];

const Home: React.FC = () => {
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("@todo:macaddress") ? true : false
  );
  const { getTasks, tasks, selectedFilter, changeTasksFilter } = useTasks();

  useEffect(() => {
    getTasks();
    if (!isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [getTasks, isConnected]);

  return (
    <React.Fragment>
      {isConnected ? (
        <>
          <Header />
          <S.Container>
            <S.FilterArea>
              {Children.toArray(
                filters.map((filter) => (
                  <button
                    type='button'
                    onClick={() => {
                      changeTasksFilter(filter.type);
                    }}
                  >
                    <FilterCard
                      title={filter.title}
                      actived={selectedFilter === filter.type}
                    />
                  </button>
                ))
              )}
            </S.FilterArea>
            <S.Title>
              <h2>
                {selectedFilter === "late" ? "Tarefas Atrasadas" : "Tarefas"}
              </h2>
            </S.Title>
            {tasks ? (
              <S.TasksArea>
                {Children.toArray(
                  tasks.map((task) => (
                    <Link to={`/task/${task._id}`}>
                      <TaskCard
                        title={task.title}
                        type={task.type}
                        when={task.when}
                        done={task.done}
                      />
                    </Link>
                  ))
                )}
              </S.TasksArea>
            ) : null}
          </S.Container>
          )
          <Footer />
        </>
      ) : (
        <Navigate to='/qrcode' />
      )}
    </React.Fragment>
  );
};

export default Home;
