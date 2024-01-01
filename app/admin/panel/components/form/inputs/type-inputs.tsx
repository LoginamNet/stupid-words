import { UseFormRegister } from "react-hook-form";

import { FormInputs } from "../interfaces";

interface ComponentProps {
  register: UseFormRegister<FormInputs>;
}

export default function TypeInputs(props: ComponentProps) {
  const types = [
    { text: "Существительное", type: "noun", id: "noun" },
    { text: "Глагол", type: "verb", id: "verb" },
    { text: "Выражение", type: "exp", id: "exp" },
    { text: "Прилагательное", type: "adj", id: "adj" },
  ];

  return (
    <fieldset>
      <legend>Тип:</legend>
      {types.map((el, key) => (
        <label key={key}>
          <input
            type="radio"
            value={el.type}
            id={`addmature-${el.id}-input`}
            {...props.register("type")}
            required
          ></input>
          {el.text}
        </label>
      ))}
    </fieldset>
  );
}
