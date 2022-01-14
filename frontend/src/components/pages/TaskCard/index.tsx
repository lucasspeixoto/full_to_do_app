import React from "react";
import * as S from "./styles";

import iconDefault from "@assets/default.png";

const TaskCard: React.FC<any> = () => {
  return (
    <S.Container className="unselect">
      <S.TopCard>
        <img src={iconDefault} alt="Logo Card de Tarefa" />
        <h2>Título da Tarefa</h2>
      </S.TopCard>
      <S.BottomCard>
        <strong>14/01/2022</strong>
        <span>15:00</span>
      </S.BottomCard>
    </S.Container>
  );
};

export default TaskCard;
