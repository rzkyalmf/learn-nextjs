"use client";

import { useRouter } from "next/navigation";

export const DeleteBtn = ({ folder, fileKey }) => {
  const router = useRouter();

  async function handleDeleteImage() {
    await fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({ folder, key: fileKey }),
    });

    router.refresh();
  }

  return (
    <button className="w-fit" onClick={handleDeleteImage}>
      Delete
    </button>
  );
};
