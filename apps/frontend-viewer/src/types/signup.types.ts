type TSendSignUpRequest = {
  userName: string;
  password: string;
  role: "USER" | "AUTHOR" | "ADMIN";
  adminPassword?: string;
};

type TSignUpFormInput = {
  userName: string;
  password: string;
  confirmPassword: string;
  role: "USER" | "AUTHOR" | "ADMIN";
  adminPassword?: string;
};
export type { TSendSignUpRequest, TSignUpFormInput };
