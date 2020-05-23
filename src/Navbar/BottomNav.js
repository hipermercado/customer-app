import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AuthContext from '../context/auth-context';
import { useLocation, useHistory } from 'react-router-dom';
import LocalMallIcon from '@material-ui/icons/LocalMall';

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

const BottomNav = () => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState();
    const authContext = useContext(AuthContext);

    const getLocation = () => {
        if(location.pathname === '/' || location.pathname === '/home') {
            return 'home'
        }
        return 'home';
    }

    useEffect(() => {
        setValue(getLocation());
    }, [])
  
    const handleChange = (event, newValue) => {
        if (newValue === 'home') {
            history.push('/home')
        }
        setValue(newValue);
    };

    const getDisplay = () => {
        if (authContext.authenticated) {
            return (
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                  <BottomNavigationAction label="Home" value="home" icon={<HomeIcon className={classes.icon}/>} />
                  <BottomNavigationAction label="Orders" value="orders" icon={<LocalMallIcon className={classes.icon}/>} />
                  <BottomNavigationAction label="Account" value="account" icon={<PersonIcon className={classes.icon}/>} />
                </BottomNavigation>
            );
        }
        return null;
    }
    
    return getDisplay();
}

export default BottomNav;