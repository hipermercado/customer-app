import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, IconButton, Divider } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { green, red } from '@material-ui/core/colors';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '8px 8px',
        marginBottom: theme.spacing(0.5),
    },
    body2text: {
        fontWeight: '500',
        fontSize: '0.825rem'
    },
    placedStatusIcon : {
        fontSize: '1.25rem',
        color: theme.palette.secondary.main
    },
    confirmStatusIcon : {
        fontSize: '1.25rem',
        color: theme.palette.primary.main
    },
    packedStatusIcon : {
        fontSize: '1.25rem',
        color: theme.palette.secondary.main
    },
    shipStatusIcon : {
        fontSize: '1.25rem',
        color: theme.palette.primary.main
    },
    deliveredtatusIcon : {
        fontSize: '1.25rem',
        color: green[500]
    },
    canceledStatusIcon : {
        fontSize: '1.25rem',
        color: red[500]
    },
}));

const OrdersItem = (props) => {
    const order = props.order;
    const classes = useStyles();

    const getDate = () => {
        const epoch = Number(order.orderId);
        const dispalyDate = new Date(epoch).toLocaleString('default', 
            {  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle:'h12' });
        return <div style={{ alignItems: 'center' }}>
            <Typography variant="body2" color="textPrimary" className={classes.body2text}>
                {dispalyDate}
            </Typography>
        </div>
    }

    const getStatusAvatar = () => {
        if (order.orderStatus === 'PLACED') {
            return <FiberManualRecordOutlinedIcon className={classes.placedStatusIcon} />;
        } else if (order.orderStatus === 'CONFIRMED') {
            return <FiberManualRecordIcon className={classes.confirmStatusIcon} />;
        } else if (order.orderStatus === 'PACKED') {
            return <LocalShippingIcon className={classes.packedStatusIcon} />;
        } else if (order.orderStatus === 'SHIPPED') {
            return <LocalShippingIcon className={classes.shipStatusIcon} />;
        } else if (order.orderStatus === 'CANCELLED') {
            return <CancelRoundedIcon className={classes.canceledStatusIcon} />;
        } else if (order.orderStatus === 'DELIVERED') {
            return <CheckCircleRoundedIcon className={classes.deliveredtatusIcon} />;
        } 
    }
    
    // PLACED, CONFIRMED, PACKED, SHIPPED, DELIVERED, CANCELLED
    const getOrderStatus = () => {
        return <div style={{ display: 'flex', alignItems: 'center' }}>
            {getStatusAvatar()}
            <Typography variant="body2" color="textPrimary">
                &nbsp;{order.orderStatus}
            </Typography>
        </div>
    }

    const getTotalPrice = () => {
        return <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2" color="textPrimary">
                    Total &nbsp;
            </Typography>
            <Typography variant="subtitle2" color="secondary">
                    &#8377;{order.totalPrice}
            </Typography>
        </div>
    }

    const getItems = () => {
        let productString = "";
        if (order.products.length > 0) {
            const firstProductName = order.products[0].productName;
            const remainingQty = order.totalQuantity - order.products[0].quantity;
            productString = productString + order.products[0].quantity + " " + 
                firstProductName;
                if(remainingQty > 0) {
                    productString = productString + " & " + remainingQty;
                    if (remainingQty == 1) {
                        productString = productString + " more item"
                    } else {
                        productString = productString + " more items"
                    }
                }
                
        }
        
        console.log(productString);
        return <div style={{ alignItems: 'center' }}>
            <Typography variant="body2" color="textPrimary" className={classes.body2text}>
                    {productString}
            </Typography>
        </div>
    }

    const getDisplay = () => {
        return <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1} >
                    <Grid item xs={11} container spacing={1}>
                        <Grid item xs={12} container spacing={1}>
                            <Grid item xs >
                                {getDate()}
                            </Grid>
                            <Grid item xs={7} >
                                {getItems()} 
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={1}>
                            <Grid item xs>
                                {getOrderStatus()}
                            </Grid>
                            <Grid item xs={7} style={{textAlign: 'center'}}>
                                {getTotalPrice()}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} container spacing={1}>
                        <IconButton edge="start" aria-label="navigate">
                            <NavigateNextIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    };

    return getDisplay();
}

export default OrdersItem;