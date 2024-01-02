"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import WordInput from "./inputs/word-input";
import MatureInputs from "./inputs/mature-inputs";
import TypeInputs from "./inputs/type-inputs";
import TextInput from "./inputs/text-input";

import { FormInputs } from "./interfaces";

import styles from "./form.module.css";

interface ComponentProps {
  APIEndPoint: string;
}

export default function AddForm(props: ComponentProps) {
  const { register, handleSubmit } = useForm<FormInputs>();

  const sendData = async (submitData: FormInputs): Promise<void> => {
    const toastID = toast.loading("Связываемся с БД..");
    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}`,
        {
          method: "POST",
          body: JSON.stringify(submitData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log(res.status);

      if (res.ok) {
        toast.update(toastID, {
          render: "Связь с БД установлена!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        toast.success("Слово было успешно добавлено!");
      } else {
        toast.update(toastID, {
          render: "Связь с БД установлена!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        res.status === 409
          ? toast.warn(
              "Данное слово уже сущестует в актуальном словаре или уже было предложено!"
            )
          : toast.error("Что-то пошло не так! Повторите попытку");
      }
    } catch (err) {
      console.log(err);

      toast.update(toastID, {
        render: "Ошибка при взаимодействии с БД!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    sendData(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <WordInput register={register} />
      <MatureInputs register={register} />
      <TypeInputs register={register} />
      <TextInput register={register} />
      <input type="submit" value="ДОБАВИТЬ" />
    </form>
  );
}
