import { useState } from 'react'

export default function ProductFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    category: '',
    rating: 0,
    inStock: true
  })

  const handlePriceChange = (e) => {
    const newRange = [...filters.priceRange]
    newRange[1] = parseFloat(e.target.value)
    setFilters({ ...filters, priceRange: newRange })
    onFilterChange({ ...filters, priceRange: newRange })
  }

  const handleCategoryChange = (selectedCat) => {
    // Se clicar na mesma categoria, desseleciona
    const newCategory = filters.category === selectedCat ? '' : selectedCat
    const newFilters = { ...filters, category: newCategory }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRatingChange = (rating) => {
    const newFilters = { ...filters, rating }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4">Filtros</h3>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-navy-900 dark:text-gray-200">
          Preço Máximo
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>R$ 0</span>
          <span className="font-bold text-navy-900 dark:text-white">
            R$ {filters.priceRange[1].toFixed(2)}
          </span>
        </div>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-navy-900 dark:text-gray-200">
          Categoria
        </label>
        <div className="space-y-2">
          {['Smartphones', 'Computadores', 'Acessórios', 'Periféricos'].map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === cat}
                onChange={() => handleCategoryChange(cat)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-navy-700 dark:text-gray-300">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-navy-900 dark:text-gray-200">
          Avaliação
        </label>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex items-center gap-2 text-sm transition-colors ${
                filters.rating === rating
                  ? 'text-primary font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              <span className="flex gap-1">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm">
                    star
                  </span>
                ))}
              </span>
              ({rating} estrelas)
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => {
              const newFilters = { ...filters, inStock: e.target.checked }
              setFilters(newFilters)
              onFilterChange(newFilters)
            }}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm text-navy-700 dark:text-gray-300">Apenas em estoque</span>
        </label>
      </div>
    </div>
  )
}
