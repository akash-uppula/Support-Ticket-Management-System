import api from "@/lib/axios";
import { AuthResponse, User } from "@/types/auth";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);

  return response.data.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);

  return response.data.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/auth/me");

  return response.data.data;
};
