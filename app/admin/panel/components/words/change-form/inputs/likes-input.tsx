import { UseFormRegister } from "react-hook-form";

import { ChangeFormInputs } from "../interfaces";

interface ComponentProps {
  likes: number;
  register: UseFormRegister<ChangeFormInputs>;
}

export default function LikesInput(props: ComponentProps) {
  return (
    <label>
      Отметок нравится:
      <input
        type="number"
        id="changelikes-input"
        defaultValue={props.likes}
        {...props.register("likes")}
        required
      ></input>
    </label>
  );
}
