import { Key } from "react";

import WordCard from "../word/word";

import { StupidWords, Word } from "../interfaces";

import styles from "./list.module.css";

interface ComponentProps {
  APIEndPoint: string;
  words: StupidWords | undefined;
  isLoading: boolean;
}

export default function List(props: ComponentProps) {
  return (
    <div className={styles.list}>
      {!props.words || props.isLoading ? (
        <p>Грузим словечки...</p>
      ) : props.words?.data.length ? (
        props.words.data.map((el: Word, key: Key) => (
          <WordCard key={key} APIEndPoint={props.APIEndPoint} word={el} />
        ))
      ) : (
        <p>К сожалению (или нет), такого слова не существует</p>
      )}
    </div>
  );
}
