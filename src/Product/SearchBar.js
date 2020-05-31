import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '95%',
        border: '2px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '6px',
        marginBottom: theme.spacing(1),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

const SearchBar = (props) => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="search" disableRipple={true}>
                <SearchIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Search for product"
                onChange={props.filterHandler}
                onKeyPress={event => {
                    const inputValue = event.key;
                    if (!((inputValue >= 'a' && inputValue <= 'z')|| 
                            (inputValue >= 'A' && inputValue <= 'Z') || inputValue === ' ')) {
                        event.preventDefault(); 
                    }
                }}
            />
        </Container>
    );
}

export default SearchBar;