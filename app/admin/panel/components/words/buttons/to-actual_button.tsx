interface ComponentProps {
  APIEndPoint: string;
  id: string;
  getData: () => Promise<void>;
}

export default function SendToActualButton(props: ComponentProps) {
  const deleteWord = async (APIEndPoint: string, id: string): Promise<void> => {
    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${APIEndPoint}/${id}/send`,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        console.log("Word was added to actual words list");
        props.getData();
      } else {
        if (res.status === 409) {
          console.log(
            "Word was allready added to main DB or deleted from offered words. Please, update offered words list"
          );
          props.getData();
        } else {
          console.log("Oops! Something is wrong.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={() => {
        deleteWord(props.APIEndPoint, props.id);
      }}
    >
      добавить в словарь
    </button>
  );
}
