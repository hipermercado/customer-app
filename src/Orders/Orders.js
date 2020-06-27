import React, { useEffect, useState } from 'react';
import BottomNav from '../Navbar/BottomNav';
import Navbar from '../Navbar/Navbar';
import ServiceWorkerWrapper from '../ServiceWorker/ServiceWorkerWrapper';
import { getOrdersForPastWeek } from '../API/Cache/orders-cache';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrdersForPastWeek().then(orders => {
            setOrders(orders);
            console.log(orders);
        }).catch(err => console.log(err));
    }, []);


    const getDisplay = () => {
        return orders.map(order => {
            return <div>
                {order.orderId} {order.orderStatus}
            </div>
        })
    }

    return <ServiceWorkerWrapper>
        <Navbar />
        {getDisplay()}
        <BottomNav />
    </ServiceWorkerWrapper>
    
};

export default Orders;