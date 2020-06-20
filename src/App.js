import React, { lazy, useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router ,Route, Link, Switch, Redirect, withRouter } from 'react-router-dom'; 
import Amplify, { Auth } from 'aws-amplify';
import awsAuthConfig from './Auth/Config';
import awsAPIConfig from './API/Config';
import isUserLoggedIn, {saveLoginInLocalStorage, removeLoginInFromLocalStorage} from './Auth/check-auth';
import { Hub, Logger } from 'aws-amplify';
import { clearAllCache } from './API/Cache/clear-cache';
import { updateVersion } from './Version/version';
import { LinearProgress } from '@material-ui/core';
import UpdateAlert from './Alert/UpdateAlert';

Amplify.configure({
  Auth: awsAuthConfig,
  API: awsAPIConfig
});

const PrivateRoute = lazy(() => import('./Router/PrivateRoute'));
const Home = lazy(() => import('./Home/Home'));
const Cart = lazy(() => import('./Cart/Cart'));
const Orders = lazy(() => import('./Orders/Orders'));
const Product = lazy(() => import('./Product/Product'));
const Address = lazy(() => import('./Address/Address'));
const PhoneNumber = lazy(() => import('./Auth/PhoneNumber'));
const OtpScreen = lazy(() => import('./Auth/OtpScreen'));
const Account = lazy(() => import('./Account/Account'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  const logger = new Logger('My-Logger');
  const listener = (data) => {
    switch (data.payload.event) {
      case 'signIn':
        logger.error('user signed in'); //[ERROR] My-Logger - user signed in
        updateVersion();
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
        setIsLoggedIn(true);
    }).catch(err  => {
        logger.error(err);
        setIsLoggedIn(false);
    });
  }

  const waitForAuth = () => {
    if (isLoggedIn === null) {
      console.log('loader');
      return <LinearProgress style={{height: '6px'}}/>
    } else {
      return (
        // <AuthContext.Provider value={{authenticated: isLoggedIn}} >
          <Router>
            <Suspense fallback={<LinearProgress style={{height: '6px'}}/>}>
              <div className="App">
                {/* <Navbar/> */}
                <Switch> 
                  <PrivateRoute exact path='/' component={Home} /> 
                  <PrivateRoute exact path='/home' component={Home} /> 
                  <PrivateRoute exact path='/address' component={Address} /> 
                  <PrivateRoute exact path='/product' component={Product} /> 
                  <PrivateRoute exact path='/orders' component={Orders} /> 
                  <PrivateRoute exact path='/account' component={Account} /> 
                  <PrivateRoute exact path='/cart' component={Cart} /> 
                  <Route exact path='/login' render = 
                    {(props) => <PhoneNumber {...props} />} />
                  <Route exact path='/otp' render = 
                    {(props) => <OtpScreen {...props} loginHandler={setIsLoggedIn} />} />
                  <Route path="*" render={() => <Redirect to="/" /> } />
                </Switch> 
              </div>
            </Suspense>
          </Router>
        // </AuthContext.Provider>
      );
    }
  }

  return waitForAuth();
}

export default App;
