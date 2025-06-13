import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import './index.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--background-color)',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
