import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Carousel from './Carousel';
import Divider from '@material-ui/core/Divider';
import CategoryView from './CategoryView'

const useStyles = makeStyles((theme) => ({
    home: {
        //padding: theme.spacing(1)
    },
}));

const Home = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.home} elevation={0}>
            <Divider />
           <Carousel />
           <Divider />
           <CategoryView />
        </Paper>
        
    )
}

export default Home;