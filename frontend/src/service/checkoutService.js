import { api } from "./api";

export async function checkout(data, token) {
  try {
    const response = await api.post("/api/checkout", data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao finalizar compra.");
  }
}