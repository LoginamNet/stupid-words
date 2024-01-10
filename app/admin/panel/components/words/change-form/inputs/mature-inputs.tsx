import { UseFormRegister } from "react-hook-form";

import { ChangeFormInputs } from "../interfaces";

interface ComponentProps {
  mature: string;
  register: UseFormRegister<ChangeFormInputs>;
}

export default function MatureInputs(props: ComponentProps) {
  const matureTypes = [
    { text: "Да", type: "true", id: "true" },
    { text: "Нет", type: "false", id: "false" },
  ];

  return (
    <fieldset>
      <legend>18+:</legend>
      {matureTypes.map((el, key) => (
        <label key={key}>
          <input
            type="radio"
            value={el.type}
            id={`changemature-${el.id}-input`}
            defaultChecked={el.type === props.mature}
            {...props.register("mature")}
            required
          ></input>
          {el.text}
        </label>
      ))}
    </fieldset>
  );
}
