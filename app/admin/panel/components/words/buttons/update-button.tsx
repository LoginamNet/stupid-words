interface ComponentProps {
  getData: () => Promise<void>;
}

export default function UpdateButton(props: ComponentProps) {
  return (
    <button
      onClick={() => {
        props.getData();
      }}
    >
      обновить
    </button>
  );
}
