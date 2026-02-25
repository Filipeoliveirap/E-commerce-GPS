import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Header from '../../components/molecules/Header'
import ProductFilter from '../../components/molecules/ProductFilter'
import ProductCard from '../../components/molecules/ProductCard'
import ProductHero from '../../components/organisms/ProductHero'
import BenefitsBar from '../../components/organisms/BenefitsBar'
import NewsletterSignup from '../../components/organisms/NewsletterSignup'
import Footer from '../../components/organisms/Footer'
import { useProducts } from '../../hook/product'
import { useCartStore } from '../../store/cartStore'
import { Link } from 'react-router-dom'

export default function Produtos() {
  const { products, loading } = useProducts()
  const addItem = useCartStore((state) => state.addItem)
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    category: '',
    rating: 0,
    inStock: true,
  })

  const handleFilterChange = (nextFilters) => setFilters(nextFilters)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = Number(product.price ?? 0)
      const rating = Number(product.rating ?? 0)
      const inStock = product.inStock !== false

      if (filters.priceRange && price > filters.priceRange[1]) return false
      if (filters.category && product.category !== filters.category) return false
      if (filters.rating > 0 && rating < filters.rating) return false
      if (filters.inStock && !inStock) return false

      return true
    })
  }, [products, filters])

  const handleAddToCart = (product) => {
    addItem(product)
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

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
              <ProductFilter onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                <h2 className="text-3xl font-bold text-navy-900 dark:text-white">
                  Todos os Produtos
                </h2>
                <Link
                  to="/produtos/adicionar"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-navy-900 font-bold hover:brightness-95 transition-all"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Adicionar produto
                </Link>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Mostrando {filteredProducts.length} de {products.length} produtos
              </p>
            </div>

            {loading ? (
              <p>Carregando...</p>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-gray-400 block mb-4">
                  shopping_cart
                </span>
                <p className="text-xl text-navy-700 dark:text-gray-400">
                  Nenhum produto encontrado com os filtros aplicados.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <NewsletterSignup />
      <Footer />
    </div>
  )
}
