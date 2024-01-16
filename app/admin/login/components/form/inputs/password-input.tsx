import { UseFormRegister } from "react-hook-form";

import { LoginFormInputs } from "../interfaces";
import { useState } from "react";

import styles from "../form.module.css";

interface ComponentProps {
  register: UseFormRegister<LoginFormInputs>;
}

export default function PasswordInput(props: ComponentProps) {
  const [isShown, setIsShown] = useState(false);

  const handlePasswordViusibility = () => {
    setIsShown((value) => !value);
  };

  return (
    <div className={styles.password_box}>
      <input
        type={isShown ? "text" : "password"}
        id="loginpassword-input"
        {...props.register("password")}
        required
      ></input>
      <div
        className={styles.password_switcher}
        onClick={() => handlePasswordViusibility()}
      >
        {isShown ? "скрыть" : "показать"}
      </div>
    </div>
  );
}
