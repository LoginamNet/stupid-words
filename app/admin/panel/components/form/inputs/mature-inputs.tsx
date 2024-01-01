import { UseFormRegister } from "react-hook-form";

import { FormInputs } from "../interfaces";

interface ComponentProps {
  register: UseFormRegister<FormInputs>;
}

export default function MatureInputs(props: ComponentProps) {
  const matureTypes = [
    { text: "Да", type: "false", id: "false" },
    { text: "Нет", type: "true", id: "true" },
  ];

  return (
    <fieldset>
      <legend>18+:</legend>
      {matureTypes.map((el, key) => (
        <label key={key}>
          <input
            type="radio"
            value={el.type}
            id={`addmature-${el.id}-input`}
            {...props.register("mature")}
            required
          ></input>
          {el.text}
        </label>
      ))}
    </fieldset>
  );
}
