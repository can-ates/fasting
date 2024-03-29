import { FormDataTypes } from "@/types";

export async function signIn(body: FormDataTypes) {
  return await fetch("https://fe-challange-24.me-f72.workers.dev/", {
    method: "post",
    headers: {
      Authorization: "Bearer olzxoqpibrhq6lfjkkypy",
    },
    body: JSON.stringify(body),
  });
}
