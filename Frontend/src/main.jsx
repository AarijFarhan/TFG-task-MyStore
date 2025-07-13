import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import ProductPage from './pages/productPage';
import Dashboard from './pages/dashboard';
import './index.css'

// Define routes correctly
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProductPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
