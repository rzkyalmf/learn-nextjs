import { Dashboard } from "@/components/dashboard";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function Layout({ children }) {
  const cookiesStore = cookies();

  // 1. Ambil Token dari cookies
  const token = cookiesStore.get("token");

  // 2. Decode token
  const payload = jwt.decode(token.value);
  // console.log(payload);

  return (
    <Dashboard name={payload.name} email={payload.email}>
      {children}
    </Dashboard>
  );
}

// Protect Route Dengan Layout

// import { Dashboard } from "@/components/dashboard";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import jwt from "jsonwebtoken";

// export default function Layout({ children }) {
//   const cookiesStore = cookies();

//   // 1. Cek apakah ada token di cookies
//   const token = cookiesStore.get("token");
//   if (!token?.value) {
//     redirect("/login");
//   }

//   // 2. Cek apakah token valid
//   try {
//     jwt.verify(token.value, "secretkey");

//     const payload = jwt.decode(token.value);
//     // console.log(payload);

//     return (
//       <Dashboard name={payload.name} email={payload.email}>
//         {children}
//       </Dashboard>
//     );
//   } catch (error) {
//     redirect("/login");
//   }
// }
