import React, { useState } from 'react'
import {
  FiEye,
  FiEyeOff,
  FiShoppingCart,
  FiTag,
  FiCreditCard,
  FiShoppingBag,
  FiBox,
} from 'react-icons/fi'

const shoppingIcons = [
  FiShoppingCart,
  FiTag,
  FiCreditCard,
  FiShoppingBag,
  FiBox,
]

const BackgroundPattern = () => {
  // render a grid of shopping icons with low opacity for background pattern
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 overflow-hidden">
      <div
        className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-6 p-10 opacity-10 pointer-events-none"
        style={{ transform: 'rotate(-15deg)' }}
      >
        {Array(12 * 12)
          .fill(0)
          .map((_, i) => {
            const Icon =
              shoppingIcons[i % shoppingIcons.length] || FiShoppingCart
            return (
              <Icon
                key={i}
                size={24}
                className="text-white"
                style={{
                  animation:
                    i % 2 === 0
                      ? 'floatUpDown 6s ease-in-out infinite'
                      : 'floatDownUp 6s ease-in-out infinite',
                  animationDelay: `${(i % 12) * 0.5}s`,
                }}
              />
            )
          })}
      </div>

      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatDownUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </div>
  )
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false)
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false)
  const [signupConfirmPasswordVisible, setSignupConfirmPasswordVisible] =
    useState(false)

  return (
    <>
      <BackgroundPattern />
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg max-w-md w-full p-8 z-10">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-6 py-2 font-semibold rounded-t-lg border-b-2 -mb-2 ${
                activeTab === 'login'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-blue-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`px-6 py-2 font-semibold rounded-t-lg border-b-2 -mb-2 ${
                activeTab === 'signup'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-blue-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type={loginPasswordVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() =>
                    setLoginPasswordVisible(!loginPasswordVisible)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600"
                  tabIndex={-1}
                >
                  {loginPasswordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 transition-colors"
              >
                Log In
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type={signupPasswordVisible ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSignupPasswordVisible(!signupPasswordVisible)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600"
                  tabIndex={-1}
                >
                  {signupPasswordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="relative">
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={signupConfirmPasswordVisible ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSignupConfirmPasswordVisible(!signupConfirmPasswordVisible)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600"
                  tabIndex={-1}
                >
                  {signupConfirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 transition-colors"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
