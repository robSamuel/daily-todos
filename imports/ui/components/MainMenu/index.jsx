/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidV4 } from 'uuid';
import MenuList from '@material-ui/core/MenuList';
import NavMenuItem from '../NavMenuItem';
import { Modules } from './data';
import { useStyles } from './styles';

const MainMenu = ({ changeTitle, onCloseMenu, isOpened }) => {
  const [modules, setModules] = useState(Modules);
  const classes = useStyles();

  const onClose = () => {
    if(typeof onCloseMenu === 'function')
      onCloseMenu();
  };

  const changeSelectedItem = title => {
    const newModules = [...modules];

    for(const newModule of newModules)
      newModule.selected = newModule.text === title;

    setModules(newModules);

    changeTitle(title);
  };

  const renderModules = modules.map(module => (
    <NavMenuItem
      key={`module-${uuidV4()}`}
      selected={module.selected}
      badgeText={module.badgeText}
      changeSelectedItem={changeSelectedItem}
      icon={module.icon}
      isOpened={isOpened}
      text={module.text}
      to={module.to}
    />
  ));

  return (
    <div>
      <MenuList className={classes.menuContainer} onClick={onClose}>
        {renderModules}
      </MenuList>
    </div>
  );
};

MainMenu.defaultProps = {
  onCloseMenu: () => {},
  isOpened: false,
};

MainMenu.propTypes = {
  changeTitle: PropTypes.func.isRequired,
  onCloseMenu: PropTypes.func,
  isOpened: PropTypes.bool,
};

export default MainMenu;
