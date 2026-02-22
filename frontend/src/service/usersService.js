import { api } from "./api";
import { UsersEndpoit } from "../constants/api";

export async function getProfile() {
  try {
    const response = await api.get(UsersEndpoit.GET_PROFILE);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar perfil.");
  }
}
export async function updateProfile(data) {
  try {
    const response = await api.put(UsersEndpoit.UPDATE_PROFILE, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar perfil.",
    );
  }
}

export async function updatePassword(newPassword) {
  try {
    const response = await api.put(
      UsersEndpoit.UPDATE_PASSWORD,
      { newPassword },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar senha.",
    );
  }
}

export const getCamposReais = async () => {
  try {
    const response = await api.get(UsersEndpoit.CAMPOS_REAIS);
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar campos reais:", error);
    throw error;
  }
};

export async function deleteAccount() {
  try {
    const response = await api({
      method: 'delete',
      url: UsersEndpoit.DELETE_ACCOUNT,
      data: { confirmed: true },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao deletar conta.",
    );
  }
}

