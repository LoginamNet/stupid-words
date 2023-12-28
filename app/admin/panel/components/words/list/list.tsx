import { Key, useState } from "react";

import WordCard from "../word/word";

import { StupidWords, Word } from "../interfaces";

import styles from "./list.module.css";

interface ComponentProps {
  APIEndPoint: string;
  words: StupidWords | undefined;
  isLoading: boolean;
  getData: () => Promise<void>;
}

export default function List(props: ComponentProps) {
  const [wordToChangeID, setWordToChangeID] = useState("");

  return (
    <div className={styles.list}>
      {!props.words || props.isLoading ? (
        <p>Грузим словечки...</p>
      ) : props.words?.data.length ? (
        props.words.data.map((el: Word, key: Key) => (
          <WordCard
            key={key}
            APIEndPoint={props.APIEndPoint}
            word={el}
            wordToChangeID={wordToChangeID}
            setWordToChangeID={setWordToChangeID}
            getData={props.getData}
          />
        ))
      ) : (
        <p>К сожалению (или нет), такого слова не существует</p>
      )}
    </div>
  );
}
