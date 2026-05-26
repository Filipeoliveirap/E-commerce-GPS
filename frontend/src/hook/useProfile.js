import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateProfile,
  getProfile,
  updatePassword,
  getCamposReais,
  deleteAccount,
} from "../service/usersService";

export function useProfile() {
  const { user, token, updateUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [camposReais, setCamposReais] = useState({
    email: "",
    cpf: "",
    telephone: "",
  });

  const handleGetProfile = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const profileData = await getProfile();
      updateUser(profileData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, updateUser]);

  const handleUpdateProfile = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const updatedUser = await updateProfile(data);
        updateUser(updatedUser);
        toast.success("Perfil atualizado com sucesso!");
        return true;
      } catch (err) {
        toast.error(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [updateUser],
  );

  const handleUpdatePassword = useCallback(
    async (data) => {
      const { currentPassword, newPassword } = data;

      if (!currentPassword || !newPassword) {
        toast.error("Preencha todos os campos");
        return false;
      }

      try {
        setLoading(true);
        await updatePassword(data, token);
        toast.success("Senha alterada com sucesso!");
        return true;
      } catch (err) {
        toast.error(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const fetchCamposReais = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getCamposReais();
      setCamposReais(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      setLoading(true);
      await deleteAccount();
      logout();
      toast.success("Conta deletada com sucesso!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  useEffect(() => {
    handleGetProfile();
  }, [handleGetProfile]);

  return {
    user,
    loading,
    handleUpdateProfile,
    handleUpdatePassword,
    handleGetProfile,
    fetchCamposReais,
    camposReais,
    handleDeleteAccount,
    handleLogout,
  };
}
