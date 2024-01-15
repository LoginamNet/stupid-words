"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function LogoutButton() {
  const router = useRouter();

  const logoutHandler = () => {
    deleteCookie("sw_auth_token");
    router.replace("/admin/login");
  };

  return (
    <button
      onClick={() => {
        logoutHandler();
      }}
    >
      Выйти
    </button>
  );
}
