import Button from '../../atoms/Button'
import Icon from '../../atoms/Icon'
import Text from '../../atoms/Text'

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg p-5 shadow-md hover:shadow-lg transition-all">
      <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-navy-700 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}
      </div>

      <Text variant="h5" className="mb-2 line-clamp-2">
        {product.name}
      </Text>

      <Text variant="caption" color="text-navy-700 dark:text-gray-400" className="mb-3 line-clamp-2">
        {product.description}
      </Text>

      <div className="flex items-center gap-2 mb-4">
        <Icon name="star" size="sm" className="text-primary" />
        <span className="text-sm font-semibold text-navy-900 dark:text-white">
          {product.rating}
        </span>
        <span className="text-xs text-gray-500">({product.reviews} avaliações)</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          {product.originalPrice && (
            <Text variant="caption" color="text-gray-500" className="line-through">
              R$ {product.originalPrice.toFixed(2)}
            </Text>
          )}
          <p className="text-2xl font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        size="md"
        icon="shopping_cart"
        onClick={() => onAddToCart(product)}
        className="w-full"
      >
        Adicionar
      </Button>
    </div>
  )
}
