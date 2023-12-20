import { UseFormRegister } from "react-hook-form";

import { AddFormInputs } from "../../interfaces";

interface ComponentProps {
  register: UseFormRegister<AddFormInputs>;
}

export default function WordInput(props: ComponentProps) {
  return (
    <label>
      Словцо:
      <input
        type="text"
        id="addword-input"
        {...props.register("word")}
        required
      ></input>
    </label>
  );
}
