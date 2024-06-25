"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export const UploadData = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  async function handleUpload(formData) {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.status === 400) {
      setMessage(data.message);
      return;
    }

    formRef.current?.reset();
    router.refresh();
    setMessage(null);
  }

  return (
    <form ref={formRef} action={handleUpload} className="space-y-2">
      <section className="text-center">
        <h1>Upload File</h1>
        <p> Upload File and Author di sini</p>
      </section>
      <input name="file" type="file" />
      <input name="author" type="text" placeholder="Author" />
      <button> Upload </button>
      <div>{message}</div>
    </form>
  );
};
