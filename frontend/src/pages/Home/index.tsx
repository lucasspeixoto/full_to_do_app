import React, { useState } from "react";
import BaseLayout from "@components/Layout/BaseLayout";
import FilterCard from "@components/pages/FilterCard";
import TaskCard from "@components/pages/TaskCard";

import * as S from "./styles";

const filters = [
  { type: "all", title: "Todos" },
  { type: "today", title: "Hoje" },
  { type: "week", title: "Semana" },
  { type: "month", title: "Mês" },
  { type: "year", title: "Ano" },
];

const Home: React.FC = () => {
  const [selecterdFilter, setSelectedFilter] = useState("all");

  return (
    <BaseLayout>
      <S.Container>
        <S.FilterArea>
          {filters.map((filter) => (
            <button
              key={filter.title}
              type='button'
              onClick={() => setSelectedFilter(filter.type)}
            >
              <FilterCard
                title={filter.title}
                actived={selecterdFilter === filter.type}
              />
            </button>
          ))}
        </S.FilterArea>
        <S.Title>
          <h2>Tarefas</h2>
        </S.Title>
        <S.TasksArea>
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </S.TasksArea>
      </S.Container>
    </BaseLayout>
  );
};

export default Home;
