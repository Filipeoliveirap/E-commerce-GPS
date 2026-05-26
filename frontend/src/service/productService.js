import { api } from "./api";

function buildAuthHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getProductsPaged(page = 0, size = 8, token) {
  try {
    const response = await api.get(`/products/paged`, {
      params: {
        page,
        size
      },
      headers: buildAuthHeaders(token),
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

export async function getProductsByCategory(category, token) {
  try {
    const response = await api.get(`/products/category/${category}`, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao buscar produtos por categoria.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function getProductById(id, token) {
  try {
    const response = await api.get(`/products/${id}`, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao buscar produto.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function getAllProducts(token) {
  try {
    const response = await api.get(`/products`, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao buscar produtos.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function createProduct(productData, token) {
  try {
    const response = await api.post(`/products`, productData, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao criar produto.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function updateProduct(idOrData, productDataOrToken, maybeToken) {
  const isObjectStyle = typeof idOrData === "object" && idOrData !== null;
  const id = isObjectStyle ? idOrData.id : idOrData;
  const productData = isObjectStyle ? idOrData : productDataOrToken;
  const token = isObjectStyle ? productDataOrToken : maybeToken;

  try {
    const response = await api.put(`/products/${id}`, productData, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao atualizar produto.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

export async function deleteProduct(id, token) {
  try {
    const response = await api.delete(`/products/${id}`, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro ao deletar produto.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}
