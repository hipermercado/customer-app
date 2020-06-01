import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router ,Route, Link, Switch, Redirect, withRouter } from 'react-router-dom'; 
import PhoneNumber from './Auth/PhoneNumber';
import OtpScreen from './Auth/OtpScreen';
import PrivateRoute from './Router/PrivateRoute';
import Home from './Home/Home';
import Amplify, { Auth } from 'aws-amplify';
import awsAuthConfig from './Auth/Config';
import awsAPIConfig from './API/Config';
import isUserLoggedIn, {saveLoginInLocalStorage, removeLoginInFromLocalStorage} from './Auth/check-auth';
import { Hub, Logger } from 'aws-amplify';
import { clearAllCache } from './API/Cache/clear-cache';
import addressApi from './API/Address/AddressAPI';
import Address from './Address/Address';
import Product from './Product/Product';
import Orders from './Orders/Orders';
import Account from './Account/Account';

Amplify.configure({
  Auth: awsAuthConfig,
  API: awsAPIConfig
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  const logger = new Logger('My-Logger');
  const listener = (data) => {
    switch (data.payload.event) {
      case 'signIn':
        logger.error('user signed in'); //[ERROR] My-Logger - user signed in
        saveLoginInLocalStorage();
        setIsLoggedIn(true);
        break;
      case 'signUp':
        logger.error('user signed up');
        break;
      case 'signOut':
        logger.error('user signed out');
        removeLoginInFromLocalStorage();
        clearAllCache();
        setIsLoggedIn(false);
        break;
      case 'signIn_failure':
        setIsLoggedIn(false);
        removeLoginInFromLocalStorage();
        logger.error('user sign in failed');
        break;
      case 'configured':
          logger.error('the Auth module is configured');
    }
  }

  useEffect(() => {
    Hub.listen('auth', listener);
    if (isUserLoggedIn()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [])

  const currentUser = () => {
    Auth.currentAuthenticatedUser().then(cognitoUser => {
        console.log(cognitoUser);
        setIsLoggedIn(true);
    }).catch(err  => {
        console.log(err);
        setIsLoggedIn(false);
    });
  }

  const waitForAuth = () => {
    if (isLoggedIn === null) {
      return <div>Loading!</div>
    } else {
      return (
        // <AuthContext.Provider value={{authenticated: isLoggedIn}} >
          <Router>
            <div className="App">
              {/* <Navbar/> */}
              <Switch> 
                <PrivateRoute exact path='/' component={Home} /> 
                <PrivateRoute exact path='/home' component={Home} /> 
                <PrivateRoute exact path='/address' component={Address} /> 
                <PrivateRoute exact path='/product' component={Product} /> 
                <PrivateRoute exact path='/orders' component={Orders} /> 
                <PrivateRoute exact path='/account' component={Account} /> 
                <Route exact path='/login' render = 
                  {(props) => <PhoneNumber {...props} />} />
                <Route exact path='/otp' render = 
                  {(props) => <OtpScreen {...props} loginHandler={setIsLoggedIn} />} />
                <Route path="*" render={() => <Redirect to="/" /> } />
              </Switch> 
            </div>
          </Router>
        // </AuthContext.Provider>
      );
    }
  }

  return waitForAuth();
}

export default App;
