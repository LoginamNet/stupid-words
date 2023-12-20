import { UseFormRegister } from "react-hook-form";

import { AddFormInputs } from "../../interfaces";

interface ComponentProps {
  register: UseFormRegister<AddFormInputs>;
}

export default function TypeInputs(props: ComponentProps) {
  const types = [
    { text: "Существительное", type: "verb", id: "verb" },
    { text: "Глагол", type: "noun", id: "noun" },
    { text: "Выражение", type: "exp", id: "exp" },
    { text: "Прилагательное", type: "adj", id: "adj" },
  ];

  return (
    <fieldset>
      <legend>Что это такое?</legend>
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
