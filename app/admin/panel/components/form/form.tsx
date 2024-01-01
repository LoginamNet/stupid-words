"use client";

import { useForm, SubmitHandler } from "react-hook-form";

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
    try {
      //   setIsLoading(true);

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

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
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
