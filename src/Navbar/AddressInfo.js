import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

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

    return (
        <Grid container spacing={0} className={classes.root}>
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
                        9/419/2, Charan Kanwal Road, Banga, 144505
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AddressInfo;