import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <div className="text-lg font-medium text-primary">
                        {formatPrice(item.price, item.discountPercentage)}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          -
                        </button>
                        <span className="w-8 text-center text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <button
                onClick={clearCart}
                className="w-full px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                Clear Cart
              </button>
              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="text-primary hover:text-primary-hover transition-colors">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
