//* React
import React, { useEffect, useState, useMemo, useCallback } from "react";

//* Bibliotecas externas
import { useParams, Navigate } from "react-router-dom";
import { format } from "date-fns";

//* Styles
import * as S from "./styles";

//* Forms
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
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
import { ConfirmModal } from "@components/shared/ConfirmModal";
import Footer from "@components/Layout/Footer";

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
    title: Yup.string().required(Messages.required).min(3, Messages.min),
    description: Yup.string().required(Messages.required).min(5, Messages.min),
    date: Yup.string().required(Messages.required),
    hour: Yup.string().required(Messages.required),
  })
  .required();

const Task: React.FC<any> = () => {
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("@todo:macaddress") ? true : false
  );
  const macaddress = useMemo(() => {
    return localStorage.getItem("@todo:macaddress");
  }, []);
  const [type, setType] = useState<number>(null);
  const { _id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const { createTask, loadTask, task, updateTask, getTasks, deleteTask } =
    useTasks();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const createTaskHandler = async (values: ITasksForm) => {
    const newTask = {
      done: values.done,
      macaddress: macaddress,
      type: type,
      title: values.title,
      description: values.description,
      when: `${values.date}T${values.hour}:00.000`,
    };
    await createTask(newTask);

    await getTasks();

    setType(null);

    setRedirect(true);
  };

  const updateTaskHandler = useCallback(
    async (values: ITasksForm) => {
      const newTask = {
        done: values.done,
        macaddress: macaddress,
        type: type,
        title: values.title,
        description: values.description,
        when: `${values.date}T${values.hour}:00.000`,
      };
      await updateTask(newTask, _id);

      setType(null);

      setRedirect(true);
    },
    [_id, type, updateTask, macaddress]
  );

  const deleteTaskHandler = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (_id) {
      await deleteTask(_id);
      setRedirect(true);
    }
  };

  const submitHandler = async (
    values: ITasksForm,
    actions: FormikHelpers<ITasksForm>
  ) => {
    if (!type) {
      toast.error("Selecione um Tipo!", {
        duration: 3000,
      });
      actions.setSubmitting(false);

      return;
    }

    //* Verificar se é create ou update de tarefa
    if (_id) {
      await updateTaskHandler(values);
    } else {
      await createTaskHandler(values);
    }
    actions.resetForm();
  };

  //* Buscar dados da tarefa para a rota de edição
  useEffect(() => {
    if (_id) loadTask(_id);
  }, [_id, loadTask]);

  //* Atualizar tipo da tarefa para a rota de edição
  useEffect(() => {
    if (task) setType(task.type);
  }, [task]);

  useEffect(() => {
    if (!isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [isConnected]);

  return (
    <React.Fragment>
      {redirect && <Navigate to='/' />}
      {isConnected ? (
        <>
          <Header />
          <S.Container>
            <S.Content>
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
                onSubmit={submitHandler}
                initialValues={
                  _id && task
                    ? {
                        done: task?.done,
                        title: task?.title,
                        description: task?.description,
                        date: format(new Date(task?.when), "yyyy-MM-dd"),
                        hour: format(new Date(task?.when), "HH:mm"),
                      }
                    : initialValues
                }
                validationSchema={schema}
                enableReinitialize
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
                                className={
                                  type && type === index ? "active" : ""
                                }
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

                        {_id ? (
                          <button type='button' onClick={deleteTaskHandler}>
                            Excluir
                          </button>
                        ) : null}
                      </S.Options>

                      <S.SendArea>
                        <button
                          type='submit'
                          disabled={!isValid || isSubmitting}
                        >
                          Salvar
                        </button>
                      </S.SendArea>
                    </Form>
                  </S.FormArea>
                )}
              </Formik>
              {isConfirmModalOpen && (
                <ConfirmModal
                  state={isConfirmModalOpen}
                  setState={setIsConfirmModalOpen}
                  title='Deseja Realmente Excluir está tarefa ?'
                  deleteTask={confirmDeleteTask}
                />
              )}
            </S.Content>
          </S.Container>
          <Footer />
        </>
      ) : (
        <Navigate to='/qrcode' />
      )}
    </React.Fragment>
  );
};

export default Task;
