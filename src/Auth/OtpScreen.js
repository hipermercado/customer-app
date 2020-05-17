import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router ,Route, Link, Switch, Redirect, withRouter, useHistory } from 'react-router-dom'; 
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import Amplify, { Auth } from 'aws-amplify';

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
}));

const OtpScreen = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState();

    useEffect(() => {
        signIn();
    }, []);

    const signIn = async () => {
        try {
            const cUser = await Auth.signIn("+91" + props.location.state.phone);
            setUser(cUser);
        } catch (error) {
            console.log(error);
        }
    }

    const verifyHandler = async () => {
        try {
            const cognitoUser = await Auth.sendCustomChallengeAnswer(user, otp);
            props.loginHandler(true);
            history.push('/home');
          } catch(error) {
            console.log(error)
          }
    }

    const otpHandler = (event) => {
        setOtp(event.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                    inputProps={{ inputMode: 'numeric', maxLength: 6 }}
                />
                <Button color="secondary" size="small" >RESEND OTP</Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={verifyHandler}
                >
                    Verify and Continue
                </Button>
            </div>
        </Container>
    );
}

export default OtpScreen;