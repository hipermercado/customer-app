import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Carousel from './Carousel';
import Divider from '@material-ui/core/Divider';
import CategoryView from './CategoryView'
import { useHistory } from 'react-router-dom'; 
import { getAddressForCurrentUser } from '../API/Cache/address-cache';
import withNav from '../Navbar/WithNav';
import Navbar from '../Navbar/Navbar';
import BottomNav from '../Navbar/BottomNav';

const useStyles = makeStyles((theme) => ({
    home: {
        //padding: theme.spacing(1)
    },
}));

const Home = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [isAddressSet, setAddressSet] = useState(false);
    
    useEffect(() => {
        getAddressForCurrentUser().then(address => {
            setAddressSet(true);
            if (Object.keys(address).length === 0 && address.constructor === Object) {
                history.push('/address');
            }
        })
    }, []);

    return (
       isAddressSet ? 
            <React.Fragment>
                <Navbar />
                <Paper className={classes.home} elevation={0}>
                    <Divider />
                    <Carousel />
                    <Divider />
                    <CategoryView />
                </Paper>
                <BottomNav />
            </React.Fragment>
        : null 
    );
}

export default Home;