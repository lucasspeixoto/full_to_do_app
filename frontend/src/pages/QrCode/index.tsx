import React, { useState } from "react";

import { Navigate } from "react-router-dom";

import toast, { ToastBar, Toaster } from "react-hot-toast";

import * as S from "./styles";

import Qr from "qrcode.react";

import Footer from "@components/Layout/Footer/index";
import Header from "@components/Layout/Header";
import { useTasks } from "@core/hooks/useTasks";

const QrCode: React.FC = () => {
  const [mac, setMac] = useState<string>("");
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("@todo:macaddress") ? true : false
  );

  const { getTasks } = useTasks();

  const getMac = () => {
    if (!mac) {
      toast.error("Você precisa informar o número que apareceu no celular!", {
        duration: 2000,
      });
    } else {
      localStorage.setItem("@todo:macaddress", mac);
      getTasks();

      setIsConnected(true);
    }
  };

  return (
    <React.Fragment>
      {!isConnected ? (
        <>
          <Toaster position='top-right' reverseOrder={false}>
            {(t) => (
              <ToastBar
                toast={t}
                style={{
                  ...t.style,
                  animation: t.visible
                    ? "custom-enter 1s ease toast"
                    : "custom-exit 1s ease toast",
                }}
              />
            )}
          </Toaster>
          <S.Container>
            <Header />

            <S.Content>
              <h1>Capture o QrCode pelo App.</h1>
              <p>Suas atividades serão sincronizadas com o celular.</p>
              <S.QrCodeArea>
                <Qr value='getmacaddress' size={280}></Qr>
              </S.QrCodeArea>

              <S.ValidationCode>
                <span>Digite a numeração que apareceu no celular</span>
                <input
                  type='text'
                  onChange={(event) => setMac(event.target.value)}
                />
                <button type='button' onClick={getMac}>
                  Sincronizar
                </button>
              </S.ValidationCode>
            </S.Content>
            <Footer />
          </S.Container>
        </>
      ) : (
        <Navigate to='/' />
      )}
    </React.Fragment>
  );
};

export default QrCode;
