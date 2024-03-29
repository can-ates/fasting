"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookie(userID: string) {
  cookies().set("fastingSession", userID, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/home");
}
