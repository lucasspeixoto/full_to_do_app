import React, { useState, useEffect, useCallback } from "react";

import * as S from "./styles";
import { Link } from "react-router-dom";

import logo from "@assets/logo.png";
import bell from "@assets/bell.png";
import api from "@core/services/api";

interface HeaderProps {
  showLateTasks?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showLateTasks }) => {
  const [lateTasksNumber, setLateTasksNumber] = useState();

  const checkLateTasks = useCallback(async () => {
    await api.get(`/task/filter/late/11:11:11:11:11:11`).then((response) => {
      if (response.data) {
        const numberOfLateTasks = response.data.length;
        setLateTasksNumber(numberOfLateTasks);
      }
    });
  }, []);

  useEffect(() => {
    checkLateTasks();
  }, [checkLateTasks]);

  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt='Logo' />
      </S.LeftSide>
      <S.RightSide>
        <Link to='/'>Início</Link>
        <span className='dividir' />
        <Link to='/task'>Nova Tarefa</Link>
        <span className='dividir' />
        <Link to='/qrcode'>Sincronizar Celular</Link>
        <span className='dividir' />
        <button onClick={() => showLateTasks()}>
          <img src={bell} alt='Notificação' />
          <span>{lateTasksNumber ? lateTasksNumber : 0}</span>
        </button>
      </S.RightSide>
    </S.Container>
  );
};

export default Header;
