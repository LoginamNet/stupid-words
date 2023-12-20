import { UseFormRegister } from "react-hook-form";

import { AddFormInputs } from "../../interfaces";

interface ComponentProps {
  register: UseFormRegister<AddFormInputs>;
}

export default function TextInput(props: ComponentProps) {
  return (
    <div>
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
