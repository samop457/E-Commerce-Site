import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound'; // A new component for 404 error page

// Lazy loading components
const ForgotPassowrd = lazy(() => import('../pages/ForgotPassowrd'));
const SignUp = lazy(() => import('../pages/SignUp'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));
const AllUsers = lazy(() => import('../pages/AllUsers'));
const AllProducts = lazy(() => import('../pages/AllProducts'));
const CategoryProduct = lazy(() => import('../pages/CategoryProduct'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart'));
const SearchProduct = lazy(() => import('../pages/SearchProduct'));
const Success = lazy(() => import('../pages/Success')); // New success component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-passowrd',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPassowrd />
          </Suspense>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: 'success',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Success />
          </Suspense>
        ),
      },
      {
        path: 'product-category',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryProduct />
          </Suspense>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SearchProduct />
          </Suspense>
        ),
      },
      {
        path: 'admin-panel',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPanel />
          </Suspense>
        ),
        children: [
          {
            path: 'all-users',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AllUsers />
              </Suspense>
            ),
          },
          {
            path: 'all-products',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AllProducts />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />, // Catch-all route for 404 errors
      },
    ],
  },
]);

export default router;
