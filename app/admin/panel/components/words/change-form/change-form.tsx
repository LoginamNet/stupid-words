import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import WordInput from "./inputs/word-input";
import MatureInputs from "./inputs/mature-inputs";
import TypeInputs from "./inputs/type-inputs";
import LikesInput from "./inputs/likes-input";
import TextInput from "./inputs/text-input";

import { ChangeFormInputs } from "./interfaces";
import { Word } from "../interfaces";

import styles from "./change-form.module.css";

interface ComponentProps {
  APIEndPoint: string;
  word: Word;
  getWordData: () => Promise<void>;
  setWordToChangeID: Dispatch<SetStateAction<string>>;
}

export default function ChangeWordForm(props: ComponentProps) {
  const { register, handleSubmit } = useForm<ChangeFormInputs>();

  const changeWordData = async (
    submitData: ChangeFormInputs
  ): Promise<void> => {
    const toastChangeID = toast.loading("Связываемся с БД..");

    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}/${props.word._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(submitData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (res.ok) {
        toast.update(toastChangeID, {
          render: "Связь с БД установлена!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        await props.getWordData();
        props.setWordToChangeID("");
      } else {
        toast.update(toastChangeID, {
          render: "Связь с БД установлена!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        res.status === 409
          ? toast.warn("Слово было перенесено или удалено! Обновите список!")
          : toast.error("Что-то пошло не так! Повторите попытку");
      }
    } catch (err) {
      console.log(err);

      toast.update(toastChangeID, {
        render: "Ошибка при взаимодействии с БД!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const onSubmit: SubmitHandler<ChangeFormInputs> = (data) => {
    changeWordData(data);
  };

  return (
    <div className={styles.form_box}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <WordInput word={props.word.word} register={register} />
        {props.APIEndPoint === "stupidwords" && (
          <LikesInput likes={props.word.likes} register={register} />
        )}
        <TextInput text={props.word.text} register={register} />
        <div className={styles.horizontal_block}>
          <MatureInputs mature={props.word.mature} register={register} />
          <TypeInputs type={props.word.type} register={register} />
        </div>
        <button type="submit">изменить</button>
      </form>
      <button onClick={() => props.setWordToChangeID("")}>отмена</button>
    </div>
  );
}
