import { UseFormRegister } from "react-hook-form";

import { ChangeFormInputs } from "../interfaces";

interface ComponentProps {
  text: string;
  register: UseFormRegister<ChangeFormInputs>;
}

export default function TextInput(props: ComponentProps) {
  return (
    <div>
      <label htmlFor="changetext-input">Значение:</label>
      <textarea
        id="changetext-input"
        rows={5}
        defaultValue={props.text}
        {...props.register("text")}
        required
      />
    </div>
  );
}
