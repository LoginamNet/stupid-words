"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import WordInput from "../inputs/word-input";
import MatureInputs from "../inputs/mature-inputs";
import TypeInputs from "../inputs/type-inputs";
import TextInput from "../inputs/text-input";

import { AddFormInputs } from "../../interfaces";

import styles from "../../form.module.css";

export default function AddWordForm() {
  const { register, handleSubmit } = useForm<AddFormInputs>();

  const sendData = async (submitData: AddFormInputs): Promise<void> => {
    try {
      //   setIsLoading(true);

      const res = await fetch(
        "https://stupid-words-api.vercel.app/api/stupidwords",
        {
          method: "POST",
          body: JSON.stringify(submitData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (res.ok) {
        console.log("Yeai!");
      } else {
        res.status === 409
          ? console.log("Word is allready exists in DB")
          : console.log("Oops! Something is wrong.");
      }
      //   setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit: SubmitHandler<AddFormInputs> = (data) => {
    console.log(data), sendData(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <WordInput register={register} />
      <MatureInputs register={register} />
      <TypeInputs register={register} />
      <TextInput register={register} />
      <input type="submit" value="ОТПРАВЛЯЕМ!" />
    </form>
  );
}
