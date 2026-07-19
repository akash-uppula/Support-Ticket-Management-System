"use client";

import { useState } from "react";
import axios from "axios";

export function useApi() {
  const [error, setError] = useState("");

  const execute = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      setError("");

      return await apiCall();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Something went wrong");
      } else {
        setError("Something went wrong");
      }

      return null;
    }
  };

  return {
    execute,
    error,
  };
}
