import { api } from "./api";
import { UsersEndpoit } from "../constants/api";

export async function loginUser(data) {
  try {
    const response = await api.post(UsersEndpoit.LOGIN, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao realizar login.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}
