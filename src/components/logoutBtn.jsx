"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const LogoutBtn = () => {
  const router = useRouter();

  //Delete cookie
  function handleLogout() {
    Cookies.remove("token");
    router.push("/login");
  }

  return (
    <button onClick={handleLogout} className="w-fit">
      Logout
    </button>
  );
};
