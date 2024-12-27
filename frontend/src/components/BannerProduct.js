import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/img1.png';
import image2 from '../assest/banner/img2.png';
import image3 from '../assest/banner/img3.png';

import image1Mobile from '../assest/banner/img1_mobile.png';
import image2Mobile from '../assest/banner/img2_mobile.png';
import image3Mobile from '../assest/banner/img3_mobile.png';

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [image1, image2, image3];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile];

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        } else {
            setCurrentImage(0);
        }
    };

    const prevImage = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1);
        } else {
            setCurrentImage(desktopImages.length - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="container mx-auto px-4 rounded">
            <div className="h-56 md:h-72 w-full bg-slate-200 relative overflow-hidden rounded-lg">
                {/* Navigation Buttons */}
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button onClick={prevImage} className="bg-white shadow-md rounded-full p-2 hover:scale-105 transition-transform">
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className="bg-white shadow-md rounded-full p-2 hover:scale-105 transition-transform">
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/* Desktop Version */}
                <div className="hidden md:flex h-full w-full transition-transform">
                    {desktopImages.map((imageURL, index) => (
                        <div
                            key={imageURL}
                            className="w-full h-full min-w-full flex-shrink-0 transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* Mobile Version */}
                <div className="flex md:hidden h-full w-full transition-transform">
                    {mobileImages.map((imageURL, index) => (
                        <div
                            key={imageURL}
                            className="w-full h-full min-w-full flex-shrink-0 transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
