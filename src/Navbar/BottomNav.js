import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
// import AuthContext from '../context/auth-context';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Toolbar from '@material-ui/core/Toolbar';
import isUserLoggedIn from '../Auth/check-auth';


const useStyles = makeStyles({
    root: {
      width: '100%',
      position: 'fixed',
      bottom: 0
    },
    icon: {
        fontSize: '30px',
    },
});  

const BottomNav = (props) => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState();
    // const authContext = useContext(AuthContext);

    const getLocation = () => {
        if(location.pathname === '/' || location.pathname === '/home') {
            return 'home';
        } else if(location.pathname === '/orders') {
            return 'orders';
        } else if(location.pathname === '/account') {
            return 'account';
        }
        return 'home';
    }

    useEffect(() => {
        setValue(prevValue => {
            const newValue = getLocation();
            if (prevValue !== newValue){
                return newValue;
            }
        });
    }, [])
  
    const handleChange = (event, newValue) => {
        history.push('/' + newValue);
    };

    const getDisplay = () => {
        // if (authContext.authenticated) {
        if (isUserLoggedIn()) {
            return (
                <React.Fragment>
                    <Toolbar />
                    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <BottomNavigationAction label="Home" value="home" icon={<HomeIcon className={classes.icon}/>} />
                    <BottomNavigationAction label="Orders" value="orders" icon={<LocalMallIcon className={classes.icon}/>} />
                    <BottomNavigationAction label="Account" value="account" icon={<PersonIcon className={classes.icon}/>} />
                    </BottomNavigation>
                </React.Fragment>
            );
        } else {
            return <Redirect to='/' />
        }
        //return null;
    }
    
    return getDisplay();
}

export default BottomNav;