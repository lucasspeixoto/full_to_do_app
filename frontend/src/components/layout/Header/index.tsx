import React, { useEffect } from "react";

import * as S from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "@assets/logo.png";
import bell from "@assets/bell.png";

import { useTasks } from "@core/hooks/useTasks";

const headerLinks = [
  { link: "/", title: "Início" },
  { link: "/task", title: "Nova Tarefa" },
  { link: "/qrcode", title: "Sincronizar Celular" },
];

const Header: React.FC = () => {
  const { lateTasksNumber, checkLateTasks, changeTasksFilter } = useTasks();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkLateTasks();
  }, [checkLateTasks]);

  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        {headerLinks.map((headerLink) => (
          <React.Fragment key={headerLink.link}>
            <Link to={headerLink.link}>
              <h4 className={pathname === headerLink.link ? "active" : ""}>
                {headerLink.title}
              </h4>
            </Link>
            <span className="dividir" />
          </React.Fragment>
        ))}
        <button
          onClick={() => {
            changeTasksFilter("late");
            navigate("/");
          }}
        >
          <img src={bell} alt="Notificação" />
          <span>{lateTasksNumber ? lateTasksNumber : 0}</span>
        </button>
      </S.RightSide>
    </S.Container>
  );
};

export default Header;
