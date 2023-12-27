import { UseFormRegister } from "react-hook-form";

import { ChangeFormInputs } from "../interfaces";

interface ComponentProps {
  word: string;
  register: UseFormRegister<ChangeFormInputs>;
}

export default function WordInput(props: ComponentProps) {
  return (
    <label>
      Слово:
      <input
        type="text"
        id="changeword-input"
        defaultValue={props.word}
        {...props.register("word")}
        required
      ></input>
    </label>
  );
}
