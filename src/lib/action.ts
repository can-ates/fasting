import { signIn } from "@/api";
import { setCookie } from "@/auth";
import { FormDataTypes } from "@/types";

export async function authenticate(formData: FormDataTypes) {
  try {
    const res = await signIn(formData);
    const { user_id } = await res.json();
    setCookie(user_id);
  } catch (error) {
    console.log(error);
  }
}
