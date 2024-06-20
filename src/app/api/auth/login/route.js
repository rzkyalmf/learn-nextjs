import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "@/utils/prisma";

export async function POST(req) {
  const { email, password } = await req.json();

  // 1. Checking Email
  const userLogin = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userLogin) {
    return Response.json({ message: "Account not found" }, { status: 400 });
  }

  // 2. Compare Password
  const isValidPassword = await bcrypt.compare(password, userLogin.password);

  if (!isValidPassword) {
    return Response.json({ message: "Invalid password" }, { status: 400 });
  }

  // 3. Create Token
  const payload = {
    id: userLogin.id,
    name: userLogin.name,
    email: userLogin.email,
  };

  const token = jwt.sign(payload, "secretkey", {
    expiresIn: "1h",
  });

  // 4. Return jika berhasil
  return new Response(JSON.stringify({ message: "Success login" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=${token}; Path=/; Max-Age=3600`,
    },
  });
}
