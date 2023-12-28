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

  const deleteWord = async (): Promise<void> => {
    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}/${word._id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("Word was removed from DB");
        props.getData();
      } else {
        if (res.status === 409) {
          console.log("Word was allready deleted. Please, update words list");
        } else {
          console.log("Oops! Something is wrong.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendToActualWords = async (): Promise<void> => {
    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}/${word._id}/send`,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        console.log("Word was added to actual words list");
        deleteWord();
      } else {
        if (res.status === 409) {
          console.log(
            "Word was allready added to main DB or deleted from offered words. Please, update offered words list"
          );
        } else {
          console.log("Oops! Something is wrong.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getWordData = async (): Promise<void> => {
    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}/${word._id}`
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

  useEffect(() => {
    props.wordToChangeID === word._id
      ? setInChangeMod(true)
      : setInChangeMod(false);
  }, [props.wordToChangeID, word._id]);

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
            <div className={styles.horizontal_block}>
              <span>Создано: {word.createdAt}</span>
              <span>Изменено: {word.updatedAt}</span>
            </div>
          </div>
          <span>[{word._id}]</span>
          <p>{word.text}</p>
          {props.APIEndPoint === "stupidwords" && (
            <span>Отметок нравится: {word.likes}</span>
          )}
          <div className={styles.horizontal_block}>
            <DeleteButton deleteWord={deleteWord} />
            {props.APIEndPoint === "offeredwords" && (
              <SendToActualButton sendToActualWords={sendToActualWords} />
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
