import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(email, password) {
    try {
      setLoading(true);
      setError(null);

      const { token, user } = await loginUser({ email, password });

      const normalizedUser = {
        ...user,
        type: user.type.toUpperCase(),
      };

      login(normalizedUser, token);
      return normalizedUser;
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    handleLogin,
    loading,
    error,
  };
}
