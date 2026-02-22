import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import {
  getProductsPaged,
  createProduct,
  updateProduct,
} from "../service/productService";

export function useProducts() {
  const { token } = useAuthStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 8,
    totalPages: 0,
    last: false,
  });

  /* =========================
     LISTAGEM PAGINADA
  ========================= */
  const fetchProducts = useCallback(
    async (page = 0) => {
      try {
        setLoading(true);

        const data = await getProductsPaged(page, pageInfo.size, token);

        setProducts(data.content);

        setPageInfo({
          page: data.page,
          size: data.size,
          totalPages: data.totalPages,
          last: data.last,
        });
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [token, pageInfo.size]
  );

  /* =========================
     CRIAR PRODUTO
  ========================= */
  const handleCreateProduct = async (formData) => {
    try {
      setLoading(true);

      await createProduct(formData, token);

      toast.success("Produto cadastrado com sucesso!");

      // refresh automático
      fetchProducts(0);

      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     ATUALIZAR PRODUTO
  ========================= */
  const handleUpdateProduct = async (formData) => {
    try {
      setLoading(true);

      await updateProduct(formData, token);

      toast.success("Produto atualizado com sucesso!");

      // refresh mantendo página atual
      fetchProducts(pageInfo.page);

      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     PAGINAÇÃO
  ========================= */
  const nextPage = () => {
    if (!pageInfo.last) {
      fetchProducts(pageInfo.page + 1);
    }
  };

  const prevPage = () => {
    if (pageInfo.page > 0) {
      fetchProducts(pageInfo.page - 1);
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, [fetchProducts]);

  return {
    products,
    loading,
    pageInfo,

    nextPage,
    prevPage,
    fetchProducts,

    handleCreateProduct,
    handleUpdateProduct,
  };
}