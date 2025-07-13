import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white py-12 px-6 md:px-20">
      <div className="text-center mb-12">
        <h3 className="text-red-500 font-bold text-lg">Our Collection</h3>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Available Products</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-80 rounded-xl shadow-md border border-gray-200 bg-white overflow-hidden"
          >
            <div className="p-4">
              <img
                src={`https://fakestoreapi.com/img/${product.id}.jpg`}
                alt={product.title}
                className="w-full h-40 object-contain rounded-md bg-gray-300"
              />
              <h2 className="text-green-800 text-lg md:text-xl mt-3 text-center font-semibold">
                {product.title}
              </h2>
              <p className="text-sm mt-2 text-center px-2 text-gray-600">
                <span className="text-red-600 font-semibold">
                  ${product.current_price.value.toFixed(2)}
                </span>
              </p>
              <div className="text-center">
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
