import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart, getCartCountForProduct } from '../API/Cache/cart-cache';
import { Hub } from '@aws-amplify/core';

const useStyles = makeStyles((theme) => ({
    decrementButton: {
        padding: '0px 4px',
        fontSize: '1rem',
        fontWeight: '600',
        border: '1px solid #3f51b5'
    },
    incrementButton: {
        padding: '0px 4px',
        fontSize: '1rem',
        fontWeight: '600',
        border: '1px solid #3f51b5'
    },
    quantityDisplay: {
        fontWeight: '600',
        color: 'black',
        "&$buttonDisabled": {
            fontWeight: '600',
            border: '1px solid #3f51b5',
            color: 'black',
        }
    },
    buttonDisabled: {},
    addButton: {
        fontWeight: '600'
    }
}));

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}


const AddToCart = (props) => {
    const product = props.product;
    const [count, setCount] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        getCartCountForProduct(product.productId).then(cartCount => {
            setCount(cartCount);
        }).catch(err => console.log(err));
    }, []);

    useDidMountEffect(() => {
        console.log('change in cart');
        Hub.dispatch(
            'CartCount', 
            { 
                event: 'addToCart', 
                data: count, 
                message:'change in count' 
            });
    }, [count]);

    const handleIncrement = (e) => {
        setCount(prevCount => {
            addToCart(product.productId, product.categoryId, prevCount +  1);
            return prevCount +  1;
        });
        
    };
    
    const handleDecrement = (e) => {
        setCount(prevCount => {
            addToCart(product.productId, product.categoryId, prevCount -  1);
            return prevCount -  1;
        });
    };

    const getButtons = () => {
        if(count === 0) {
            return <Button variant="outlined" color="primary" size="small" onClick={handleIncrement} className={classes.addButton}>
                            Add
                    </Button>;
        } else {
            return <ButtonGroup size="small">
                <Button color="primary" onClick={handleDecrement} className={classes.decrementButton}>-</Button>
                <Button classes={{ root: classes.quantityDisplay, disabled: classes.buttonDisabled }} disabled>{count}</Button>
                <Button color="primary" onClick={handleIncrement} className={classes.incrementButton}>+</Button>
            </ButtonGroup>;
        }
    }

    return getButtons();
}

export default AddToCart;