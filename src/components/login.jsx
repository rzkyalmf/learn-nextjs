"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400) {
      setMessage(data.message);
      return;
    }

    // setMessage(data.message);
    router.push("/dashboard");
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <form action={handleLogin} className="w-[320px] space-y-2">
        <section>
          <h1>Login</h1>
          <p> Lengkapi form dibawah ini</p>
        </section>
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" type="password" />
        <button>Login</button>
        <div>{message}</div>
      </form>
    </main>
  );
};
