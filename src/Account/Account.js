import React, { useState, useEffect } from 'react';
import BottomNav from '../Navbar/BottomNav';
import Navbar from '../Navbar/Navbar';
import { getUserName } from '../API/Cache/cognito-user-cache';
import { Grid, Container, Typography, Divider, Paper, List, ListItem, ListItemSecondaryAction, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { getAddressForCurrentUser } from '../API/Cache/address-cache';
import { makeStyles } from '@material-ui/core/styles';
import EditLocationOutlinedIcon from '@material-ui/icons/EditLocationOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
    name: {
      fontWeight: '450',
      fontSize: '1.1rem',
    },
    phone: {
        fontSize: '0.825rem',
    },
    listIcon: {
        minWidth: '0px',
        marginRight: theme.spacing(2),
        marginLeft: -theme.spacing(2),
    },
}));

const ListElement = ({icon: Component, ...props}) => {
    const classes = useStyles();
    return <ListItem onClick={props.navigate}>
            <ListItemIcon className={classes.listIcon}>
                <Component color='primary' />
            </ListItemIcon>
            <ListItemText primary={props.label} />
            <ListItemSecondaryAction onClick={props.navigate}>
                <IconButton edge="end" aria-label="navigate">
                    <NavigateNextIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
}

const Account = () => {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();

    useEffect(() => {
        getAddressForCurrentUser().then(address => {
            if (address.name) {
                setName(address.name);
            }
        }).catch(err => console.log(err));

        getUserName().then(phone => {
            setPhone(phone);
        }).catch(err => console.log(err));
    }, []);

    const getUserInfo = () => {
        return <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item>
                <Typography variant="subtitle1" className={classes.name}>
                    {name} 
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="caption" className={classes.phone}>
                    {phone}
                </Typography>
            </Grid>
        </Grid>
    }

    const getList = () => {
        return <List>
            <ListElement icon={EditLocationOutlinedIcon} label={'Your address'} navigate={() => history.push('/address')}/>
            <ListElement icon={ShoppingBasketOutlinedIcon} label={'Your orders'} navigate={() => history.push('/orders')}/>
            <ListElement icon={ContactSupportOutlinedIcon} label={'Support'} />
            <ListElement icon={InfoOutlinedIcon} label={'About'} />
            <ListElement icon={ExitToAppOutlinedIcon} label={'Logout'} navigate={() => Auth.signOut()}/>
        </List>
    }
    const getDisplay = () => {
        return <Paper elevation={0}>
            <Container>
                {getUserInfo()}
                {getList()}
            </Container>
        </Paper>
    }

    return  <React.Fragment>
        <Navbar />
        {getDisplay()}
        <BottomNav />
    </React.Fragment>
};

export default Account;