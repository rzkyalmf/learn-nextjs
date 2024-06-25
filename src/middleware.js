import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(request) {
  // 1. Cek apakah ada token di cookies
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // rewrite ke halaman login
  }

  // 2. Cek apakah token valid
  const secretKey = process.env.SECRET_KEY;
  // Convert the secretKey to a Uint8Array
  const secret = new TextEncoder().encode(secretKey);

  try {
    await jose.jwtVerify(token, secret);
    return NextResponse.next(); // lanjutkan ke route selanjutnya
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url)); // redirect ke halaman login
  }
}

// menentukan route yang harus di proteksi
export const config = {
  matcher: ["/dashboard"],
};
