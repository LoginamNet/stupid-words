import { UseFormRegister } from "react-hook-form";

import { AddFormInputs } from "../../interfaces";

interface ComponentProps {
  register: UseFormRegister<AddFormInputs>;
}

export default function MatureInputs(props: ComponentProps) {
  const matureTypes = [
    { text: "Да", type: "false", id: "false" },
    { text: "Нет", type: "true", id: "true" },
  ];

  return (
    <fieldset>
      <legend>Можно детям?</legend>
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
