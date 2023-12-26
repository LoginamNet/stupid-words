import { setWordType } from "../ulits";

import { Word } from "../interfaces";

import styles from "./word.module.css";
import DeleteButton from "../buttons/delete-button";

interface ComponentProps {
  APIEndPoint: string;
  word: Word;
}

export default function WordCard(props: ComponentProps) {
  return (
    <div>
      <div className={styles.horizontal_block}>
        <h4>{props.word.word}</h4>
        <div className={styles.horizontal_block}>
          <span>{props.word.mature === "true" ? "18+" : "0+"}</span>
          <span>{setWordType(props.word.type)}</span>
        </div>
      </div>
      <span>[${props.word._id}]</span>
      <p>{props.word.text}</p>
      {props.APIEndPoint === "actual" && (
        <span>Отметок нравится: {props.word.likes}</span>
      )}
      <div className={styles.horizontal_block}>
        <DeleteButton APIEndPoint={props.APIEndPoint} id={props.word._id} />
      </div>
    </div>
  );
}
