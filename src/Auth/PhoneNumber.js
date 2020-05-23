import React, {useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router ,Route, Link, Switch, Redirect, withRouter, useHistory } from 'react-router-dom'; 
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Amplify, { Auth } from 'aws-amplify';
import AuthContext from '../context/auth-context';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const PhoneNumber = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [phone, setPhone] = useState('');
    const [enableContinue, setEnableContinue] = useState(false);
    const authContext = useContext(AuthContext);

    const handlePhoneInput = (event) => {
        if (event.target.value.length < 10) {
            setEnableContinue(false);
            setPhone(event.target.value);
        } else if (event.target.value.length === 10) {
            setPhone(event.target.value);
            setEnableContinue(true);
        }
    }

    const signup = async () => {
        try {
            await Auth.signUp({ username: "+91" + phone, password: Date.now().toString() });
        } catch (event) {
            console.log(event);
            if (event.code === 'UsernameExistsException') {
                console.log(event.message);
            } else {
                console.log(event.message);
                throw event;
            }
        }
    }

    const continueHandler = () => {
        signup().then(() => {
            history.push({ 
                pathname: '/otp',
                state: { phone: phone}
            });
        }).catch((error) => console.log(error));
    }

    const getDisplay = () => {
        if (authContext.authenticated == true) {
            return <Redirect to='/' />
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="phone-number"
                            label="Mobile number"
                            inputProps={{ inputMode: 'numeric', maxLength: 10 }}
                            onChange={handlePhoneInput}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!enableContinue}
                            className={classes.button}
                            endIcon={<NavigateNextIcon>continue</NavigateNextIcon>}
                            onClick={continueHandler}
                        >
                            Continue
                        </Button>
                    </div>
                </Container>
            );
        }
    }

    return getDisplay();
}

export default PhoneNumber;