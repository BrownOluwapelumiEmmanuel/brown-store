import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import SearchBar from './SearchBar'
import SpeechRecognitionComponent from './SpeechRecognition'

const Layout = () => {
  const { getCartCount } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors">
              Brown Store
            </Link>
            
            <div className="flex-1 w-full md:w-auto">
              <SearchBar />
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative flex items-center gap-2 p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-medium">Cart</span>
                {getCartCount() > 0 && (
                  <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Brown Store. All rights reserved.
          </p>
        </div>
      </footer>

      <SpeechRecognitionComponent />
    </div>
  )
}

export default Layout 