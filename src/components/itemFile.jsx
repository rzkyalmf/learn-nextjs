"use client";

import { DeleteBtn } from "@/components/deleteBtn";
import { EditBtn } from "@/components/editBtn";
import Image from "next/image";
import { useState } from "react";

export const ItemFile = ({ id, fileKey }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const publicUrl =
    "https://pub-ab7c0457350c44929f23932327db41ab.r2.dev/learn-create-storage";

  return (
    <div>
      {isEditMode ? (
        <EditBtn />
      ) : (
        <div>
          <Image
            src={`${publicUrl}/${id}/${fileKey}`}
            width={200}
            height={200}
            alt=""
          />
          <div>{fileKey}</div>
          <div className="flex gap-2">
            <button className="w-fit" onClick={() => setIsEditMode(true)}>
              Edit
            </button>
            <DeleteBtn folder={id} fileKey={fileKey} />
          </div>
        </div>
      )}
    </div>
  );
};
