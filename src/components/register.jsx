"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const Register = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleRegister(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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
    router.push("/login");
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <form action={handleRegister} className="w-[320px] space-y-2">
        <section>
          <h1>Register</h1>
          <p> Lengkapi data diri anda</p>
        </section>
        <input name="name" placeholder="name" />
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" type="password" />
        <button>Register</button>
        <div>{message}</div>
      </form>
    </main>
  );
};
