// Frontend: React App with Tailwind CSS
// FILE: client/src/App.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [updateValue, setUpdateValue] = useState({});

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };
  fetchProducts();
}, []);


  const handleUpdate = async (id) => {
    if (!updateValue[id]) return;
    await axios.put(`http://localhost:5000/products/${id}`, {
      current_price: {
        value: parseFloat(updateValue[id]),
      },
    });
    window.location.reload();
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">myStore Product Dashboard</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded shadow-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price (USD)</th>
              <th className="p-3 text-left">Update Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.title}</td>
                <td className="p-3">${p.current_price.value.toFixed(2)}</td>
                <td className="p-3 flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="New price"
                    className="p-1 border border-gray-300 rounded w-28"
                    onChange={(e) => setUpdateValue({
                      ...updateValue,
                      [p.id]: e.target.value,
                    })}
                  />
                  <button
                    onClick={() => handleUpdate(p.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
