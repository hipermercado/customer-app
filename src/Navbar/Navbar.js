import React, {useContext} from 'react'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import AuthContext from '../context/auth-context'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AddressInfo from './AddressInfo'
import isUserLoggedIn from '../Auth/check-auth';
import { Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    icon: {
        fontSize: '30px',
    },
    toolbar: {
        paddingRight: '4px',
    },
    butto: {
        marginLeft: 'auto',
    },
}));

const Navbar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    // const authContext = useContext(AuthContext);

    function ElevationScroll(props) {
        const { children, window } = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0,
            target: window ? window() : undefined,
        });
        
        return React.cloneElement(children, {
            elevation: trigger ? 4 : 0,
        });
    }

    ElevationScroll.propTypes = {
        children: PropTypes.element.isRequired,
        /**
         * Injected by the documentation to work in an iframe.
         * You won't need it on your project.
         */
        window: PropTypes.func,
    };

    const getDispay = () => {
        if (isUserLoggedIn()) {
            return (
                <div className={classes.root}>
                        <CssBaseline />
                        <ElevationScroll {...props}>
                            <AppBar position="fixed" color='inherit'>
                                <Toolbar className={classes.toolbar}>
                                    <AddressInfo />
                                    <IconButton color="action" className={classes.button}>
                                        <ShoppingCartOutlinedIcon className={classes.icon}/>
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                        </ElevationScroll>
                        <Toolbar />
                </div>
            );
        } else {
            return <Redirect to='/' />;
        }
    }

    return getDispay();
}

export default Navbar;