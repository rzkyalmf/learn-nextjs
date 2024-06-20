import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(request) {
  const token = cookies().get("token")?.value;
  const secretKey = "secretkey";
  const secret = new TextEncoder().encode(secretKey);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jose.jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request));
  }
}

// menentukan route yang harus di proteksi
export const config = {
  matcher: ["/dashboard"],
};
