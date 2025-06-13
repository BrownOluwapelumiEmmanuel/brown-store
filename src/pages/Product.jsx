import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../services/api'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/currency'

const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id)
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Failed to load product. Please try again later.')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

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
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Link
          to="/"
          className="text-primary hover:text-primary-hover transition-colors"
        >
          ← Back to Products
        </Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
        <Link
          to="/"
          className="text-primary hover:text-primary-hover transition-colors"
        >
          ← Back to Products
        </Link>
      </div>
    )
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.title}
            </h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price, product.discountPercentage)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h2>
            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Details</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="font-medium">Brand:</span>
                {product.brand}
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Stock:</span>
                {product.stock} units available
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Rating:</span>
                {product.rating} / 5
              </li>
            </ul>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product 