import { UseFormRegister } from "react-hook-form";

import { FormInputs } from "../interfaces";

import styles from "../form.module.css";

interface ComponentProps {
  register: UseFormRegister<FormInputs>;
}

export default function TextInput(props: ComponentProps) {
  return (
    <div className={styles.form_input__vertical}>
      <label htmlFor="addtext-input">Значение:</label>
      <textarea
        id="addtext-input"
        rows={5}
        {...props.register("text")}
        required
      />
    </div>
  );
}
