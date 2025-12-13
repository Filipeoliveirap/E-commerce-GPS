import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../service/authService";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { login, isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(email, password) {
    try {
      setLoading(true);
      setError(null);

      const { token, name } = await loginUser({ email, password });
      const firstName = name.split(" ")[0];
      
      login({ name }, token); 
      toast.success(`Bem-vindo de volta, ${firstName}!`);
      return true;
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, isAuthenticated, user, loading, error };
}
