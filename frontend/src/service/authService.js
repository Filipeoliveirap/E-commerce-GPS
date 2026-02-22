import { api } from "./api";
import { UsersEndpoit } from "../constants/api";

export async function loginUser(data) {
  try {
    const response = await api.post(UsersEndpoit.LOGIN, {
      email: data.email,
      password: data.password,
    });
    return {
      token: response.data.token,
      user: {
        id: response.data.id,
        email: data.email,
        name: response.data.name
      }
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao realizar login.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function registerUser(data) {
  try {
    const response = await api.post(UsersEndpoit.REGISTER, {
      name: data.name,
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      telephone: data.telephone,
    });
    return {
      token: response.data.token,
      user: {
        id: response.data.id,
        email: data.email,
        name: data.name
      },
      message: "Cadastro realizado com sucesso!"
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao realizar cadastro.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

