import React from 'react';

import classNames from 'classnames';
import { MainMenu } from '/imports/ui/layouts/NavMenu';

/* Material UI */
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Settings from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        height: '100vh',
        overflow: 'hidden',
    },
    hide: {
        display: 'none',
    },
});
const containerStyle = {
    flex: 1,
    background: '#EEF4F9CC',
    overflow: 'hidden',
};

class MainLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };

        this.initBind();
    }

    initBind() {
        this.changeTitle = this.changeTitle.bind(this);
        this.onLogingOut = this.onLogingOut.bind(this);
        this.onCloseLeftNav = this.onCloseLeftNav.bind(this);
        this.onHamburgerClick = this.onHamburgerClick.bind(this);
        this.onOpenAccountMenu = this.onOpenAccountMenu.bind(this);
        this.onCloseAccountMenu = this.onCloseAccountMenu.bind(this);
    }

    onOpenAccountMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    onCloseAccountMenu() {
        this.setState({ anchorEl: null });
    }

    onHamburgerClick() {
        this.setState(prevState => ({ open: !prevState.open }));
    }

    onCloseLeftNav() {
        this.setState({ open: false });
    }

    changeTitle(title) {
        this.setState({ title });
    }

    onLogingOut() {

    }

    render() {
        const { props: { classes, theme, children }, state } = this;
        const open = Boolean(state.anchorEl);
        const hamburguerIcon = theme.direction === 'rtl' ? (
            <ChevronRightIcon />
        ) : (
            <ChevronLeftIcon />
        );

        return (
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: state.open,
                        [classes.drawerClose]: !state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: state.open,
                            [classes.drawerClose]: !state.open,
                        }),
                    }}
                    open={state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.onHamburgerClick}>
                            {hamburguerIcon}
                        </IconButton>
                    </div>
                    <Divider />
                    <MainMenu
                        isOpened={state.open}
                        onCloseMenu={this.onCloseLeftNav}
                        changeTitle={this.changeTitle}
                    />
                </Drawer>
                <div style={containerStyle}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: state.open,
                        })}
                    >
                        <Toolbar
                            disableGutters={!state.open}
                            className={classes.toolbar}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.onHamburgerClick}
                                className={classNames(classes.menuButton, {
                                    [classes.hide]: state.open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                Samuel Lab
                            </Typography>
                            <React.Fragment>
                                <Typography
                                    variant="subtitle2"
                                    color="inherit"
                                    noWrap
                                >
                                    Robert Samuel
                                </Typography>
                                <IconButton
                                    aria-owns={
                                        open ? 'menu-appbar' : null
                                    }
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Settings />
                                </IconButton>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.onOpenAccountMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </React.Fragment>
                            <Menu
                                id="menu-appbar"
                                anchorEl={state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.onCloseAccountMenu}
                            >
                                <MenuItem onClick={this.onLogingOut}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <main className={[classes.content, 'layout-border'].join(' ')} style={{display: 'flex'}}>
                        <div className={classes.appBarSpacer} />
                        <div style={{display: 'flex', position: 'relative', overflow: 'hidden'}}>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

const wrapped = withStyles(styles, { withTheme: true })(MainLayout);

export { wrapped as MainLayout };
