import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    const toastDelID = toast.loading("Удаление..");

    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}/${word._id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.update(toastDelID, {
          render: "Успешно удалено!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        props.getData();
      } else {
        if (res.status === 409) {
          toast.update(toastDelID, {
            render: "Слово уже было удалено! Обновите список!",
            type: "warning",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.update(toastDelID, {
            render: "Что-то пошло не так! Повторите попытку",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      }
    } catch (err) {
      console.log(err);

      toast.update(toastDelID, {
        render: "Что-то пошло не так! Повторите попытку",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const sendToActualWords = async (): Promise<void> => {
    const toastSendID = toast.loading("Переносим в актуальный словарь..");

    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}/${word._id}/send`,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        toast.update(toastSendID, {
          render: "Перенос успешен!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        deleteWord();
      } else {
        if (res.status === 409) {
          toast.update(toastSendID, {
            render:
              "Перенос уже был осуществлен или слово было удалено из предложенных! Обновите список!",
            type: "warning",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.update(toastSendID, {
            render: "Что-то пошло не так! Повторите попытку",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      }
    } catch (err) {
      console.log(err);

      toast.update(toastSendID, {
        render: "Что-то пошло не так! Повторите попытку",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const getWordData = async (): Promise<void> => {
    const toastUpdateID = toast.loading("Обновляем слово..");

    try {
      const res = await fetch(
        `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}/${word._id}`
      );

      if (!res.ok) {
        toast.update(toastUpdateID, {
          render: "Что-то пошло не так! Повторите попытку",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }

      const resObject = await res.json();

      setWord(resObject.data);

      toast.update(toastUpdateID, {
        render: "Слово обновлено!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      console.log(err);

      toast.update(toastUpdateID, {
        render: "Что-то пошло не так! Повторите попытку",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
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
