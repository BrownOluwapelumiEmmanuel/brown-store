import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/api'
import { formatPrice } from '../utils/currency'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    let timeoutId

    const searchProducts = async () => {
      if (query.trim().length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const products = await getProducts()
        const filteredProducts = products
          .filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
        setResults(filteredProducts)
      } catch (error) {
        console.error('Error searching products:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    timeoutId = setTimeout(searchProducts, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
    setQuery('')
    setShowResults(false)
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowResults(true)
          }}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {product.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-medium text-primary">
                    {formatPrice(product.price, product.discountPercentage)}
                  </p>
                  {product.discountPercentage > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar 