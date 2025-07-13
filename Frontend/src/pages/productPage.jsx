'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Image from ''
import { ShoppingCart, ExternalLink } from 'lucide-react'

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:5000/products')
        setProducts(res.data)
      } catch (err) {
        console.error("Failed to fetch products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <ProductSkeleton />

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="font-bold inline-block p-3 text-red-600 text-3xl bg-white rounded-sm mb-4">myStore Collection</span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Available Products</h1>
            <Link to="/dashboard">
              <a className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                View Dashboard
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of premium products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative bg-white h-48 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-contain p-4 transform transition-transform duration-500 hover:scale-105 hover:z-10 "
                  
                />


              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">{product.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-red-600">${product.current_price?.value?.toFixed(2)}</span>
                    {product.category && (
                      <span className="inline-block mt-1 text-xs px-2 py-1 border rounded text-gray-600">
                        {product.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Check back later for new arrivals.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Simple custom skeleton loader
const ProductSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-6 w-32 bg-gray-300 rounded mx-auto mb-4"></div>
          <div className="h-10 w-64 bg-gray-300 rounded mx-auto mb-2"></div>
          <div className="h-4 w-96 bg-gray-300 rounded mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 space-y-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-10 bg-gray-300 rounded w-full mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
