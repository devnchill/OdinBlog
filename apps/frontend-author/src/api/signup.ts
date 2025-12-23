import type { TSendSignUpRequest } from "../types/signup.types";

const sendSignUpRequest = async ({
  userName,
  password,
  role,
  adminPassword,
}: TSendSignUpRequest) => {
  const resSignup = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password, role, adminPassword }),
  });

  const response = await resSignup.json();

  return response;
};

export default sendSignUpRequest;
