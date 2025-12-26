import type { TSendSignUpRequest } from "../types/signup.types";

const sendSignUpRequest = async ({
  userName,
  password,
}: TSendSignUpRequest) => {
  const resSignup = await fetch("/api/signup/viewer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
  });

  const response = await resSignup.json();

  return response;
};

export default sendSignUpRequest;
