import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-red-600 text-white'>
      <div className='container mx-auto p-8'>
        {/* Footer Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* About Section */}
          <div>
            <h2 className='text-lg font-bold mb-4'>Kongphon Store</h2>
            <p className='text-sm'>
            Welcome to kongphon store! We offer top-quality gadgets and accessories, from headphones and smartphones to cameras and innovative tools. With fast delivery and a focus on customer satisfaction, we make shopping simple and reliable. Thank you for choosing us!
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className='text-lg font-bold mb-4'>Quick Links</h2>
            <ul className='space-y-2'>
              <li><a href='#' className='hover:text-gray-400'>Home</a></li>
              <li><a href='http://localhost:3000/cart' className='hover:text-gray-400'>Cart</a></li>
              <li><a href='#' className='hover:text-gray-400'>Shop Now</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className='text-lg font-bold mb-4'>Contact Us</h2>
            <p className='text-sm'>Email: support@kongphonstore.com</p>
            <p className='text-sm'>Phone: +000-000000</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className='mt-8 text-center border-t border-white pt-4'>
          <p className='text-sm'>&copy; 2024 Kongphon Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
