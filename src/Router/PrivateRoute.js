import React, { useContext } from "react";
import { BrowserRouter as Router ,Route, Redirect } from 'react-router-dom'; 
import AuthContext from '../context/auth-context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => {
            console.log(props);
            console.log(authContext.authenticated); 
            return authContext.authenticated
            ? <Component {...props} />
            : <Redirect to='/login' />
        }} />
    );
};

export default PrivateRoute;