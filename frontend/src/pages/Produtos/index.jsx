
import Header from "../../components/molecules/Header";
import ProductFilter from "../../components/molecules/ProductFilter";
import ProductCard from "../../components/molecules/ProductCard";
import ProductHero from "../../components/organisms/ProductHero";
import BenefitsBar from "../../components/organisms/BenefitsBar";
import NewsletterSignup from "../../components/organisms/NewsletterSignup";
import Footer from "../../components/organisms/Footer";
import { useProducts } from "../../hook/product";

export default function Produtos() {
  const { products, loading, pageInfo, nextPage, prevPage } = useProducts();

  const handleAddToCart = (product) => {
    alert(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="bg-white dark:bg-navy-900">
      <Header hideOnScroll={true} />
      <ProductHero />
      <BenefitsBar />

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar Filter */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilter />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-2">
                Todos os Produtos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Mostrando {products.length}
                produtos
              </p>
            </div>

            {loading ? (
              <p>Carregando...</p>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <p>Nenhum produto encontrado</p>
            )}
          </div>
          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={prevPage}
              disabled={pageInfo.page === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
            >
              Anterior
            </button>

            <span className="font-semibold">
              Página {pageInfo.page + 1} de {pageInfo.totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={pageInfo.last}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        </div>
      </main>

      <NewsletterSignup />
      <Footer />
    </div>
  );
}
