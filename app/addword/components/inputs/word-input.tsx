import { UseFormRegister } from "react-hook-form";

import { AddFormInputs } from "../../interfaces";

import styles from "../../form.module.css"

interface ComponentProps {
  register: UseFormRegister<AddFormInputs>;
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
