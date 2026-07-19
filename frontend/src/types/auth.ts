export interface User {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface AuthResponse {
  user: User;
  token: string;
}