import { SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
  setInChangeMod: (value: SetStateAction<boolean>) => void;
}

export default function ChangeWordForm(props: ComponentProps) {
  const { register, handleSubmit } = useForm<ChangeFormInputs>();

  const changeWordData = async (
    submitData: ChangeFormInputs
  ): Promise<void> => {
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
        console.log("Yeai!");
        await props.getWordData();
        props.setInChangeMod(false);
      } else {
        res.status === 409
          ? console.log(
              "Word was allready added to main DB or deleted from current DB. Please, update current words list"
            )
          : console.log("Oops! Something is wrong.");
      }
    } catch (err) {
      console.log(err);
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
      <button onClick={() => props.setInChangeMod(false)}>отмена</button>
    </div>
  );
}
