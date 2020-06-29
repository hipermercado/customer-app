import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Divider, Typography, Button, Grid, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ServiceWorkerWrapper from '../ServiceWorker/ServiceWorkerWrapper';
import OrderSummaryItem from './OrderSummaryItem';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';

const useStyles = makeStyles((theme) => ({
    bottomSheet: {
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
    },
    paper: {
        padding: theme.spacing(1),
        borderRadius: '0',
        marginTop: '2px',
    },
    orderButton: {
        width: '100%',
        borderRadius: '0',
        height: '40px'
    },
    caption: {
        fontWeight:  '450',
        lineHeight: 'initial',
    },
    addressField : {
        fontWeight:  '450',
        display: 'inherit',
        fontSize: '0.8125rem',
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
    toolBarNoDA: {
        height: '177px',
    },
    toolBar: {
        height: '230px',
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

const OrderSummary = (props) => {
    const order = props.location.state.order;
    const classes = useStyles();

    const getProducts = () => {
        return order.products.map(cartItem => <OrderSummaryItem key={cartItem.productId} cartItem={cartItem} />);
    }

    const getDisplayAddress = (address) => {
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

    const getDeliveryPartner = () => {
        return <Paper className={classes.paper} >
            <Grid container xs={12}>
                <Grid item container xs={12}>
                    <Typography variant="caption" color="textSecondary" className={classes.caption}>
                        Delivery Partner:
                    </Typography>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={7}>
                        <Typography variant="subtitle2" color="textPrimary" noWrap={true} >
                            {order.deliveryPartner.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} style={{display: 'flex',textAlign: 'end'}}>
                            <PhoneOutlinedIcon color="primary" style={{fontSize: '1.2rem', marginLeft: 'auto'}}/>
                            <Typography variant="subtitle2" color="textPrimary"> 
                                &nbsp;{order.deliveryPartner.contact}
                            </Typography>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    }

    const getAddressBar = () => {
        return <Paper className={classes.paper} >
            <Grid container direction="row">
                <Grid item xs={12}>
                    <Grid item style={{lineHeight: '1.25'}}>
                        <Typography variant="caption" color="textSecondary" className={classes.caption}>
                            Deliver to:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" noWrap={true} 
                            className={classes.addressField}>
                            {getDisplayAddress(order.address)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
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
                            &#8377;{Number(order.totalPrice) - Number(order.deliveryFee) <= 0 ? 0 : Number(order.deliveryFee)}
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
                            {Number(order.totalPrice) <= 0 ? 'FREE' : <React.Fragment>&#8377;{order.deliveryFee}</React.Fragment>}
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
                            &#8377;{order.totalPrice}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    }

    const getBottomSheet = () => {
        return (
            <React.Fragment>
                <Toolbar className={order.deliveryPartner ? classes.toolBar : classes.toolBarNoDA}/>
                <Grid container alignItems="stretch" className={classes.bottomSheet}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    {order.deliveryPartner ?
                        <Grid item xs={12}>
                            {getDeliveryPartner()}
                        </Grid>  
                    : null}
                    <Grid item xs={12}>
                        {getOrderSummary()}
                    </Grid>
                    <Grid item xs={12}>
                        {getAddressBar()}
                    </Grid>  
                </Grid>
            </React.Fragment>);
    }

    return (
        <ServiceWorkerWrapper>
            <Navbar orderStatus={order.orderStatus} orderId={order.orderId} />
            <Divider />
            {getProducts()}
            {getBottomSheet()}
        </ServiceWorkerWrapper>
    );
}

export default OrderSummary;