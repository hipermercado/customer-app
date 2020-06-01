import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    decrementButton: {
        padding: '0px 4px',
        fontSize: '1rem',
        fontWeight: '600',
        border: '1px solid #3f51b5'
    },
    incrementButton: {
        padding: '0px 4px',
        fontSize: '1rem',
        fontWeight: '600',
        border: '1px solid #3f51b5'
    },
    quantityDisplay: {
        fontWeight: '600',
        color: theme.palette.secondary,
        "&$buttonDisabled": {
            fontWeight: '600',
            border: '1px solid #3f51b5',
            color: theme.palette.secondary.main
        }
    },
    buttonDisabled: {},
    addButton: {
        fontWeight: '600'
    }
}));
const AddToCart = (props) => {
    const [count, setCount] = useState(props.productCount);
    const classes = useStyles();

    const handleIncrement = (e) => {
       setCount(prevCount => prevCount +  1);
    };
    
    const handleDecrement = (e) => {
        setCount(prevCount => prevCount -  1);
    };

    const getButtons = () => {
        if(count === 0) {
            return <Button variant="outlined" color="primary" size="small" onClick={handleIncrement} className={classes.addButton}>
                            Add
                    </Button>;
        } else {
            return <ButtonGroup size="small">
                <Button color="primary" onClick={handleDecrement} className={classes.decrementButton}>-</Button>
                <Button classes={{ root: classes.quantityDisplay, disabled: classes.buttonDisabled }} disabled>{count}</Button>
                <Button color="primary" onClick={handleIncrement} className={classes.incrementButton}>+</Button>
            </ButtonGroup>;
        }
    }

    return getButtons();
}

export default AddToCart;