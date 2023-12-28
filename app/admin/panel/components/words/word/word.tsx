import { Dispatch, SetStateAction, useEffect, useState } from "react";

import DeleteButton from "../buttons/delete-button";
import SendToActualButton from "../buttons/to-actual_button";
import ChangeWordForm from "../change-form/change-form";

import { setWordType } from "../ulits";

import { Word } from "../interfaces";

import styles from "./word.module.css";

interface ComponentProps {
  APIEndPoint: string;
  word: Word;
  wordToChangeID: string;
  setWordToChangeID: Dispatch<SetStateAction<string>>;
  getData: () => Promise<void>;
}

export default function WordCard(props: ComponentProps) {
  const [word, setWord] = useState(props.word);
  const [inChangeMod, setInChangeMod] = useState(false);

  useEffect(() => {
    props.wordToChangeID === word._id
      ? setInChangeMod(true)
      : setInChangeMod(false);
  }, [props.wordToChangeID, word._id]);

  const getWordData = async (): Promise<void> => {
    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}/${props.word._id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const resObject = await res.json();

      setWord(resObject.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!inChangeMod ? (
        <div>
          <div className={styles.horizontal_block}>
            <h4>{word.word}</h4>
            <div className={styles.horizontal_block}>
              <span>{word.mature === "true" ? "18+" : "0+"}</span>
              <span>{setWordType(word.type)}</span>
            </div>
          </div>
          <span>[{word._id}]</span>
          <p>{word.text}</p>
          {props.APIEndPoint === "stupidwords" && (
            <span>Отметок нравится: {word.likes}</span>
          )}
          <div className={styles.horizontal_block}>
            <DeleteButton
              APIEndPoint={props.APIEndPoint}
              id={word._id}
              getData={props.getData}
            />
            {props.APIEndPoint === "offeredwords" && (
              <SendToActualButton
                APIEndPoint={props.APIEndPoint}
                id={word._id}
                getData={props.getData}
              />
            )}
            <button onClick={() => props.setWordToChangeID(word._id)}>
              изменить
            </button>
          </div>
        </div>
      ) : (
        <ChangeWordForm
          APIEndPoint={props.APIEndPoint}
          word={word}
          getWordData={getWordData}
          setWordToChangeID={props.setWordToChangeID}
        />
      )}
    </div>
  );
}
