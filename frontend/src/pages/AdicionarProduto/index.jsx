import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/molecules/Header";
import Footer from "../../components/organisms/Footer";
import { createProduct } from "../../service/productService";
import { useAuthStore } from "../../store/authStore";

const CATEGORY_OPTIONS = [
  "Eletrônicos",
  "Smartphones",
  "Computadores",
  "Acessórios",
  "Áudio",
  "Consoles",
];

function toNumber(value) {
  const normalized = String(value ?? "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function AdicionarProduto() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    inStock: true,
    quantity: 1,
    visible: true,
  });

  const [errors, setErrors] = useState({});

  const stockStatus = useMemo(() => {
    if (!formData.visible) return "Oculto";
    if (!formData.inStock || Number(formData.quantity) <= 0) return "Sem estoque";
    return "Em estoque";
  }, [formData.visible, formData.inStock, formData.quantity]);

  const handleChange = (event) => {
    const { name, type, checked, tagName } = event.target;
    let { value } = event.target;

    const shouldTrimLeadingSpace = ["text", "search", "url"].includes(type) || tagName === "TEXTAREA";
    if (shouldTrimLeadingSpace && typeof value === "string") {
      value = value.replace(/^\s+/, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const adjustQuantity = (delta) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(0, Number(prev.quantity || 0) + delta),
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Informe o nome do produto";
    if (!formData.description.trim()) nextErrors.description = "Informe a descrição";
    if (!formData.category.trim()) nextErrors.category = "Informe a categoria";
    if (!formData.image.trim()) nextErrors.image = "Informe a URL da imagem";

    const price = toNumber(formData.price);
    if (price <= 0) nextErrors.price = "Preço deve ser maior que zero";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    if (!token) {
      toast.error("Faça login para cadastrar produtos.");
      navigate("/login");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: toNumber(formData.price),
      category: formData.category.trim(),
      image: formData.image.trim(),
      inStock: formData.visible && formData.inStock && Number(formData.quantity) > 0,
    };

    try {
      setLoading(true);
      await createProduct(payload, token);
      toast.success("Produto cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      toast.error(error.message || "Erro ao cadastrar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-navy-900 dark:text-white min-h-screen flex flex-col">
      <Header hideOnScroll={true} />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link className="hover:text-primary" to="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-primary" to="/produtos">
            Produtos
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-navy-900 dark:text-white font-medium">Adicionar Produto</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold">Adicionar Produto</h2>
            <p className="text-gray-500 dark:text-gray-400">Cadastre um novo item na loja TechWave Eletrônicos.</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/produtos"
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-navy-700 font-semibold hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              form="add-product-form"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-primary text-navy-900 font-bold hover:brightness-95 transition-all flex items-center gap-2 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              {loading ? "Salvando..." : "Salvar Produto"}
            </button>
          </div>
        </div>

        <form id="add-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-200 dark:border-navy-700 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Informações Gerais
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                    Nome do Produto
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary"
                    placeholder="Ex.: Smartphone Gamer X1 Ultra 5G"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={7}
                    className="w-full bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary resize-none"
                    placeholder="Descreva os principais detalhes do produto"
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-200 dark:border-navy-700 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                    Preço (R$)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">R$</span>
                    <input
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-lg pl-12 pr-4 py-3 focus:ring-primary focus:border-primary font-bold"
                      placeholder="0,00"
                    />
                  </div>
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Categoria</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Selecione uma categoria</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <section className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-200 dark:border-navy-700 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">image</span>
                Imagem do Produto
              </h3>

              <div className="relative aspect-square rounded-lg bg-gray-100 dark:bg-navy-900 border border-dashed border-gray-300 dark:border-navy-700 overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                    <span className="material-symbols-outlined text-4xl">image</span>
                    <span className="text-xs">Pré-visualização</span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">URL da imagem</label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary"
                  placeholder="https://..."
                />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
              </div>
            </section>

            <section className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-200 dark:border-navy-700 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory_2</span>
                Estoque
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                    Quantidade em Estoque
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="h-11 w-11 bg-gray-100 dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-l-lg hover:bg-gray-200 dark:hover:bg-navy-700 flex items-center justify-center"
                      onClick={() => adjustQuantity(-1)}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      name="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="h-11 w-full bg-gray-50 dark:bg-navy-900 border-y border-x-0 border-gray-200 dark:border-navy-700 text-center focus:ring-0 font-bold"
                    />
                    <button
                      type="button"
                      className="h-11 w-11 bg-gray-100 dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-r-lg hover:bg-gray-200 dark:hover:bg-navy-700 flex items-center justify-center"
                      onClick={() => adjustQuantity(1)}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                <label className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg cursor-pointer">
                  <span className="text-sm font-medium">Produto em estoque</span>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </label>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-lg">
                  <span className="text-sm font-medium">Status</span>
                  <span className="text-xs font-bold px-2 py-1 rounded uppercase tracking-wider bg-green-500/20 text-green-600 dark:text-green-400">
                    {stockStatus}
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-200 dark:border-navy-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold">Visibilidade</span>
                  <span className="text-xs text-gray-500">Exibir no catálogo</span>
                </div>
                <input
                  type="checkbox"
                  name="visible"
                  checked={formData.visible}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </section>
          </div>

          <div className="mt-2 flex md:hidden items-center gap-3 lg:col-span-3">
            <Link
              to="/produtos"
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-navy-700 font-semibold text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg bg-primary text-navy-900 font-bold disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
