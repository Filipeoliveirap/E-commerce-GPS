import { api } from "./api";
import { AddressEndpoint } from "../constants/api";

export async function createAddress(data, token) {
  try {
    const response = await api.post(AddressEndpoint.CREATE, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 201) {
      throw new Error(response.data?.message || "Falha ao cadastrar endereço.");
    }

    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao cadastrar endereço.");
  }
}

export async function userHasAddress(token) {
  try {
    const response = await api.get(AddressEndpoint.FIND_ADDRESSES, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}
