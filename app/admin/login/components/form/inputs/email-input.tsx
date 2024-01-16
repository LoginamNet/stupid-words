import { UseFormRegister } from "react-hook-form";

import { LoginFormInputs } from "../interfaces";

interface ComponentProps {
  register: UseFormRegister<LoginFormInputs>;
}

export default function EmailInput(props: ComponentProps) {
  return (
    <input
      type="email"
      id="loginemail-input"
      {...props.register("email")}
      placeholder="post@mail.world"
      required
    ></input>
  );
}
