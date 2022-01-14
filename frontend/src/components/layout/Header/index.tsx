//import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";

import logo from "@assets/logo.png";
import bell from "@assets/bell.png";

const Header = () => {
  /* const [lateCount, setLateCount] = useState();

  async function lateVerify(){
    await api.get(`/task/filter/late/${isConnected}`)
    .then(response => {
      setLateCount(response.data.length)
    })
  }

  useEffect(() => {
    lateVerify();
  })

  async function Logout(){
    localStorage.removeItem('@todo/macaddress');
    window.location.reload();
  } */

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
        <button onClick={() => {}}>
          <img src={bell} alt='Notificação' />
          <span>{1}</span>
        </button>
        {/* { !isConnected ?
          <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
          :
          <button type="button" onClick={Logout}>SAIR</button>
        }
        {
          lateCount &&
          <>            
            <span className="dividir" />
            <button onClick={clickNotification}>
              <img src={bell} alt="Notificação" />
              <span>{lateCount}</span>
            </button>
          </>
        } */}
      </S.RightSide>
    </S.Container>
  );
};

export default Header;
