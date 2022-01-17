//* React
import React, { useState } from "react";

//* Styles
import * as S from "./styles";

//* Forms
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

//* Components externos
import toast, { ToastBar, Toaster } from "react-hot-toast";

//* Componentes internos
import Header from "@components/Layout/Header";

//* Contexts

//* Hooks
import { useTasks } from "@core/hooks/useTasks";

//* Helpers (Funções/Classes)
import typeIcons from "@core/helpers/typeIcons";
import { Messages } from "@core/helpers/messages";

//* Interfaces, Types
import { ITasksForm } from "@core/types/task-form";

//* Services

//* Assets
import iconCalendar from "@assets/calendar.png";
import iconClock from "@assets/clock.png";

const initialValues = {
  done: false,
  title: "",
  description: "",
  date: "",
  hour: "",
};

const schema = Yup.object()
  .shape({
    done: Yup.boolean(),
    title: Yup.string().required(Messages.required).min(5, Messages.min),
    description: Yup.string().required(Messages.required),
    date: Yup.string().required(Messages.required),
    hour: Yup.string().required(Messages.required),
  })
  .required();

const Task: React.FC<any> = () => {
  const [type, setType] = useState<number>(null);

  const { createTask } = useTasks();

  const save = (values: ITasksForm, actions: any) => {
    if (!type) {
      toast.error("Selecione um Tipo!", {
        duration: 3000,
      });
      actions.setSubmitting(false);

      return;
    }

    const newTask = {
      done: values.done,
      macaddress: "11:11:11:11:11:11",
      type: type,
      title: values.title,
      description: values.description,
      when: `${values.date}T${values.hour}:00.000`,
    };

    console.log(newTask);

    createTask(newTask);

    actions.resetForm();

    setType(null);
  };

  return (
    <React.Fragment>
      <Header />
      <S.Container>
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

        <Formik
          onSubmit={save}
          initialValues={initialValues}
          validationSchema={schema}
        >
          {({ isValid, isSubmitting }) => (
            <S.FormArea>
              <Form>
                <S.IconsArea>
                  {typeIcons.map((icon, index) =>
                    index > 0 ? (
                      <button
                        key={index}
                        type='button'
                        onClick={() => {
                          index === type ? setType(null) : setType(index);
                        }}
                        className='unselect'
                      >
                        <img
                          src={icon}
                          alt='Tipo de Tarefa'
                          className={type && type === index ? "active" : ""}
                        />
                      </button>
                    ) : null
                  )}
                </S.IconsArea>

                <S.FormField>
                  <span>Título</span>
                  <Field
                    as='input'
                    name='title'
                    id='title'
                    placeholder='Título da Tarefa'
                  ></Field>
                  <ErrorMessage
                    component='p'
                    className='error-message'
                    name='title'
                  />
                </S.FormField>

                <S.FormField>
                  <span>Descrição</span>
                  <Field
                    as='textarea'
                    rows={2}
                    id='description'
                    name='description'
                    placeholder='Descrição da Tarefa'
                  ></Field>
                  <ErrorMessage
                    component='p'
                    className='error-message'
                    name='description'
                  />
                </S.FormField>

                <S.FormField>
                  <span>Data</span>
                  <Field
                    as='input'
                    type='date'
                    id='date'
                    name='date'
                    placeholder='Dia de Entrega da Tarefa'
                  ></Field>
                  <ErrorMessage
                    component='p'
                    className='error-message'
                    name='date'
                  />
                  <img src={iconCalendar} alt='Calendário' />
                </S.FormField>

                <S.FormField>
                  <span>Hora</span>
                  <Field
                    as='input'
                    type='time'
                    id='hour'
                    name='hour'
                    placeholder='Horário de Entrega da Tarefa'
                  ></Field>
                  <ErrorMessage
                    component='p'
                    className='error-message'
                    name='hour'
                  />
                  <img src={iconClock} alt='Relógio' />
                </S.FormField>

                <S.Options>
                  <div>
                    <Field
                      as='input'
                      type='checkbox'
                      id='done'
                      name='done'
                    ></Field>
                    <span>Concluído</span>
                  </div>

                  <button type='button'>Excluir</button>
                </S.Options>

                <S.SendArea>
                  <button type='submit' disabled={!isValid || isSubmitting}>
                    Salvar
                  </button>
                </S.SendArea>
              </Form>
            </S.FormArea>
          )}
        </Formik>
      </S.Container>
    </React.Fragment>
  );
};

export default Task;
