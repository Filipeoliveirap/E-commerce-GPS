import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../service/authService";
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

  async function handleRegister(data) {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        ...data,
        cpf: data.cpf.replace(/\D/g, ""),
        telephone: data.telefone.replace(/\D/g, ""),
        role: "USER",
      };

      const response = await registerUser(payload);
      const firstName = response.name.split(" ")[0];

      toast.success(
        `Bem-vindo(a), ${firstName}! Cadastro realizado com sucesso.`
      );
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Erro ao cadastrar usuário",
      };
    } finally {
      setLoading(false);
    }
  }
  
  return { handleLogin, handleRegister, isAuthenticated, user, loading, error };
}
