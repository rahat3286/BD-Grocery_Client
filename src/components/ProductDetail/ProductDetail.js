import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('https://immense-mountain-66845.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [productKey])

    return (
        <div className="container justify-content-center">
            <h1 className=" text-center mb-5">Your Product Details.</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;