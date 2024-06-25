import React from "react";
import { LogoutBtn } from "./logoutBtn";

export const Dashboard = ({ name, children, email }) => {
  return (
    <>
      <header className="p-6 flex justify-between items-center">
        <div>Logo Nukilans.</div>
        <div className="flex items-center gap-4">
          <div>{name}</div>
          <div>{email}</div>
          <LogoutBtn />
        </div>
      </header>

      <main className="px-6">{children}</main>
    </>
  );
};
