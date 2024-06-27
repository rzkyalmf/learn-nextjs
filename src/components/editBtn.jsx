import React from "react";

export const EditBtn = () => {
  // async function handleUpdate() {}

  return (
    <form action="{handleUpdate}" className="space-y-2">
      <p> Update File di sini</p>
      <input name="file" type="file" />
      <input name="author" type="text" placeholder="Author" />
      <button className="w-fit text-xs"> Update </button>
    </form>
  );
};
