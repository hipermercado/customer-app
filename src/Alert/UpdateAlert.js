import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
root: {
    width: '100%',
    '& > * + *': {
    marginTop: theme.spacing(2),
    },
},
}));

const UpdateAlert = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [waitingServiceWorker, setWaitingServiceWorker] = useState(null);
    const [isUpdateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        const checkUpdate = async () => {
            console.log('updating service worker');
            if (navigator.serviceWorker) {
                const registration = await navigator.serviceWorker.ready;
                console.log(registration);
                if (registration) {
                    const updatedServiceWorker = await registration.update();
                    console.log(updatedServiceWorker);
                    if (updatedServiceWorker.waiting) {
                        setWaitingServiceWorker(updatedServiceWorker.waiting);
                        setUpdateAvailable(true);
                    }
                }
            }
        }
        checkUpdate();
    }, []);

    const handleUpdate = () => {
        console.log('update button pressed');
        waitingServiceWorker && waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
        setUpdateAvailable(false);
        setOpen(false);
        window.location.reload();
    };

    const getAlert = () => {
        console.log("in update alert render!")
        if (isUpdateAvailable) {
            return (
                <div className={classes.root}>
                    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <Alert severity="error"
                            action={
                                <Button color="inherit" size="small" onClick ={handleUpdate}>
                                UPDATE
                                </Button>
                            }>
                            A new version of app is available
                        </Alert>
                    </Snackbar>
                </div>
            );
        }
        return null;
    }

    return getAlert();
}

export default UpdateAlert;