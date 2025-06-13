const API_BASE_URL = 'https://dummyjson.com'

export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
} 