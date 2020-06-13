import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { getCart } from '../API/Cache/cart-cache';
import { getProduct } from '../API/Cache/product-cache';
import CartItem from './CartItem';
import { Divider, Typography, Button, Grid, Container, Toolbar } from '@material-ui/core';
import { Hub } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { getAddressForCurrentUser } from '../API/Cache/address-cache';
import { useHistory } from 'react-router-dom'; 
import orderApi from '../API/Order/OrderAPI';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Slide from '@material-ui/core/Slide';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { getAllCategories } from '../API/Cache/category-cache';

const useStyles = makeStyles((theme) => ({
    bottomSheet: {
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
    },
    paper: {
        padding: theme.spacing(1),
        borderRadius: '0',
        marginBottom: '2px',
    },
    orderButton: {
        width: '100%',
        borderRadius: '0',
        height: '40px'
    },
    caption: {
        //fontSize: '0.65rem',
        fontWeight:  '450',
        lineHeight: 'initial',
    },
    addressField : {
        fontWeight:  '450',
        display: 'inherit',
        fontSize: '0.8125rem',
        //maxWidth: '160px',
    },
    emptyCartAvatar :{
        backgroundColor: theme.palette.primary.main,
        margin: 'auto',
        height: '100px',
        width: '100px'
    },
    emptyCartIcon: {
        height: '70px',
        width: '70px',
    },
    emptyCart: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    emptyCartText: {
        marginTop: theme.spacing(1),
        textAlign: 'center',
    },
    continueShopping: {
        width: '100%'
    },
    goToYourOrders: {
        width: '100%'
    },
    summaryTitle: {
        fontSize: '0.8125rem',
        fontWeight: '450',
    },
    toolBarEmptyCart: {
        height: '94px',
    },
    toolBar: {
        height: '269px',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    typ: {
        margin: '0',
        position: 'absolute',
        top: '45%',
        transform: 'translateY(-50%)',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Cart = (props) => {
    const [cart, setCart] =  useState([]);
    const [address, setAddress] = useState('');
    const [itemTotal, setItemTotal] = useState(0);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const history = useHistory();
    const deliveryFee = 0;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getProducts = () => {
        if (cart.length === 0) {
            return <Container className={classes.emptyCart}>
                <Avatar className={classes.emptyCartAvatar}>
                    <ShoppingBasketIcon className={classes.emptyCartIcon}/>
                </Avatar>
                <Typography variant="h6" color="textPrimary" className={classes.emptyCartText}>
                    Your Cart is empty!
                </Typography>
                <Button className={classes.continueShopping} size="small" color="secondary" onClick={() => history.push('/')}>
                    CONTINUE SHOPPING
                </Button>
            </Container>
        }
        return cart.map(cartItem => <CartItem key={cartItem.productId} cartItem={cartItem} />);
    }

    const dialog = () => {
        return (
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Container className={classes.typ}>
                    <Avatar className={classes.emptyCartAvatar}>
                        <LocalMallIcon className={classes.emptyCartIcon}/>
                    </Avatar>
                    <Button className={classes.goToYourOrders} size="small" color="secondary" onClick={() => history.push('/orders')}>
                        GO TO YOUR ORDERS
                    </Button>
                    <Divider/>
                    <Typography variant="h6" color="textPrimary" className={classes.emptyCartText}>
                        Thank you for shopping with us!
                    </Typography>
                    {/* <Button className={classes.continueShopping} size="small" color="secondary" onClick={() => history.push('/')}>
                        CONTINUE SHOPPING
                    </Button> */}
                    <Container style={{margin: '4px', textAlign: 'center'}}>
                        <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => history.push('/')}
                            startIcon={<StorefrontIcon />}
                        >
                            CONTINUE SHOPPING
                        </Button>
                    </Container>
                    <Divider/>
                </Container>
            </Dialog>
        );
    }

    const placeOrder = () =>{
        orderApi.createOrder(cart, address, deliveryFee).then(data => {
            handleClickOpen();
        }).catch(err => console.log(err));

        // pre-emptively fetch categories after placing order
        getAllCategories();
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
            let orderItemTotal = 0;
            const futureCartWithProduct = cartData.map(async (cartItem) => {
                const productId = cartItem.productId;
                const categoryId = cartItem.categoryId;
                try {
                    const product = await getProduct(categoryId, productId);
                    const mergedCartItem = {...cartItem, ...product};
                    orderItemTotal = orderItemTotal + Number(mergedCartItem.buyingPrice) * Number(mergedCartItem.quantity);
                    console.log(orderItemTotal);
                    console.log(mergedCartItem);
                    return mergedCartItem;
                } catch(err) {
                    console.log(err);
                }
            });
            Promise.all(futureCartWithProduct).then(cartWithProduct => {
                console.log(cartWithProduct);
                setItemTotal(orderItemTotal); 
                setCart(cartWithProduct);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));

        getAddressForCurrentUser().then((address) => {
            setAddress(address);
        }).catch((err) => console.log(err));
    }

    const getDisplayAddress = () => {
        let addressDisplay = address.addressField1;
        if (address.addressField2) {
            addressDisplay = addressDisplay + ", " + address.addressField2;
        }
        if (address.city) {
            addressDisplay = addressDisplay + ", " + address.city;
        }
        addressDisplay = addressDisplay + ", " + address.pincode;
        return addressDisplay;
    }

    const getAddressBar = () => {
        return <Paper className={classes.paper} >
            <Grid container direction="row">
                <Grid item xs={9}>
                    <Grid item style={{lineHeight: '1.25'}}>
                        <Typography variant="caption" color="textSecondary" className={classes.caption}>
                            Deliver to:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" noWrap={true} 
                            className={classes.addressField}>
                            {getDisplayAddress()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={3} style={{textAlign: 'end'}}>
                    <Button size="small" color="secondary" onClick={() => history.push('/address')}>
                        CHANGE
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    }

    const getCheckoutButton = () => {
        return <Button variant="contained"
                color="primary"
                className={classes.orderButton}
                disabled={cart.length === 0}
                onClick={placeOrder}>
                Place Order
            </Button>
    }

    const getOrderSummary = () => {
        return <Paper className={classes.paper} >
            <Grid container direction="column">
                <Grid item style={{marginBottom: '6px'}}>
                    <Typography variant="caption" color="textSecondary" className={classes.summaryTitle}>
                            ORDER SUMMARY:
                    </Typography>
                </Grid>
                <Grid item container>
                    <Grid item xs={9}>
                        <Typography variant="body2" color="textPrimary" className={classes.itemsTitle}>
                            Items:
                        </Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'end'}}>
                        <Typography variant="body2" noWrap={true} 
                            className={classes.itemsTotal}>
                            &#8377;{itemTotal}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item style={{marginBottom: '4px', marginTop: '4px'}}>
                    <Divider />
                </Grid>
                <Grid item container>
                    <Grid item xs={9}>
                        <Typography variant="body2" color="textPrimary" className={classes.itemsTitle}>
                            Delivery Fee:
                        </Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'end'}}>
                        <Typography variant="body2" noWrap={true} 
                            className={classes.itemsTotal}>
                            {deliveryFee === 0 ? 'FREE' : <React.Fragment>&#8377;{deliveryFee}</React.Fragment>}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item style={{marginBottom: '4px', marginTop: '4px'}}>
                    <Divider />
                </Grid>
                <Grid item container>
                    <Grid item xs={9}>
                        <Typography variant="body2" color="textPrimary" className={classes.itemsTitle}>
                            Total:
                        </Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: 'end'}}>
                        <Typography variant="body2" noWrap={true} 
                            className={classes.itemsTotal}>
                            &#8377;{deliveryFee + itemTotal}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item style={{marginBottom: '4px', marginTop: '6px'}}>
                    <Typography variant="caption" color="textSecondary">
                            *The final order total is subject to item availability at time of delivery
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    }

    const getBottomSheet = () => {
        return (
            <React.Fragment>
                <Toolbar className={cart.length === 0 ? classes.toolBarEmptyCart : classes.toolBar}/>
                <Grid container alignItems="stretch" className={classes.bottomSheet}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    {cart.length !== 0 ?
                    <Grid item xs={12}>
                        {getOrderSummary()}
                    </Grid>
                    : null }
                    <Grid item xs={12}>
                        {getAddressBar()}
                    </Grid>
                    <Grid item xs={12}>
                        {getCheckoutButton()}
                    </Grid>  
                </Grid>
            </React.Fragment>);
    }

    return (
        <React.Fragment>
            <Navbar />
            <Divider />
            {getProducts()}
            {getBottomSheet()}
            {dialog()}
        </React.Fragment>
        
    );
}

export default Cart;