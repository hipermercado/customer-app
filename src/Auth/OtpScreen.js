import React, {useState, useEffect, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router ,Route, Link, Switch, Redirect, withRouter, useHistory } from 'react-router-dom'; 
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import { Auth } from 'aws-amplify';
import isUserLoggedIn from './check-auth';
import Alert from '@material-ui/lab/Alert';
import { updateVersion } from '../Version/version';

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    h6: {
        fontWeight: 'bold'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    button: {
        position: 'absolute',
        bottom: 0,
        marginBottom: theme.spacing(1),
        width: '90%'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: theme.spacing(2),
    }
}));

const OtpScreen = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState();
    const [resendAttempt, setResendAttempt] = useState(0);
    const [showResendAlert, setShowResendAlert] = useState(false);
    const [verifyAttempt, setVerifyAttempt] = useState(0);
    const [showVerifylert, setShowVerifyAlert] = useState(false);
    const [disableVerify, setDisableVerify] = useState(false);
    // const authContext = useContext(AuthContext);

    useEffect(() => {
        signIn();
    }, []);

    const signIn = async () => {
        if (resendAttempt < 3) {
            try {
                const cUser = await Auth.signIn("+91" + props.location.state.phone);
                setUser(cUser);
            } catch (error) {
                console.log(error);
            }
            setResendAttempt(resendAttempt => resendAttempt + 1);
        } else {            
            setShowResendAlert(true);
            setDisableVerify(true);
        }
    }

    const verifyHandler = async () => {
        if (verifyAttempt < 3) {
            try {
                const cognitoUser = await Auth.sendCustomChallengeAnswer(user, otp);
                updateVersion();
                history.push('/home');
            } catch(error) {
                console.log(error);
            }
            setVerifyAttempt(verifyAttempt => verifyAttempt + 1);
        } else {
            setShowVerifyAlert(true);
            setDisableVerify(true);
        }
    }

    const otpHandler = (event) => {
        setOtp(event.target.value);
    }

    const getResendAlertDisplay = () => {
        return (
            <Alert severity="error" 
                className = {classes.alert}
                action={
                <Button color="inherit" size="small" onClick={() => history.replace('/login')}>
                    RE-LOGIN
                </Button>
                }
            >
                All resend attempts exhausted!
            </Alert>
        );
    }

    const getVerifyAlertDisplay = () => {
        return (
            <Alert severity="error" 
                className = {classes.alert}
                action={
                <Button color="inherit" size="small" onClick={() => history.replace('/login')}>
                    RE-LOGIN
                </Button>
                }
            >
                All verification attempts exhausted!
            </Alert>
        );
    }

    const getDisplay = () => {
        // if (authContext.authenticated === true) {
        if (isUserLoggedIn() === true) {
            return <Redirect to='/' />
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    {showResendAlert ? getResendAlertDisplay() : null}
                    {showVerifylert ? getVerifyAlertDisplay() : null}
                    <div className={classes.header}>
                        <Typography className={classes.h6} variant="h6" component="h1" align="left" color="textPrimary">
                                Verify mobile number
                        </Typography>
                        <Typography variant="subtitle2" component="h2" align="left" color="textSecondary">
                                Enter the OTP sent to {props.location.state.phone}
                        </Typography>
                    </div>
                    <Divider variant="fullWidth" />
                    <div className={classes.paper}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="otp"
                            label="Enter OTP"
                            autoFocus={true}
                            onChange={otpHandler}
                            inputProps={{ inputMode: 'numeric', maxLength: 4 }}
                        />
                        <Button 
                            color="secondary" 
                            size="small" 
                            onClick={signIn}
                            disabled={disableVerify}>
                            RESEND OTP
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={verifyHandler}
                            disabled={disableVerify}
                        >
                            Verify and Continue
                        </Button>
                    </div>
                </Container>
            );
        }
    }

    return getDisplay();
}

export default OtpScreen;