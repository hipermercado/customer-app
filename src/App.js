import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router ,Route, Link, Switch, Redirect, withRouter } from 'react-router-dom'; 
import PhoneNumber from './Auth/PhoneNumber';
import OtpScreen from './Auth/OtpScreen';
import PrivateRoute from './Router/PrivateRoute';
import Home from './Home/Home';
import AuthContext from './context/auth-context';
import Amplify, { Auth } from 'aws-amplify';
import awsAuthConfig from './Auth/Config';

Amplify.configure({
  Auth: awsAuthConfig
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(() => {
    currentUser();
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
        <AuthContext.Provider value={{authenticated: isLoggedIn}} >
        <Router>
          <div className="App">
            <Switch> 
              <PrivateRoute exact path='/' component={Home} /> 
              <PrivateRoute exact path='/home' component={Home} /> 
              <Route exact path='/login' render = 
                {(props) => <PhoneNumber {...props} />} />
              <Route exact path='/otp' render = 
                {(props) => <OtpScreen {...props} loginHandler={setIsLoggedIn} />} />
              <Route path="*" render={() => <Redirect to="/" /> } />
            </Switch> 
          </div>
        </Router>
        </AuthContext.Provider>
      );
    }
  }

  return waitForAuth();
}

export default App;
