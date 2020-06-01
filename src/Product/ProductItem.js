import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddToCart from './AddToCartButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '8px 12px',
        marginBottom: theme.spacing(0.5),
    },
    product: {
        fontWeight: '450',
        lineHeight: '1.2',
    },
    unit: {
        lineHeight: '1.85',
    },
    mrp: {
        textDecoration: 'line-through',
    }
  }));

const ProductItem = (props) => {
    const product = props.product;
    const classes = useStyles();

    const getPriceDisplay = () => {
        return (
            <Typography variant="subtitle2" color="secondary">
                &#8377;{product.buyingPrice}
                {
                    product.maximumRetailPrice ?
                        <React.Fragment>
                            &nbsp;&nbsp;
                            <Typography variant="caption" color="textSecondary" className={classes.mrp}>
                                &#8377;{product.maximumRetailPrice}
                            </Typography>
                        </React.Fragment>
                    : null
                }
            </Typography>
        );
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1} >
                    <Grid item xs={12} container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="body2" color="textPrimary" className={classes.product}>
                                    {product.productBrand ? product.productBrand + ' ': ''}{product.productName}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" className={classes.unit}>
                                    {product.perProductUnit}
                                </Typography>
                                {getPriceDisplay()}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <AddToCart productCount={0} />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default ProductItem;