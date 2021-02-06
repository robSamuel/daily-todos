import React, { useState, useEffect, useCallback } from 'react';
import request from 'request';
import '/imports/ui/styles/User.css';
import { useHistory } from 'react-router';
import ArrayUtils from '/lib/ArrayUtils';
import { StringUtils } from '/lib/StringUtils';

/*Material UI*/
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    container: {
        background: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden'
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    defaultSearchButton: {
        width: '100%'
    },
    searchButton: {
        width: 100,
        height: 36,
    },
    emptyButton: {
        width: 140,
        height: 36,
    },
    avatar: {
        width: 50,
        height: 50
    }
});

const validateSearching = (user) => {
    const enabledSearch = !StringUtils.isEmpty(user) && user.length >= 4;

    return enabledSearch;
};

function SearchUsers() {
    const classes = useStyles();
    const [ user, setUser ] = useState('');
    const [ users, setUsers ] = useState([]);
    // const [ hasError, setHasError ] = useState(false);
    // const [ errorMessage, setErrorMessage ] = useState('');
    const [ isSearching, setIsSearching ] = useState(false);
    const isValidUser = validateSearching(user);
    const hasUsers = ArrayUtils.isNotEmpty(users);
    const disableSearch = isSearching || !isValidUser;
    const rootStyle = hasUsers ? ' align-center' : ' searching-background';
    const searchStyleBtn = hasUsers ? classes.searchButton : classes.defaultSearchButton;
    const subContainerStyle = hasUsers ? 'searching-finished-container' : 'searching-container';

    const fetchUsers = useCallback(async () => {

    }, [user, isValidUser]);

    return(
        <div className={`container${rootStyle}`}>
            <div className={subContainerStyle}>
                <TextField
                    label='User'
                    value={user}
                    autoFocus={true}
                    onKeyDown={(event) => {
                        const isEnterKey = event.key === 'Enter' || event.keyCode === 13;

                        if(isValidUser && isEnterKey)
                            fetchUsers();
                    }}
                    margin="dense"
                    variant="outlined"
                    onChange={ event => {
                        const value = event.target.value;

                        setUser(value);
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={searchStyleBtn}
                    onClick={fetchUsers}
                    disabled={disableSearch}
                >
                    Search
                    {isSearching && (
                        <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                        />
                    )}
                </Button>
                {hasUsers && (
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.emptyButton}
                        onClick={() => {
                            setUser('');
                            setUsers([]);
                        }}
                    >
                        Empty List
                    </Button>
                )}
            </div>
        </div>
    );
}

export { SearchUsers };
