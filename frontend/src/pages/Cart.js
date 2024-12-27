import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  // Fetch cart data
  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching cart data: ${response.statusText}`);
      }

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        console.error('Failed to fetch cart data:', responseData.message);
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    }
  };

  // Handle loading of cart data
  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  useEffect(() => {
    handleLoading();
  }, []);

  // Update quantity
  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Error in increaseQty:', error);
    }
  };

  // Decrease quantity
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      try {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          fetchData();
        }
      } catch (error) {
        console.error('Error in decreaseQty:', error);
      }
    }
  };

  // Delete product from cart
  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      }
    } catch (error) {
      console.error('Error in deleteCartProduct:', error);
    }
  };

  // Handle Stripe payment
  const handlePayment = async () => {
    try {
      const isValid = data.every(
        (item) =>
          typeof item.productId?.productName === 'string' &&
          typeof item.productId?.sellingPrice === 'number' &&
          item.productId.sellingPrice > 0 &&
          typeof item.quantity === 'number' &&
          item.quantity > 0
      );
  
      if (!isValid) {
        console.error('Invalid cart items:', data);
        return;
      }
  
      // Load Stripe
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  
      // Fetch payment session from backend
      const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: data.map((item) => ({
            name: item.productId.productName,
            price: item.productId.sellingPrice,
            quantity: item.quantity,
          })),
        }),
      });
  
      const responseData = await response.json();
  
      // Check if sessionId is returned and redirect to Stripe checkout
      if (responseData?.sessionId) {
        await stripe.redirectToCheckout({ sessionId: responseData.sessionId });
      } else {
        console.error('Payment failed, missing session ID:', responseData);
        alert('Payment session creation failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error in handlePayment:', error);
      alert('An error occurred while processing the payment. Please try again later.');
    }
  };    

  // Calculate total quantity and price
  const totalQty = data.reduce((prev, curr) => prev + (curr.quantity || 0), 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + (curr.quantity || 0) * (curr.productId?.sellingPrice || 0),
    0
  );

  return (
    <motion.div
      className="container mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <motion.p
            className="bg-white py-5"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No Data
          </motion.p>
        )}
      </div>

      <motion.div
        className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* View Product */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingCart.map((_, index) => (
              <motion.div
                key={`AddToCartLoading-${index}`}
                className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
              ></motion.div>
            ))
          ) : (
            data.map((product) => (
              <motion.div
                key={product?._id}
                className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <div className="w-32 h-32 bg-slate-200">
                  <img
                    src={product?.productId?.productImage[0]}
                    className="w-full h-full object-scale-down mix-blend-multiply"
                    alt="Product"
                  />
                </div>
                <div className="px-4 py-2 relative">
                  <motion.div
                    className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete />
                  </motion.div>

                  <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                    {product?.productId?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product?.productId.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-red-600 font-medium text-lg">
                      {displayINRCurrency(product?.productId?.sellingPrice)}
                    </p>
                    <p className="text-slate-600 font-semibold text-lg">
                      {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                      onClick={() => decreaseQty(product?._id, product?.quantity)}
                    >
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                      onClick={() => increaseQty(product?._id, product?.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Summary */}
        <motion.div
          className="mt-5 lg:mt-0 w-full max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <motion.button
                className="bg-blue-600 p-2 text-white w-full mt-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePayment}
              >
                Payment
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
