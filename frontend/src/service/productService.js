import { api } from "./api";

export async function getProductsPaged(page = 0, size = 8) {
  try {
    const response = await api.get(`/products/paged`, {
      params: {
        page,
        size
      }
    });
    return {
      content: response.data.content,
      page: response.data.page,
      size: response.data.size,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPages,
      last: response.data.last
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao buscar produtos.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function getProductsByCategory(category) {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao buscar produtos por categoria.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao buscar produto.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function getAllProducts() {
  try {
    const response = await api.get(`/products`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao buscar produtos.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function createProduct(productData) {
  try {
    const response = await api.post(`/products`, productData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao criar produto.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function updateProduct(id, productData) {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao atualizar produto.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function deleteProduct(id) {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao deletar produto.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}
