/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './styles';

const NavMenuItem = ({
  icon,
  to,
  changeSelectedItem,
  text,
  selected,
  badgeText,
  isOpened,
}) => {
  const classes = useStyles();

  const onChangeSelectedItem = itemText => () => {
    changeSelectedItem(itemText);
  };

  const renderContent = () => {
    if(badgeText) {
      return (
        <div className={classes.itemContent}>
          <span className={classes.itemText}>{text}</span>
          <Chip
            className={classes.chip}
            color="secondary"
            label={badgeText}
          />
        </div>
      );
    }

    return text;
  };
  
  const renderItem = () => (
    <ListItemText primary={renderContent()} />
  );

  const renderIcon = () => {
    const iconContent = typeof icon === 'string'
      ? (
        <Icon className={classes.icon}>
          <img className={classes.iconImage} src={icon} alt="Menu Icon" />
        </Icon>
      )
      : (
        <>{React.createElement(icon, null)}</>
      );

    return (
      <ListItemIcon>
        {iconContent}
      </ListItemIcon>
    );
  };

  const renderItemContent = () => {
    if(!isOpened) {
      return (
        <>
          <Tooltip title={text} placement="right">
            {renderIcon()}
          </Tooltip>
          {renderItem()}
        </>
      );
    }

    return (
      <>
        {renderIcon()}
        {renderItem()}
      </>
    );
  };

  return (
    <MenuItem
      button
      className={classes.menuItem}
      component={Link}
      onClick={onChangeSelectedItem(text)}
      selected={selected}
      to={to}
    >
      {renderItemContent()}
    </MenuItem>
  );
};

NavMenuItem.defaultProps = {
  icon: '/icons/nav/github.svg',
  badgeText: '',
  isOpened: false,
};

NavMenuItem.propTypes = {
  icon: PropTypes.string,
  to: PropTypes.string.isRequired,
  changeSelectedItem: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  badgeText: PropTypes.string,
  isOpened: PropTypes.bool,
};

export default NavMenuItem;
