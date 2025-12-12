import { useState } from 'react'
import Header from '../../components/molecules/Header'
import ProductFilter from '../../components/molecules/ProductFilter'
import ProductCard from '../../components/molecules/ProductCard'
import ProductHero from '../../components/organisms/ProductHero'
import BenefitsBar from '../../components/organisms/BenefitsBar'
import NewsletterSignup from '../../components/organisms/NewsletterSignup'
import Footer from '../../components/organisms/Footer'

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: 'Smartphone topo de linha com câmera avançada',
    price: 7999,
    originalPrice: 8999,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 245,
    discount: 11,
    category: 'Smartphones',
    inStock: true
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    description: 'Laptop poderoso para profissionais',
    price: 12999,
    originalPrice: 14999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 189,
    discount: 13,
    category: 'Computadores',
    inStock: true
  },
  {
    id: 3,
    name: 'AirPods Pro',
    description: 'Fones com cancelamento de ruído',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 512,
    category: 'Acessórios',
    inStock: true
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24',
    description: 'Smartphone Android flagship',
    price: 5999,
    originalPrice: 6999,
    image: 'https://m.magazineluiza.com.br/a-static/420x420/smartphone-samsung-galaxy-s24-ultra-68-galaxy-ai-256gb-titanio-preto-5g-12gb-ram-cam-quadrupla-200mp-selfie-12mp-bateria-5000mah-dual-chip/magazineluiza/238093700/0033a48af0e3f87a570ddbd42e456214.jpg',
    rating: 4.6,
    reviews: 378,
    discount: 14,
    category: 'Smartphones',
    inStock: true
  },
  {
    id: 5,
    name: 'Mouse Logitech MX Master',
    description: 'Mouse ergonomista para produtividade',
    price: 599,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 234,
    category: 'Periféricos',
    inStock: true
  },
  {
    id: 6,
    name: 'iPad Pro 12.9',
    description: 'Tablet pro para criatividade',
    price: 8999,
    originalPrice: 9999,
    image: 'https://buy.gazelle.com/cdn/shop/files/Silver-cropped_31499888-0998-4109-9319-41ae4f3447fb.jpg?v=1757019534&width=713',
    rating: 4.7,
    reviews: 156,
    discount: 10,
    category: 'Computadores',
    inStock: true
  },
  {
    id: 7,
    name: 'Dell XPS 13',
    description: 'Ultrabook compacto e poderoso',
    price: 7499,
    originalPrice: 8499,
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/9345/media-gallery/touch/silver/xps-13-9345-laptop-silver-copilot-pc-mg.png?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=612&qlt=100,1&resMode=sharp2&size=612,402&chrss=full',
    rating: 4.5,
    reviews: 142,
    discount: 12,
    category: 'Computadores',
    inStock: true
  },
  {
    id: 8,
    name: 'Pixel Watch 2',
    description: 'Smartwatch com Google Assistant',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 89,
    category: 'Acessórios',
    inStock: true
  }
]

export default function Produtos() {
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS)

  const handleFilterChange = (filters) => {
    let filtered = MOCK_PRODUCTS

    if (filters.priceRange) {
      filtered = filtered.filter(p => p.price <= filters.priceRange[1])
    }

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating)
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock)
    }

    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product) => {
    alert(`${product.name} adicionado ao carrinho!`)
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
              <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-2">
                Todos os Produtos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Mostrando {filteredProducts.length} de {MOCK_PRODUCTS.length} produtos
              </p>
            </div>

            {filteredProducts.length > 0 ? (
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
