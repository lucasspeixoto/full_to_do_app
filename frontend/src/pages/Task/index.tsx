import React, { useState } from "react";

import * as S from "./styles";

import typeIcons from "@core/helpers/typeIcons";
import Header from "@components/Layout/Header";

const Task: React.FC = () => {
  const [type, setType] = useState<number>();

  return (
    <React.Fragment>
      <Header />
      <S.Container>
        <S.Form>
          <S.IconsArea>
            {typeIcons.map(
              (icon, index) =>
                index > 0 && (
                  <button
                    key={index}
                    type='button'
                    onClick={() => setType(index)}
                    className='unselect'
                  >
                    <img
                      src={icon}
                      alt='Tipo de Tarefa'
                      className={type && type !== index ? "inative" : ""}
                    />
                  </button>
                )
            )}
          </S.IconsArea>
        </S.Form>
      </S.Container>
    </React.Fragment>
  );
};

export default Task;
