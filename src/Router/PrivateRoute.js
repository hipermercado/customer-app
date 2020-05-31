import React, { useContext } from "react";
import { BrowserRouter as Router ,Route, Redirect } from 'react-router-dom'; 
// import AuthContext from '../context/auth-context'
import isUserLoggedIn from '../Auth/check-auth';
import Navbar from "../Navbar/Navbar";
import BottomNav from '../Navbar/BottomNav';


const PrivateRoute = ({ component: Component, ...rest }) => {    
    const noNavBarPath = ['/', '/address', '/home']
    return (
        <Route {...rest} render={(props) => {
            return isUserLoggedIn()
            ? (
                <React.Fragment>
                    <Component {...props} />
                    {!noNavBarPath.includes(props.history.location.pathname) ? <BottomNav /> : null}
                </React.Fragment>
            )
            : <Redirect to='/login' />
        }} />
    );
};

export default PrivateRoute;