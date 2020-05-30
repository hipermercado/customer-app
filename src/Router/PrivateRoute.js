import React, { useContext } from "react";
import { BrowserRouter as Router ,Route, Redirect } from 'react-router-dom'; 
// import AuthContext from '../context/auth-context'
import isUserLoggedIn from '../Auth/check-auth';
import Navbar from "../Navbar/Navbar";
import BottomNav from '../Navbar/BottomNav';


const PrivateRoute = ({ component: Component, ...rest }) => {    
    return (
        <Route {...rest} render={(props) => {
            console.log(props);
            console.log(isUserLoggedIn()); 
            return isUserLoggedIn()
            ? (
                <React.Fragment>
                    {/* {props.history.location.pathname !== '/address' ? <Navbar /> : null} */}
                    <Component {...props} />
                    {/* {props.history.location.pathname !== '/address' ? <BottomNav /> : null} */}
                </React.Fragment>
            )
            : <Redirect to='/login' />
        }} />
    );
};

export default PrivateRoute;