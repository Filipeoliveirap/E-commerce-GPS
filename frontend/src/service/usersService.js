import { api } from "./api";
import { UsersEndpoit } from "../constants/api";

export async function getProfile(token) {
  try {
    const response = await api.get(UsersEndpoit.GET_PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar perfil.");
  }
}
export async function updateProfile(data, token) {
  try {
    const response = await api.put(UsersEndpoit.UPDATE_PROFILE, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar perfil.",
    );
  }
}

export async function updatePassword(passwordData, token) {
  try {
    const response = await api.put(
      UsersEndpoit.UPDATE_PASSWORD,
      passwordData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar senha.",
    );
  }
}

export const getCamposReais = async (token) => {
  try {
    const response = await api.get(UsersEndpoit.CAMPOS_REAIS, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar campos reais:", error);
    throw error;
  }
};

export async function deleteAccount(token) {
  try {
    const response = await api({
      method: 'delete',
      url: UsersEndpoit.DELETE_ACCOUNT,
      headers: { Authorization: `Bearer ${token}` },
      data: { confirmed: true },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao deletar conta.",
    );
  }
}

