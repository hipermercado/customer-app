import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { getCart } from '../API/Cache/cart-cache';
import { getProduct } from '../API/Cache/product-cache';
import CartItem from './CartItem';
import { Divider, Typography } from '@material-ui/core';
import { Hub } from 'aws-amplify';

const Cart = (props) => {
    const [cart, setCart] =  useState([]);

    const getProducts = () => {
        if (cart.length === 0) {
            return <Typography variant="caption" color="textSecondary">
                Your Cart is empty!
            </Typography>
        }
        return cart.map(cartItem => <CartItem key={cartItem.productId} cartItem={cartItem} />);
    }

    useEffect(() => {
        let isMounted = true; 
        updateCart()
        Hub.listen('CartCount', (data) => {
            if (isMounted) updateCart()
        });
        //return Hub.remove('CartCount', (data) => console.log(data));
        return () => { isMounted = false };
       
    }, []);

    const updateCart = () => {
        getCart().then(async (cartData) => {
            const futureCartWithProduct = cartData.map(async (cartItem) => {
                const productId = cartItem.productId;
                const categoryId = cartItem.categoryId;
                try {
                    const product = await getProduct(categoryId, productId);
                    const mergedCartItem = {...cartItem, ...product};
                    console.log(mergedCartItem);
                    return mergedCartItem;
                } catch(err) {
                    console.log(err);
                }
            });
            Promise.all(futureCartWithProduct).then(cartWithProduct => {
                console.log(cartWithProduct);
                setCart(cartWithProduct);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    const AddressBar = () => {
        
    }

    const bottomSheet = () => {

    }

    return (
        <React.Fragment>
            <Navbar />
            <Divider />
            {getProducts()}
        </React.Fragment>
        
    );
}

export default Cart;