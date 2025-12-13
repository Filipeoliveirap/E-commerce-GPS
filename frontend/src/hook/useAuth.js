import { useState } from "react";
import { toast } from "react-toastify"; // <- não esqueça
import { loginUser } from "../service/authService";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(email, password) {
    try {
      setLoading(true);
      setError(null);

      const { token, name } = await loginUser({ email, password });
      const nomeParaAviso = name.split(" ")[0];
      toast.success(`Bem-vindo de volta, ${nomeParaAviso}!`);
      login({ name }, token); 
      return true;
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
