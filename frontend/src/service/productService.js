
import { api } from "./api";
import { ProductsEndpoint } from "../constants/api";

export async function getProductsPaged(page, size, token) {
  try {
    const response = await api.get(
      `${ProductsEndpoint.PAGED}?page=${page}&size=${size}`,
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao listar produtos."
    );
  }
}


export async function createProduct(data, token) {
  try {
    const response = await api.post(
      ProductsEndpoint.CADASTRO,
      data,
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao criar produto."
    );
  }
}

export async function updateProduct(data, token) {
    try {
        const response = await api.put (
            ProductsEndpoint.UPDATE_PRODUCT.replace("{id}", data.id),
            data,
            {
                headers: token
                ? { Authorization: `Bearer ${token}` }
                : {},
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erro ao atualizar produto."
        );
    }
}