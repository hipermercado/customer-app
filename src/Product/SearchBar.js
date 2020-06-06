import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Container, AppBar, Toolbar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '95%',
        border: '2px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '6px',
        marginBottom: '8px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: '6px',
    },
}));

const SearchBar = (props) => {
    const classes = useStyles();

    return (
        <Container key={'search1'} className={classes.root}>
            <IconButton key={'search2'} className={classes.iconButton} aria-label="search" disableRipple={true}>
                <SearchIcon />
            </IconButton>
            <InputBase
                key={'search3'}
                className={classes.input}
                placeholder="Search for product"
                value={props.searchText}
                onChange={(event) => {
                    props.filterHandler(event);
                }}
            />
        </Container>
    );
}

export default SearchBar;