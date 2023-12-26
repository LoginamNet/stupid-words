import { setWordType } from "../ulits";

import { Word } from "../interfaces";

import styles from "./word.module.css";
import DeleteButton from "../buttons/delete-button";
import SendToActualButton from "../buttons/to-actual_button";

interface ComponentProps {
  APIEndPoint: string;
  word: Word;
  getData: () => Promise<void>;
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
      <span>[{props.word._id}]</span>
      <p>{props.word.text}</p>
      {props.APIEndPoint === "stupidwords" && (
        <span>Отметок нравится: {props.word.likes}</span>
      )}
      <div className={styles.horizontal_block}>
        <DeleteButton
          APIEndPoint={props.APIEndPoint}
          id={props.word._id}
          getData={props.getData}
        />
        {props.APIEndPoint === "offeredwords" && (
          <SendToActualButton
            APIEndPoint={props.APIEndPoint}
            id={props.word._id}
            getData={props.getData}
          />
        )}
      </div>
    </div>
  );
}
