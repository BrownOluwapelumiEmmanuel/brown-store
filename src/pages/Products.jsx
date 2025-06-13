import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/currency'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const discountedPrice = product.price * (1 - product.discountPercentage / 100)
          
          return (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price, product.discountPercentage)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <>
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          {product.discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products 