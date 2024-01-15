"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function LoginButton() {
  const router = useRouter();

  const getData = async (): Promise<void> => {
    try {
      const res = await fetch(
        "https://stupid-words-api.vercel.app/api/auth/admin/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: "loginamnet@gmail.com",
            password: "56470012",
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log(res.status);

      if (res.ok) {
        const data = await res.json();
        setCookie("sw_auth_token", data);
        router.replace("/admin/panel/actual");
      } else {
        console.log("FAILED");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={() => getData()}>ПОЛУЧАЙ!</button>;
}
