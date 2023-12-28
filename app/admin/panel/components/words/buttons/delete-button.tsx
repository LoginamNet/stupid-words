interface ComponentProps {
  deleteWord: () => Promise<void>;
}

export default function DeleteButton(props: ComponentProps) {
  return (
    <button
      onClick={() => {
        props.deleteWord();
      }}
    >
      удалить
    </button>
  );
}
