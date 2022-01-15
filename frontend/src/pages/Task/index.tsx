import React, { useState } from "react";

import * as S from "./styles";

import typeIcons from "@core/helpers/typeIcons";
import Header from "@components/Layout/Header";


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Messages } from "@core/helpers/messages";


const schema = yup
	.object({
		title: yup.string().required(Messages.required),
		type: yup.string().required(Messages.required),
		date: yup.string().required(Messages.required).min(10, Messages.min),
		frequency: yup.string().required(Messages.required),
		amount: yup
			.number()
			.typeError(Messages.required)
			.min(1, Messages.number)
			.required(Messages.required),
		description: yup.string().notRequired(),
	})
	.required();

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
                    type="button"
                    onClick={() => setType(index)}
                    className="unselect"
                  >
                    <img
                      src={icon}
                      alt="Tipo de Tarefa"
                      className={type && type !== index ? "inative" : ""}
                    />
                  </button>
                )
            )}
          </S.IconsArea>

          <S.Input>
            <span>Título</span>
            <input type="text" placeholder="Título da Tarefa"></input>
          </S.Input>
        </S.Form>
      </S.Container>
    </React.Fragment>
  );
};

export default Task;
