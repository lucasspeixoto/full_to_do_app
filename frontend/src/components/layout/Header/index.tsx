import React, { useState, useEffect, useMemo } from "react";

import * as S from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "@assets/logo.png";
import bell from "@assets/bell.png";

import { useTasks } from "@core/hooks/useTasks";
import { useTheme } from "@core/hooks/useTheme";
import { Toggle } from "../Toggle";

interface IHeaderLinks {
  link: string;
  title: string;
  show: boolean;
}

const Header: React.FC = () => {
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("@todo:macaddress") ? true : false
  );
  const headerLinks: IHeaderLinks[] = useMemo(() => {
    return [
      { link: "/", title: "Início", show: isConnected },
      { link: "/task", title: "Nova Tarefa", show: isConnected },
      { link: "/qrcode", title: "Sincronizar Celular", show: false },
    ];
  }, [isConnected]);

  const { lateTasksNumber, checkLateTasks, changeTasksFilter } = useTasks();
  const { toggleTheme, theme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  useEffect(() => {
    if (!isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [isConnected]);

  useEffect(() => {
    checkLateTasks();
  }, [checkLateTasks]);

  const logout = () => {
    localStorage.removeItem("@todo:macaddress");
    setIsConnected(false);
    navigate("/qrcode");
  };

  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt='Logo' />
        <Toggle checked={darkTheme} onChange={handleChangeTheme} />
      </S.LeftSide>
      <S.RightSide>
        {isConnected ? (
          <React.Fragment>
            {React.Children.toArray(
              headerLinks.map((headerLink) => (
                <React.Fragment>
                  {headerLink.show ? (
                    <React.Fragment>
                      <Link to={headerLink.link}> 
                        <h4
                          className={
                            pathname === headerLink.link ? "active" : ""
                          }
                        >
                          {headerLink.title}
                        </h4>
                      </Link>
                      <span className='dividir' />
                    </React.Fragment>
                  ) : (
                    <button type='button' onClick={logout}>
                      Sair
                    </button>
                  )}
                </React.Fragment>
              ))
            )}
          </React.Fragment>
        ) : null}

        {lateTasksNumber >= 1 && isConnected ? (
          <button
            onClick={() => {
              changeTasksFilter("late");
              navigate("/");
            }}
          >
            <img src={bell} alt='Notificação' />
            <span>{lateTasksNumber ? lateTasksNumber : 0}</span>
          </button>
        ) : null}
      </S.RightSide>
    </S.Container>
  );
};

export default Header;
