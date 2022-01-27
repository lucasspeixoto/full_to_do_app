import { Dispatch, SetStateAction, useState } from "react";

import ReactModal from "react-modal";
import { Button } from "../Button";

import * as S from "./styles";

ReactModal.setAppElement("body");

export const ConfirmModal: React.FC<any> = ({
  title,
  state,
  setState,
  deleteTask,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ReactModal
      className='modal'
      isOpen={state}
      onRequestClose={() => {
        setState(false);
      }}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          
          backgroundColor: "rgba(5, 2, 6, 0.8)",
        },
        content: {
          padding: '20px',
          width: "auto",
          height: "200px",
          borderRadius: "11px",
          border: "2px solid #000",
          outline: "none",

        
        },
      }}
    >
      <S.Container>
        <S.TitleContainer>
          <h1>{title}</h1>
        </S.TitleContainer>

        <S.ButtonsContainer>
          <Button
            disabled={isLoading}
            onClick={() => setState(false)}
            background='#A9AC15'
            type='button'
            label='Cancelar'
          />

          <Button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              deleteTask();
              setIsLoading(false);
            }}
            background='#1524ac'
            type='button'
            label='Confirmar'
          />
        </S.ButtonsContainer>
      </S.Container>
    </ReactModal>
  );
};
