import { UseFormRegister } from "react-hook-form";

import { AddFormInputs } from "../../interfaces";

import styles from "../../form.module.css";

interface ComponentProps {
  register: UseFormRegister<AddFormInputs>;
}

export default function TextInput(props: ComponentProps) {
  return (
    <div className={styles.form_input__vertical}>
      <label htmlFor="addtext-input"> Что значит ваше слово?</label>
      <textarea
        id="addtext-input"
        rows={5}
        {...props.register("text")}
        required
      />
    </div>
  );
}
