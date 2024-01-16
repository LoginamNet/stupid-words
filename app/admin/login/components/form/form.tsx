"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import EmailInput from "./inputs/email-input";
import PasswordInput from "./inputs/password-input";

import { LoginFormInputs } from "./interfaces";

import styles from "./form.module.css";

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const sendData = async (submitData: LoginFormInputs): Promise<void> => {
    const toastID = toast.loading("Связываемся с БД..");

    try {
      const res = await fetch(
        "https://stupid-words-api.vercel.app/api/auth/admin/login",
        {
          method: "POST",
          body: JSON.stringify(submitData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();

        toast.update(toastID, {
          render: "Связь с БД установлена!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        toast.success("Вход выполнен!", {
          onClose: () => {
            console.log(123);
            setCookie("sw_auth_token", data);
            router.replace("/admin/panel/actual");
          },
          autoClose: 5000,
        });
      } else {
        toast.update(toastID, {
          render: "Связь с БД установлена!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        res.status === 409
          ? toast.warn("Пользователя с таким email не существует")
          : res.status === 401
          ? toast.warn("Неправильный пароль")
          : toast.error("Что-то пошло не так! Повторите попытку");
      }
    } catch (err) {
      console.log(err);

      toast.update(toastID, {
        render: "Ошибка при взаимодействии с БД!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    sendData(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <EmailInput register={register} />
      <PasswordInput register={register} />
      <input type="submit" value="ВОЙТИ" />
    </form>
  );
}
