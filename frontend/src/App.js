import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import SummaryApi from './common';
import Context from './context';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // Fetch user details from API
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  // Fetch the number of products in the cart
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details
    fetchUserAddToCart(); // Fetch cart product count
  }, []);

  return (
    <div className="animated-background">
      <Context.Provider
        value={{
          fetchUserDetails, // User detail fetch
          cartProductCount, // Current user add-to-cart product count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <motion.div
          initial={{ opacity: 0 }} // Start from invisible
          animate={{ opacity: 1 }} // Fade in
          transition={{ duration: 1 }} // 1 second transition time
        >
          <Header />
          <main className="min-h-[calc(100vh-120px)] pt-16">
            <Outlet />
          </main>
        </motion.div>
        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
