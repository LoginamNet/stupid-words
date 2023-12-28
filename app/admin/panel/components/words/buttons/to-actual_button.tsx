interface ComponentProps {
  sendToActualWords: () => Promise<void>;
}

export default function SendToActualButton(props: ComponentProps) {
  return (
    <button
      onClick={() => {
        props.sendToActualWords();
      }}
    >
      добавить в словарь
    </button>
  );
}
