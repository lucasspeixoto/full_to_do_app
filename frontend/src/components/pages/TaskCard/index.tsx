import React, { useMemo } from "react";
import { format } from "date-fns";

import * as S from "./styles";

import typeIcons from "@core/helpers/typeIcons";

interface TaskCardProps {
  title: string;
  type: number;
  when: string;
  done: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, type, when, done }) => {
  const date = useMemo(() => {
    return format(new Date(when), "dd/MM/yyyy");
  }, [when]);

  const hour = useMemo(() => {
    return format(new Date(when), "HH:mm");
  }, [when]);

  return (
    <S.Container className='unselect' done={done}>
      <S.TopCard>
        <img src={typeIcons[type]} alt='Logo Card de Tarefa' />
        <h3>{title}</h3>
      </S.TopCard>
      <S.BottomCard>
        <strong>{date}</strong>
        <span>{hour}</span>
      </S.BottomCard>
    </S.Container>
  );
};

export default TaskCard;
