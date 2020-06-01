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
import { Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchBar from '../Product/SearchBar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';



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
    }
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

    const displayCategoryName = () => {
        return <React.Fragment>
            <IconButton color="default" 
                className={classes.back}
                onClick = {() => history.goBack()}>
                <ArrowBackIcon className={classes.icon}/>
            </IconButton>
            <Typography noWrap={true} variant="h6" style={{width:'100%'}} 
                className={classes.categoryName}>
                {props.categoryName}
            </Typography>
        </React.Fragment>
    }

    const getDispay = () => {
        if (isUserLoggedIn()) {
            return (
                <div className={classes.root}>
                        <CssBaseline />
                        <ElevationScroll {...props}>
                            <AppBar position="fixed" color='inherit'>
                                <Toolbar className={classes.toolbar}>
                                    {props.categoryName ? displayCategoryName() : null}       
                                    {props.showAddress ? <AddressInfo /> : null }
                                    <IconButton color="default" className={classes.button}>
                                        <ShoppingCartOutlinedIcon className={classes.icon}/>
                                    </IconButton>
                                </Toolbar>
                                {props.showSearch ? 
                                        <SearchBar filterHandler={props.filterHandler} searchText={props.searchText}/> 
                                : null}
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