import React, {useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    categoryName: {
        fontSize: '0.65rem',
    },
    categoryImage: {
        height: '40px',
        width: '40px',
    },
}));

const categories = [
    {
        categoryId: "groceries",
        categoryName: "Groceries & Essentials",
        categoryStatus: "LIVE",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/grocery.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "fruitsVeggies",
        categoryName: "Fruits & Vegetables",
        categoryStatus: "LIVE",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/fruitsVegetables.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "medicines",
        categoryName: "Medicines",
        categoryStatus: "LIVE",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/apollo_pharmacy2.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "groceries",
        categoryName: "Groceries & Essentials",
        categoryStatus: "LIVE",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/grocery.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "fruitsVeggies",
        categoryName: "Fruits & Vegetables",
        categoryStatus: "ONVACATION",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/fruitsVegetables.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "medicines",
        categoryName: "Medicines",
        categoryStatus: "LIVE",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/apollo_pharmacy2.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "groceries",
        categoryName: "Groceries & Essentials",
        categoryStatus: "ONVACATION",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/grocery.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "fruitsVeggies",
        categoryName: "Fruits & Vegetables",
        categoryStatus: "LIVE",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/fruitsVegetables.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "medicines",
        categoryName: "Medicines",
        categoryStatus: "LIVE",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/apollo_pharmacy2.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "groceries",
        categoryName: "Groceries & Essentials",
        categoryStatus: "ONVACATION",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/grocery.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "fruitsVeggies",
        categoryName: "Fruits & Vegetables",
        categoryStatus: "LIVE",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/fruitsVegetables.png?tr=w-120,h-120,cm-pad_resize"
    },
    {
        categoryId: "medicines",
        categoryName: "Medicines",
        categoryStatus: "ONVACATION",
        categoryImage: "https://ik.imagekit.io/dunzo/icons/R4_Icons/Home/apollo_pharmacy2.png?tr=w-120,h-120,cm-pad_resize"
    },
];

const CategoryView = () => {
    const classes = useStyles();
    let itemCount = 0;

    const categoryItem = (categoryId, categoryName, categoryImage, isLastRow) => {
        return <Grid item xs={4} className={isLastRow ? classes.gridItemLastRow : classes.gridItem} key={categoryId+""+itemCount}>
            <Paper className={classes.paper} elevation={0}>
                <img src={categoryImage} className={classes.categoryImage} alt={categoryName} />
                <Typography className={classes.categoryName}
                    variant="caption" 
                    display="block" 
                    color="textPrimary">
                    {categoryName}
                </Typography>
            </Paper>
        </Grid>
    }

    const categoryTable = () => {
        const liveCategories = categories.filter(category => category.categoryStatus === 'LIVE');
        const liveCatCount = liveCategories.length;
        const lastRowCount = Math.ceil(liveCatCount/3)*3 - 3;
        console.log("lastRowCount: " + lastRowCount);
        return liveCategories.map(category => {
            if(category.categoryStatus === 'LIVE') {
                itemCount = itemCount + 1;
                console.log("itemCount: " + itemCount);
                const isLastRow = (itemCount > lastRowCount);
                console.log("isLastRow: " + isLastRow);
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