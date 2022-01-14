import React, { useState } from "react";
import BaseLayout from "@components/Layout/BaseLayout";
import FilterCard from "@components/pages/FilterCard";

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
      <S.FilterArea>
        {filters.map((filter) => (
          <button type='button' onClick={() => setSelectedFilter(filter.type)}>
            <FilterCard
              key={filter.title}
              title={filter.title}
              actived={selecterdFilter === filter.type}
            />
          </button>
        ))}
      </S.FilterArea>
    </BaseLayout>
  );
};

export default Home;
