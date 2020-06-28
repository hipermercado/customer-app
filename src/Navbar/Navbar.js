import React, {useState, useContext, useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AddressInfo from './AddressInfo'
import isUserLoggedIn from '../Auth/check-auth';
import { Redirect, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchBar from '../Product/SearchBar';
import { getTotalCartCount } from '../API/Cache/cart-cache';
import { Hub } from 'aws-amplify';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { green, red } from '@material-ui/core/colors';

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
    button: {
        marginLeft: 'auto',
    },
    back: {
        marginLeft: -theme.spacing(2),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5)
    },
    categoryName: {
        paddingLeft: theme.spacing(0.5),
    },
    placedStatusIcon : {
        fontSize: '1.25rem',
        color: theme.palette.secondary.main
    },
    confirmStatusIcon : {
        fontSize: '1.25rem',
        color: theme.palette.primary.main
    },
    packedStatusIcon : {
        fontSize: '1.25rem',
        color: theme.palette.secondary.main
    },
    shipStatusIcon : {
        fontSize: '1.25rem',
        color: theme.palette.primary.main
    },
    deliveredtatusIcon : {
        fontSize: '1.25rem',
        color: green[500]
    },
    canceledStatusIcon : {
        fontSize: '1.25rem',
        color: red[500]
    },
    orderDate : {
        fontSize: '1.1rem',
        width: '100%',
        fontWeight: 450
    },
}));

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

const Navbar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        console.log(history.location.pathname);
        let isMounted = true; 
        Hub.listen('CartCount', (data) => {
            if (isMounted) getCartCount()
        });
        getCartCount();
        //return Hub.remove('CartCount', (data) => console.log(data));
        return () => { isMounted = false };
    }, []);

    const getCartCount = () => {
        getTotalCartCount().then(count => setCartCount(count)).catch(err => console.log(err));
    }

    const getLabelDisplay = () => {
        if (history.location.pathname === '/home' || history.location.pathname === '/') {
            return <AddressInfo />
        } else if (history.location.pathname === '/product') {
            return <React.Fragment>
                {getBackArrow()}
                {getLabel(props.categoryName)}
            </React.Fragment>
        } else if (history.location.pathname === '/cart') {
            return <React.Fragment>
                {getBackArrow()}
                {getLabel("Checkout")}
            </React.Fragment>
        } else if (history.location.pathname === '/orders') {
            return getLabel("Your Orders");
        } else if (history.location.pathname === '/account') {
            return getLabel("Your Account");
        } else if (history.location.pathname === '/order') {
            return <React.Fragment>
                {getBackArrow()}
                {getDate(props.orderId)}
            </React.Fragment>
        }
    }

    const getBackArrow = () => {
        return <IconButton color="default" 
                className={classes.back}
                onClick = {() => history.goBack()}>
                <ArrowBackIcon className={classes.icon}/>
        </IconButton>
    }

    const getLabel = (label) => {
        return <Typography noWrap={true} variant="h6" style={{width:'100%', fontWeight: '450'}} 
                className={classes.categoryName}>
            {label}
        </Typography>
    }

    const getCartIcon = () => {
        if (history.location.pathname !== '/cart') {
            if (cartCount === 0) {
                return <IconButton color="default" className={classes.button} onClick={() => history.push('/cart')} >
                    <ShoppingCartOutlinedIcon className={classes.icon}/>
                </IconButton>
            } else {
                return <IconButton color="primary" className={classes.button} onClick={() => history.push('/cart')} >
                    <Badge color="secondary" badgeContent={cartCount}>
                        <ShoppingCartOutlinedIcon className={classes.icon}/>
                    </Badge>
                </IconButton>
            }
        }
    }

    const getDate = (orderId) => {
        const epoch = Number(orderId);
        const dispalyDate = new Date(epoch).toLocaleString('default', 
            {  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle:'h12' });
        return <Typography variant="body2" color="textPrimary" className={classes.orderDate}>
                {dispalyDate}
            </Typography>;
    }

    const getStatusAvatar = (orderStatus) => {
        if (orderStatus === 'PLACED') {
            return <FiberManualRecordOutlinedIcon className={classes.placedStatusIcon} />;
        } else if (orderStatus === 'CONFIRMED') {
            return <FiberManualRecordIcon className={classes.confirmStatusIcon} />;
        } else if (orderStatus === 'PACKED') {
            return <LocalShippingIcon className={classes.packedStatusIcon} />;
        } else if (orderStatus === 'SHIPPED') {
            return <LocalShippingIcon className={classes.shipStatusIcon} />;
        } else if (orderStatus === 'CANCELLED') {
            return <CancelRoundedIcon className={classes.canceledStatusIcon} />;
        } else if (orderStatus === 'DELIVERED') {
            return <CheckCircleRoundedIcon className={classes.deliveredtatusIcon} />;
        } 
    }

    const getOrderStatus = (orderStatus) => {
        return <div style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
            {getStatusAvatar(orderStatus)}
            <Typography variant="body2" color="textPrimary" style={{ fontWeight: '450' }}>
                &nbsp;{orderStatus}
            </Typography>
        </div>;
    }

    const rightSideDisplay = () => {
        if (history.location.pathname === '/order') {
            return getOrderStatus(props.orderStatus);
        } else {
            return getCartIcon();
        }
    }

    const getSearchbar = () => {
        if (props.showSearch) {
            return (
                <SearchBar id={'search'} filterHandler={props.filterHandler} searchText={props.searchText} /> 
            )
        }
    }

    const getDispay = () => {
        if (isUserLoggedIn()) {
            return (
                <div className={classes.root}>
                        <CssBaseline />
                        <ElevationScroll {...props}>
                            <AppBar position="fixed" color='inherit'>
                                <Toolbar className={classes.toolbar}>
                                    {getLabelDisplay()}
                                    {rightSideDisplay()}
                                </Toolbar>
                                {getSearchbar()}
                            </AppBar>
                        </ElevationScroll>
                        <Toolbar />
                        {props.showSearch ? <Toolbar style={{minHeight: '52px'}}/> : null }
                </div>
            );
        } else {
            return <Redirect to='/' />;
        }
    }

    return getDispay();
}

export default Navbar;