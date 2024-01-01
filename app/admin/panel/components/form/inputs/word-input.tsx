import { UseFormRegister } from "react-hook-form";

import { FormInputs } from "../interfaces";

import styles from "../form.module.css";

interface ComponentProps {
  register: UseFormRegister<FormInputs>;
}

export default function WordInput(props: ComponentProps) {
  return (
    <label className={styles.form_input__vertical}>
      Слово:
      <input
        type="text"
        id="addword-input"
        {...props.register("word")}
        required
      ></input>
    </label>
  );
}
