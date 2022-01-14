import React from "react";
import * as S from "./styles";

import FilterLogo from "@assets/filter.png";

interface FilterCardProps {
  title: string;
  actived: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({ title, actived }) => {

  return (
    <S.Container actived={actived}>
      <img src={FilterLogo} alt='Logo Filtro' />
      <span>{title}</span>
    </S.Container>
  );
};

export default FilterCard;
