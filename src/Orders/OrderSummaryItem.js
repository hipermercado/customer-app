import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '8px 10px',
        marginBottom: theme.spacing(0.5),
    },
    product: {
        fontWeight: '450',
        lineHeight: '1.2',
    },
    unit: {
        lineHeight: '1.85',
    },
    priceDisplay: {
        textAlign: 'end',
    },
    quantity: {
        fontWeight: '450',
        lineHeight: '1.2',
        color: theme.palette.primary.main
    },
  }));

const OrderSummaryItem = (props) => {
    const cart = props.cartItem;
    const classes = useStyles();

    const getPriceDisplay = () => {
        const calculatedPrice = Number(cart.quantity) * Number(cart.buyingPrice)
        return (
            <Typography variant="subtitle2" color="secondary">
                &#8377;{calculatedPrice}
            </Typography>
        );
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1} >
                    <Grid item xs={12} container spacing={1}>
                        <Grid item xs={1} container direction="column">
                            <Typography variant="body2" color="textPrimary" className={classes.quantity}>
                                {cart.quantity}x
                            </Typography>
                        </Grid>
                        <Grid item xs container direction="column">
                                <Typography variant="body2" color="textPrimary" className={classes.product}>
                                    {cart.productBrand ? cart.productBrand + ' ': ''}{cart.productName}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" className={classes.unit}>
                                    {cart.perProductUnit}
                                </Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.priceDisplay}>
                            {getPriceDisplay()}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default OrderSummaryItem;