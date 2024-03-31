import { createStorage } from "@/actions";
import { signIn } from "@/api";
import { setCookie } from "@/auth";
import { FormDataTypes } from "@/types";

export async function authenticate(formData: FormDataTypes) {
  try {
    const res = await signIn(formData);
    const { user_id } = await res.json();

    setCookie(user_id);

    const user = {
      id: user_id,
      name: formData.name,
      email: formData.email,
    };

    createStorage(user);

    return user;
  } catch (error) {
    console.log(error);
  }
}
