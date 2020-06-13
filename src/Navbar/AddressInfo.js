import React, {useContext, useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { getAddressForCurrentUser } from '../API/Cache/address-cache';
import { Redirect, useHistory } from 'react-router-dom';
import { getAllCategories } from '../API/Cache/category-cache';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'contents',
    },
    iconButton: {
        padding: '4px',
    },
    icon: {
        fontSize: '30px',
    },
    caption: {
        fontSize: '0.65rem',
        lineHeight: 'initial',
    },
    accountButton: {
        marginLeft: 'auto',
    },
    addressField : {
        maxWidth: '160px',
    },
}));

const AddressInfo = () => {
    const classes = useStyles();
    const history = useHistory();
    const [address, setAddress] = useState('');

    useEffect(() => {
        getAddressForCurrentUser().then((address) => {
            let addressDisplay = address.addressField1;
            if (address.addressField2) {
                addressDisplay = addressDisplay + ", " + address.addressField2;
            }
            if (address.city) {
                addressDisplay = addressDisplay + ", " + address.city;
            }
            addressDisplay = addressDisplay + ", " + address.pincode;
            setAddress(addressDisplay);
        }).catch((err) => console.log(err));

        // pre-emptively fetch categories for time address or change address in background
        getAllCategories();
    }, []);

    return (
        
        <Grid container spacing={0} className={classes.root}  onClick = {() => history.push('/address')} >
            <Grid item>
                <IconButton edge="start" color="primary" className={classes.iconButton}>
                    <LocationOnOutlinedIcon className={classes.icon}/>
                </IconButton>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column">
                    <Typography variant="caption" color="textSecondary" className={classes.caption}>
                        Your are here
                    </Typography>
                    <Typography variant="caption" noWrap={true} 
                        className={classes.addressField}>
                        {address}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AddressInfo;