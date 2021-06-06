import React, {useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase'
import { useHistory } from 'react-router-dom'; 
import {getAllCategories} from '../API/Cache/category-cache';
import { getProductForCategory } from '../API/Cache/product-cache';

const useStyles = makeStyles((theme) => ({
    gridItem: {
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    gridItemLastRow: {
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    },
    text: {
        padding: theme.spacing(1),
        fontWeight: 'bold'
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    base: {
        padding: theme.spacing(1),
        width: '100%',
        height: '100%'
    },
    categoryName: {
        fontSize: '0.65rem',
    },
    categoryImage: {
        height: '50px',
        width: '50px',
    },
}));

const CategoryView = () => {
    const classes = useStyles();
    const history = useHistory();
    const [categories, setCategories] = useState([]);
    let itemCount = 0;

    useEffect(() => {
        getAllCategories().then(categories => {
            setCategories(categories);
            preFetchProducts(categories);
        }).catch(err => console.log(err));
    }, []);

    const preFetchProducts = async (categories) => {
        categories.map(category => {
            getProductForCategory(category.categoryId);
        });
    }

    const clickHandler = (categoryId, categoryName) => {
        history.push({
            pathname: '/product',
            search: '?categoryId='+categoryId,
            state: { categoryName: categoryName }
        });
    }

    const categoryItem = (categoryId, categoryName, categoryImage, isLastRow) => {
        return <Grid item xs={4} className={isLastRow ? classes.gridItemLastRow : classes.gridItem} key={categoryId}>
            <ButtonBase className={classes.base} key={categoryId} onClick={() => clickHandler(categoryId, categoryName)}>
            <Paper className={classes.paper} elevation={0}>
                <img src={categoryImage} className={classes.categoryImage} alt={categoryName} />
                <Typography className={classes.categoryName}
                    variant="caption" 
                    display="block" 
                    color="textPrimary">
                    {categoryName}
                </Typography>
            </Paper>
            </ButtonBase>
            </Grid>
    }

    const categoryTable = () => {
        const liveCategories = categories.filter(category => category.categoryStatus === 'LIVE');
        const liveCatCount = liveCategories.length;
        const lastRowCount = Math.ceil(liveCatCount/3)*3 - 3;
        return liveCategories.map(category => {
            if(category.categoryStatus === 'LIVE') {
                itemCount = itemCount + 1;
                const isLastRow = (itemCount > lastRowCount);
                return categoryItem(category.categoryId, category.categoryName, category.categoryImage, isLastRow);
            }
        });
    }

    return (
        <React.Fragment>
            <Typography variant="subtitle2" className={classes.text}>
                What would you like to order today?
            </Typography>
            <Divider />
            <Grid container spacing={0}>
                {categoryTable()}
            </Grid>
            <Divider />
        </React.Fragment>
    );
}

export default CategoryView;