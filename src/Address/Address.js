import React, { useState, useEffect } from 'react';
import { getAddressForCurrentUser, addAddressForCurrentUser, updateAddressForCurrentUser } from '../API/Cache/address-cache';
import { useHistory } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import serviceablePincodes from './serviceable-pincodes';
import ErrorAlert from '../Alert/ErrorAlert'
import { Toolbar, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    buttonContainer: {
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
        marginBottom: theme.spacing(1),
        width: '100%',
        textAlign: 'center',
    },
    textInput: {
        marginTop: theme.spacing(1),
    },
    button: {
        width: '90%'
    },
    h6: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    }
}));

const Address = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [address, setAddress] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [prevAddress, setPrevAddress] = useState('');
    const [showUnserviceableAlert, setUnserviceableAlert] = useState(false);

    useEffect(() => {
        getAddressForCurrentUser().then(address => {
            console.log(address);
            if (address.name && address.addressField1 && address.addressField2 && address.pincode) {
                setDisableSubmit(false);
            }
            setPrevAddress(address);
            setAddress(address);
        }).catch(err => console.log(err));
    }, []);

    const addressChangeHandler = (event) => {
        const newAddress = {...address};
        if (event.target.name === 'name') {
            const newName = event.target.value;
            newAddress.name = newName;
            if (newName === '') {
                setDisableSubmit(true);
            } else if (newAddress.pincode && 
                newAddress.pincode.length === 6 
                && newAddress.addressField1
                && newAddress.addressField2) {
                setDisableSubmit(false);
            }
        } else if (event.target.name === 'addressField1') {
            const newAddressField1 = event.target.value;
            newAddress.addressField1 = newAddressField1;
            if (newAddressField1 === '') {
                setDisableSubmit(true);
            } else if (newAddress.name &&
                newAddress.pincode && 
                newAddress.pincode.length === 6 
                && newAddress.addressField2) {
                setDisableSubmit(false);
            }
        } else if (event.target.name === 'addressField2') {
            const newAddressField2 = event.target.value;
            newAddress.addressField2 = newAddressField2;
            if (newAddressField2 === '') {
                setDisableSubmit(true);
            } else if (newAddress.name && newAddress.pincode && newAddress.pincode.length === 6 && newAddress.addressField1) {
                setDisableSubmit(false);
            }
        } else if (event.target.name === 'pincode') {
            const newPincode = event.target.value;
            newAddress.pincode = newPincode;
            if (newPincode.length < 6) {
                setDisableSubmit(true);
            } else if (newAddress.name && newAddress.addressField1 && newAddress.addressField2 && newAddress.pincode && newAddress.pincode.length === 6) {
                setDisableSubmit(false);
            }
        } else if (event.target.name === 'city') {
            const newCity = event.target.value;
            newAddress.city = newCity;
        } else if (event.target.name === 'landmark') {
            const newLandmark = event.target.value;
            newAddress.landmark = newLandmark;
        } 
        setAddress(newAddress);
    }

    const checkServiceablePincodes = (pincode) => {
        return serviceablePincodes.includes(pincode);
    }

    const submitHandler = () => {
        if (checkServiceablePincodes(address.pincode)) {
            if (prevAddress === '' || Object.keys(prevAddress).length === 0 && prevAddress.constructor === Object) {
                address.isDefault = true;
                addAddressForCurrentUser(address).then(data => {
                    history.goBack();
                }).catch(err => console.log(err));
            } else {
                if (Object.entries(address).toString() === Object.entries(prevAddress).toString()) {
                    console.log(address);
                    console.log(prevAddress);
                    history.goBack();
                } else {
                    updateAddressForCurrentUser(address).then(data => {
                        history.goBack();
                    }).catch(err => console.log(err));
                }
            }
        } else {
            setUnserviceableAlert(true);
        }
    }

    const getInputs = () => {
        return <Container className={classes.paper}>
            <TextField
                    className={classes.textInput}
                    key="Name"
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    autoFocus={true}
                    value={address.name || ''}
                    onChange={addressChangeHandler}
                />
                <TextField
                    className={classes.textInput}
                    key="Address Field 1"
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="addressField1"
                    label="House No., Floor, Building"
                    value={address.addressField1 || ''}
                    onChange={addressChangeHandler}
                />
                <TextField
                    className={classes.textInput}
                    key="Address Field 2"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    required
                    name="addressField2"
                    label="Street Address"
                    value={address.addressField2 || ''}
                    onChange={addressChangeHandler}
                    // onChange={}
                />
                <TextField
                    className={classes.textInput}
                    key="Pincode"
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="pincode"
                    label="Pincode"
                    value={address.pincode || ''}
                    inputProps={{ inputMode: 'numeric', maxLength: 6 }}
                    onChange={addressChangeHandler}
                    // onChange={}
                />
                <TextField
                    className={classes.textInput}
                    key="City"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    name="city"
                    label="City (Optional)"
                    value={address.city || ''}
                    onChange={addressChangeHandler}
                    // onChange={}
                />
                <TextField
                    className={classes.textInput}
                    key="Landmark"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    name="landmark"
                    label="Landmark (Optional)"
                    value={address.landmark || ''}
                    onChange={addressChangeHandler}
                    // onChange={}
                />
                <Toolbar />
            </Container>
    }

    const getHeader = () => {
        return <React.Fragment>
            <Container>
                <Typography className={classes.h6} variant="h6" component="h1" align="left" color="textPrimary">
                    Set delivery location
                </Typography>
            </Container>
            <Divider variant="fullWidth" />
        </React.Fragment>
    }

    const getUnserviceableAlert = () => {
        if (showUnserviceableAlert) {
            return <ErrorAlert 
                message={'Pincode is currently not serviceable'} 
                show = {showUnserviceableAlert} 
                closeHandler = {setUnserviceableAlert} /> 
        }
    }

    const getDisplay = () => {
        return (
            <React.Fragment>
                <CssBaseline />
                {getHeader()}
                {getUnserviceableAlert()}
                {getInputs()}
                <Paper elevation={0} className={classes.buttonContainer} >
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={disableSubmit}
                        onClick={submitHandler}
                    >
                        Save Address
                    </Button>
                </Paper >
            </React.Fragment>            
        );
    }

    return getDisplay();
}

export default Address;