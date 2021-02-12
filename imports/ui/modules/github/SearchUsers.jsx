import React, { useState, useEffect, useCallback } from 'react';
import request from 'request';
import '/imports/ui/styles/User.css';
import { useHistory } from 'react-router';
import ArrayUtils from '/lib/ArrayUtils';
import { StringUtils } from '/lib/StringUtils';
import { DialogConfirm } from '/imports/ui/components/widgets/DialogConfirm';
import { GithubRequests, MainURL, URL } from '/lib/httpModules/GithubRequests';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    Cell,
} from 'recharts';

/*Material UI*/
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import green from '@material-ui/core/colors/green';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const BAR_COLORS = [
    '#f2ae4d',
    '#36c63a',
    '#fcd00a',
    '#f2ae4d',
    '#d47203',
    '#f95e14',
    '#d26268',
    '#ec1217',
    '#d47203',
    '#f95e14',
    '#f2ae4d',
    '#36c63a',
    '#fcd00a',
    '#f2ae4d',
    '#d47203',
    '#f95e14',
    '#d26268',
    '#ec1217',
    '#d47203',
    '#f95e14',
];
const TEXT_COLORS = [
    '#3d3d3d',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#3d3d3d',
    '#3d3d3d',
    '#3d3d3d',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#9e92fa',
    '#3d3d3d',
    '#3d3d3d',
];

const http = new GithubRequests();

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
        width: 142,
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

function FollowersGraphic(usersList) {
    const { users } = usersList;
    const [ followersList, setFollowersList ] = useState([]);
    const retrieveFollowers = useCallback(() => {
        const recordsToReturn = [];
        const requests = users.map(user => {
            return new Promise((resolve, reject) => {
                const url = `${MainURL}${URL.USER_DETAILS}${user.login}`;

                request({
                    uri: url,
                    method: 'GET'
                },
                (err, res, body) => {
                    if(err)
                        reject(err);

                    resolve(body);
                });
            });
        });

        Promise.all(requests).then(body => {
            body.forEach(res => {
                if(res) {
                    const response = JSON.parse(res);

                    recordsToReturn.push({
                        name: response.login,
                        top: 0,
                        followers: response.followers
                    });
                }
            });

            setFollowersList(recordsToReturn);
        });
    }, [users]);

    useEffect(() => {
        retrieveFollowers();
    }, [retrieveFollowers]);

    return (
        <div className='graphic-main-container'>
            <div className='graphic-wrapper'>
                <ResponsiveContainer>
                    <BarChart
                        data={followersList}
                        margin={{ top: 60, right: 5, left: 5, bottom: 60 }}
                    >
                        <XAxis
                            dataKey='name'
                            minTickGap={0}
                            tickMargin={0}
                            label={{
                                value: 'Users',
                                position: 'bottom',
                                textAnchor: 'middle'
                            }}
                        />
                        <YAxis
                            width={40}
                            label={{
                                value: 'Followers',
                                angle: -90,
                                position: 'insideLeft',
                                textAnchor: 'middle'
                            }}
                        />
                        <CartesianGrid strokeDasharray='3 3' />
                        <Tooltip />
                        <Bar dataKey='followers' stackId='a' fill='#8884d8'>
                            {followersList.map((item, index) => {
                                <LabelList
                                    dataKe='name'
                                    key={`label-${index}`}
                                    position='insideTop'
                                    fill={TEXT_COLORS[index]}
                                    angle='-90'
                                />;
                            })}
                            {followersList.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={BAR_COLORS[index]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function UsersList(usersList) {
    const history = useHistory();
    const classes = useStyles();
    const { users } = usersList;

    return (
        <div className='users-list-container'>
            {users.map((user, index) => (
                <div
                    key={`${index}-${user.id}`}
                    className='user-container'
                    onClick={() => {
                        const params = {
                            id: user.login
                        };

                        if(history) {
                            history.push({
                                pathname: `/github/${user.login}`,
                                state: params
                            });
                        }
                    }}
                >
                    <Avatar className={classes.avatar} src={user.avatar_url} alt='avatar' />
                    <label><strong>ID:</strong> {user.id}</label>
                    <label><strong>User:</strong> {user.login}</label>
                </div>
            ))}
        </div>
    );
}

function SearchUsers() {
    const classes = useStyles();
    const [ user, setUser ] = useState('');
    const [ users, setUsers ] = useState([]);
    const [ hasError, setHasError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isSearching, setIsSearching ] = useState(false);
    const isValidUser = validateSearching(user);
    const hasUsers = ArrayUtils.isNotEmpty(users);
    const disableSearch = isSearching || !isValidUser;
    const rootStyle = hasUsers ? ' align-center' : ' searching-background';
    const searchStyleBtn = hasUsers ? classes.searchButton : classes.defaultSearchButton;
    const subContainerStyle = hasUsers ? 'searching-finished-container' : 'searching-container';

    const fetchUsers = useCallback(async () => {
        if(isValidUser) {
            setHasError(false);
            setIsSearching(true);

            http.searchUsers(user).then(
                result => {
                    if(result) {
                        if(result.statusCode === 200) {
                            const data = result.data || {};
                            const retrievedUsers = ArrayUtils.isNotEmpty(data.items)
                                ? data.items.slice(0, 20)
                                : [];

                            setIsSearching(false);
                            setUsers(retrievedUsers);
                        } else if(result.statusCode !== 404) {
                            setHasError(true);
                            setErrorMessage(result.message);
                        }
                    }
                },
                reject => {
                    setHasError(true);
                    setErrorMessage(reject.message);
                    setIsSearching(false);
                }
            );
        }
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
                    <SearchIcon />
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
                        <ClearIcon />
                        Empty List
                    </Button>
                )}
            </div>
            {hasUsers && (
                <div className="searching-result-container">
                    <div className="searching-result-subcontainer">
                        <FollowersGraphic users={users} />
                        <UsersList users={users} />
                    </div>
                </div>
            )}
            {hasError && (
                <DialogConfirm
                    opened={hasError}
                    title="There was an error trying to retrieve the users"
                    description={errorMessage}
                    onClose={() => setHasError(false)}
                    onAccept={() => setHasError(false)}
                />
            )}
        </div>
    );
}

export { SearchUsers };
