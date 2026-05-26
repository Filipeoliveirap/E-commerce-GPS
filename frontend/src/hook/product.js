import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import {
  getProductsPaged,
  getAllProducts,
  createProduct,
  updateProduct,
} from "../service/productService";

function normalizeProduct(rawProduct) {
  const source = rawProduct && typeof rawProduct === "object" ? rawProduct : {};

  const id =
    source.id ??
    source._id ??
    source.productId ??
    source.codigo ??
    null;

  return {
    ...source,
    id,
    name: source.name ?? source.nome ?? source.title ?? "Produto sem nome",
    description: source.description ?? source.descricao ?? "",
    price: Number(source.price ?? source.preco ?? 0),
    originalPrice:
      source.originalPrice != null
        ? Number(source.originalPrice)
        : source.precoOriginal != null
        ? Number(source.precoOriginal)
        : null,
    image: source.image ?? source.imageUrl ?? source.thumbnail ?? "",
    category: source.category ?? source.categoria ?? "",
    inStock:
      source.inStock != null
        ? Boolean(source.inStock)
        : source.stock != null
        ? Number(source.stock) > 0
        : true,
    rating: Number(source.rating ?? source.avaliacao ?? 0),
    reviews: Number(source.reviews ?? source.avaliacoes ?? 0),
  };
}

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

        setProducts((data.content || []).map(normalizeProduct));

        setPageInfo({
          page: data.page,
          size: data.size,
          totalPages: data.totalPages,
          last: data.last,
        });
      } catch (err) {
        try {
          const allProducts = await getAllProducts(token);
          const normalizedProducts = (Array.isArray(allProducts) ? allProducts : []).map(normalizeProduct);

          setProducts(normalizedProducts);
          setPageInfo({
            page: 0,
            size: normalizedProducts.length,
            totalPages: normalizedProducts.length > 0 ? 1 : 0,
            last: true,
          });
        } catch {
          toast.error(err.message);
        }
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