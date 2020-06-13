import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router ,Route, Redirect } from 'react-router-dom'; 
// import AuthContext from '../context/auth-context'
import isUserLoggedIn from '../Auth/check-auth';
import Navbar from "../Navbar/Navbar";
import BottomNav from '../Navbar/BottomNav';
import { checkVersion } from "../Version/version";
import { Auth } from "aws-amplify";


const PrivateRoute = ({ component: Component, ...rest }) => {    
    return (
        <Route {...rest} render={(props) => {
            checkVersion();
            return isUserLoggedIn()
            //return isUserLoggedIn()
            ? (
                <React.Fragment>
                    <Component {...props} />
                </React.Fragment>
            )
            : <Redirect to='/login' />
        }} />
    );
};

export default PrivateRoute;