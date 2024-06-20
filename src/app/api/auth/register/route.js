import bcrypt from "bcrypt";
import { prisma } from "@/utils/prisma";

export async function POST(req) {
  const { name, email, password } = await req.json();

  // Jika name atau email atau pass tidak di isi maka return...
  if (!name || !email || !password) {
    return Response.json(
      { message: "All field must be filled" },
      { status: 400 }
    );
  }

  // Cek apakah email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  // Jika email sudah terdaftar, return...
  if (existingUser) {
    return Response.json({ message: "Email already exists" }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Jika email belum terdaftar, create new user.
  const createNewUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return Response.json(
    { message: "User created successfully", data: createNewUser },
    { status: 201 }
  );
}
