import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const toastRef = useRef(null)

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const showToast = (message) => {
    if (toastRef.current !== message) {
      toastRef.current = message
      toast.success(message)
      // Reset the ref after a short delay
      setTimeout(() => {
        toastRef.current = null
      }, 100)
    }
  }

  const addToCart = (product, quantity = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      
      if (existingItem) {
        const newCart = currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        showToast(`Updated ${product.title} quantity in cart`)
        return newCart
      }

      const newCart = [...currentCart, { ...product, quantity }]
      showToast(`Added ${product.title} to cart`)
      return newCart
    })
  }

  const removeFromCart = (productId) => {
    setCart(currentCart => {
      const item = currentCart.find(item => item.id === productId)
      if (item) {
        showToast(`Removed ${item.title} from cart`)
      }
      return currentCart.filter(item => item.id !== productId)
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return

    setCart(currentCart => {
      const item = currentCart.find(item => item.id === productId)
      if (!item) return currentCart

      const newCart = currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )

      if (item.quantity !== quantity) {
        showToast(`Updated ${item.title} quantity to ${quantity}`)
      }
      return newCart
    })
  }

  const clearCart = () => {
    setCart([])
    showToast('Cart cleared')
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.price * (1 - (item.discountPercentage || 0) / 100)
      return total + price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 