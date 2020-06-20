import React from 'react';
import BottomNav from '../Navbar/BottomNav';
import Navbar from '../Navbar/Navbar';
import ServiceWorkerWrapper from '../ServiceWorker/ServiceWorkerWrapper';

const Orders = () => {
    return <ServiceWorkerWrapper>
        <Navbar />
        <BottomNav />
    </ServiceWorkerWrapper>
    
};

export default Orders;