import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StringUtils } from '/lib/StringUtils';

/*Material UI*/
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    menuItem: {
        '&:focus': {
            textDecoration: 'none',
        },
    },
    primary: {},
    icon: {},
});

class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            modules: [
                {
                    text: 'Work Out',
                    to: '/work-out',
                    icon: '/icons/nav//work-out.png',
                    selected: false,
                    badgeText: 'BETA',
                },
                {
                    text: 'Twitter',
                    to: '/twitter',
                    icon: '/icons/nav/twitter.svg',
                    selected: false,
                    badgeText: 'BETA',
                },
            ]
        };

        this.initBind();
    }

    initBind() {
        this.getModules = this.getModules.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.changeSelectedItem = this.changeSelectedItem.bind(this);

    }

    changeSelectedItem(title) {
        const { props, state } = this;
        const modules = [...state.modules];

        for(const item of modules) {
            item.selected = item.text === title;
        }

        this.setState({ modules });
        props.changeTitle(title);
    }

    handleClick() {
        this.setState(prevState => ({ open: !prevState.open }));
    }

    getModules() {
        const { props: { classes, isOpened }, state: { modules } } = this;

        return modules.map((item, index) => {
            const { text, to, icon, selected, badgeText } = item;

            return (
                <NavMenu
                    key={index}
                    selected={selected}
                    changeSelectedItem={this.changeSelectedItem}
                    classes={classes}
                    icon={icon}
                    text={text}
                    to={to}
                    badgeText={badgeText}
                    isOpened={isOpened}
                />
            );
        });
    }

    render() {
        const { props: { classes, onCloseMenu } } = this;

        return (
            <div className={classes.root}>
                <MenuList
                    onClick={() => {
                        if (onCloseMenu) onCloseMenu();
                    }}
                >
                    {this.getModules()}
                </MenuList>
            </div>
        );
    }
}

MainMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    changeTitle: PropTypes.func.isRequired,
    onCloseMenu: PropTypes.func,
    isOpened: PropTypes.bool,
};

const NestedListWithStyles = withStyles(styles)(MainMenu);

export { NestedListWithStyles as MainMenu };

class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.initBind();
    }

    initBind() {
        this.renderItem = this.renderItem.bind(this);
        this.renderIcon = this.renderIcon.bind(this);
    }

    static propTypes = {
        to: PropTypes.string.isRequired,
        icon: PropTypes.string,
        onFocus: PropTypes.func,
        changeSelectedItem: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        classes: PropTypes.object,
        tabIndex: PropTypes.number,
        selected: PropTypes.bool.isRequired,
        badgeText: PropTypes.string,
        isOpened: PropTypes.bool,
    };

    renderItem() {
        const { props: { text, classes, badgeText } } = this;
        let primaryValue = text;

        if(!StringUtils.isEmpty(badgeText)) {
            const contentStyle = {
                display: 'flex',
                alignItems: 'center',
            };
            const chipStyle = {
                height: 20,
                width: 60,
                fontSize: 12,
            };

            primaryValue = (
                <div style={contentStyle}>
                    <span style={{ marginRight: 10 }}>{text}</span>
                    <Chip
                        className="badge-text-menu"
                        label={badgeText}
                        color="secondary"
                        style={chipStyle}
                    />
                </div>
            );
        }

        return (
            <ListItemText
                classes={{ primary: classes.primary }}
                primary={primaryValue}
            />
        );
    }

    renderIcon() {
        const { props } = this;
        const { icon, classes } = props;

        return (
            <ListItemIcon className={classes.icon}>
                {typeof icon === 'string' ? (
                    <Icon
                        style={{
                            textAlign: 'center',
                            minWidth: '56px',
                            minHeight: '56px',
                            fontSize: '1.8rem',
                        }}
                    >
                        <img
                            style={{ width: '48px', height: '48px' }}
                            src={icon}
                            alt="Menu Icon"
                        />
                    </Icon>
                ) : (
                    <React.Fragment>
                        {React.createElement(icon, null)}
                    </React.Fragment>
                )}
            </ListItemIcon>
        );
    }

    render() {
        const { props: { to, text, classes, selected, isOpened, changeSelectedItem } } = this;
        const itemContent = isOpened ? (
            <React.Fragment>
                {this.renderIcon()}
                {this.renderItem()}
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Tooltip title={text} placement="right">
                    {this.renderIcon()}
                </Tooltip>
                {this.renderItem()}
            </React.Fragment>
        );

        return (
            <MenuItem
                className={classes.menuItem}
                selected={selected}
                onClick={() => changeSelectedItem(text)}
                button
                component={Link}
                to={to}
            >
                {itemContent}
            </MenuItem>
        );
    }
}
