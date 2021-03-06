import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import OrderedItem from '../OrderedItem/OrderedItem';
import Cart from '../Cart/Cart';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
    const [cart, setCart] = useState([]);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/checkout');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://immense-mountain-66845.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);

    return (
        <div className="container">
            <h1 style={{ color: 'rgb(54,57,88)' }} className="col-md-12 mb-5">Checkout</h1>
            <div className="col-md-12 d-flex justify-content-between border-bottom">
                <div className="col-md-3"><p><b>Description</b></p></div>
                <div className="col-md-3"><p><b>Quantity</b></p></div>
                <div className="col-md-3"><p><b>Price</b></p></div>
                <div className="col-md-3"><FontAwesomeIcon icon={faTrash} /></div>
            </div>
            {
                cart.map(pd => <OrderedItem
                    key={pd.key}
                    removeProduct={removeProduct}
                    product={pd}></OrderedItem>)
            }
            <div className="text-right col-md-12">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="btn btn-success mt-5  ">Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Order;
