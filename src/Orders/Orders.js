import React, { useEffect, useState } from 'react';
import BottomNav from '../Navbar/BottomNav';
import Navbar from '../Navbar/Navbar';
import ServiceWorkerWrapper from '../ServiceWorker/ServiceWorkerWrapper';
import { getOrdersForPastWeek } from '../API/Cache/orders-cache';
import OrdersItem from '../Orders/OrdersItem';
import { Typography, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    orderSubnavHeadingBground : {
        backgroundColor: grey[200]
    },
    orderSubnavHeadingText : {
        color: theme.palette.text.secondary,
        fontWeight: 'bold'
    },
}));

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getOrdersForPastWeek().then(orders => {
            setOrders(orders);
            console.log(orders);
        }).catch(err => console.log(err));
    }, []);

    const goToOrderSummary = (order) => {
        history.push({
            pathname: '/order',
            search: '?orderId=' + order.orderId,
            state: { order: order }
        })
    };

    const getOrders = () => {
        return orders.map(order => {
            return <OrdersItem key={order.orderId} order={order} clickHandler={() => goToOrderSummary(order)} />
        })
    }

    const getSubNav = () => {
        return <Container className={classes.orderSubnavHeadingBground} >
            <Typography variant="body1" className={classes.orderSubnavHeadingText} >
                Last 7 Days
            </Typography>
        </Container>
    }

    return <ServiceWorkerWrapper>
        <Navbar />
        {getSubNav()}
        {getOrders()}
        <BottomNav />
    </ServiceWorkerWrapper>
    
};

export default Orders;