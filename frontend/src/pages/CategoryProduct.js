import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';
import { motion } from 'framer-motion';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);

    const [sortBy, setSortBy] = useState("");

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        });
        setLoading(false);
        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName]);
        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map((el, index) => {
            return `category=${el}` + (index < arrayOfCategory.length - 1 ? "&&" : "");
        });

        navigate("/product-category?" + urlFormat.join(""));
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);

        setData((prev) =>
            value === 'asc'
                ? [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice)
                : [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice)
        );
    };

    return (
        <div className='container mx-auto p-4'>
            {/*** Desktop Version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr] gap-4'>
                {/*** Left Side */}
                <motion.div
                    className='bg-white p-4 min-h-[calc(100vh-120px)] overflow-y-auto rounded shadow-md'
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/** Sort By */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={'asc'} />
                                <label>Price - Low to High</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={'dsc'} />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/** Filter By */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {productCategory.map((categoryName, index) => (
                                <div className='flex items-center gap-3' key={index}>
                                    <input
                                        type='checkbox'
                                        name={'category'}
                                        checked={selectCategory[categoryName?.value]}
                                        value={categoryName?.value}
                                        id={categoryName?.value}
                                        onChange={handleSelectCategory}
                                    />
                                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </motion.div>

                {/*** Right Side (Products) */}
                <motion.div
                    className='px-4'
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-auto max-h-[calc(100vh-120px)]'>
                        {data.length !== 0 && !loading ? (
                            <VerticalCard data={data} loading={loading} />
                        ) : (
                            <p className='text-slate-500 text-center'>No products found.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryProduct;