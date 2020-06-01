import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import { getProductForCategory, getProduct } from '../API/Cache/product-cache';
import { Divider } from '@material-ui/core';
import SearchBar from './SearchBar';
import Navbar from '../Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ProductItem from './ProductItem';

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
    priceBlock: {

    },
    mrp: {
        textDecoration: 'line-through',
    }
  }));

const Product = (props) => {
    const categoryId = queryString.parse(props.location.search).categoryId;
    const categoryName = props.location.state.categoryName;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [productTermsMap, setProductTemsMap] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const classes = useStyles();

    useEffect(() => {
        getProductForCategory(categoryId).then((data) => {
            setFilteredProducts(data);
            setAllProducts(data);
            setProductTemsMap(generateProductTerms(data));
        }).catch(err => console.log(err));
    }, []);

    const generateProductTerms = (allProducts) => {
        const productIdTermMap = {}; 
        allProducts.map(product => {
            const productTerms = [];
            if (product.productBrand) {
                const productBrandTerm = product.productBrand.toLowerCase();
                const productBrandTerms = productBrandTerm.split(/(\s+)/)
                                            .filter( e => e.trim().length > 0);
                productTerms.push.apply(productTerms, productBrandTerms);
            }
            if (product.productName) {
                const productNameTerm = product.productName.toLowerCase();
                const productNameTerms = productNameTerm.split(/(\s+)/)
                                            .filter( e => e.trim().length > 0);
                productTerms.push.apply(productTerms, productNameTerms);
            }
            productIdTermMap[product.productId] = productTerms;
        });
        return productIdTermMap;
    }

    const getProducts = () => {
        return filteredProducts.map(product => <ProductItem product={product} />);
    }

    const searchFilterHandler = (event) => {
        setSearchValue(event.target.value);
        const searchQuery = event.target.value.trim();
        if (searchQuery) {
            const searchQueries = (searchQuery.toLowerCase())
                                        .split(/(\s+)/)
                                        .filter( e => e.trim().length > 0);

            const filteredList = allProducts.filter(product => {
                const productTerms = productTermsMap[product.productId];
                for (let i = 0; i < searchQueries.length; i++) {
                    let matchSearchQueryWithProductTerms = 0;
                    const searchQuery = searchQueries[i];
                    for (let j = 0; j < productTerms.length; j++) {
                        const productTerm = productTerms[j];
                        if (productTerm.search(searchQuery) !== -1) {
                            matchSearchQueryWithProductTerms = matchSearchQueryWithProductTerms + 1;
                        }
                    }
                    if (matchSearchQueryWithProductTerms === 0) {
                        return false;
                    }
                }
                return true;
            });
            setFilteredProducts(filteredList);
        } else {
            setFilteredProducts(allProducts);
        }
    }

    return (
        <React.Fragment>
            <Navbar categoryName={categoryName} 
                showSearch={true} 
                filterHandler={searchFilterHandler}
                searchText={searchValue} />
            <Divider />
            {getProducts()}
        </React.Fragment>
        
    );
}

export default Product;