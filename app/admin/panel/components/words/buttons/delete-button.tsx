interface ComponentProps {
  APIEndPoint: string;
  id: string;
}

export default function DeleteButton(props: ComponentProps) {
  const deleteWord = async (APIEndPoint: string, id: string): Promise<void> => {
    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${APIEndPoint}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("Word was removed from DB");
      } else {
        res.status === 409
          ? console.log(
              "Word was allready deleted from offered words. Please, update offered words list"
            )
          : console.log("Oops! Something is wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={() => {
        deleteWord(props.APIEndPoint, props.id);
        console.log(props.id);
      }}
    >
      удалить
    </button>
  );
}
