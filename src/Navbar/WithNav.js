import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const withNav = (WrappedComponent) => {
    return props => (
        <React.Fragment>
            <Navbar />
            <WrappedComponent />
            <BottomNav />
        </React.Fragment>
    );
}

export default withNav;