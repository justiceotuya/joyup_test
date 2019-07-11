import { Avatar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom'
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import useMediaQuery from '@material-ui/core/useMediaQuery'

import classes from './Layout.module.css';
import logo from '../../../assets/logo-face.png'
import { menuItems } from '../constants'


const Sidebar = ({ handleDrawerToggle, mobileOpen }) => {
    const matches = useMediaQuery('(min-width:600px)')
    const path = window.location.pathname

    const {
        sider__image_desktop,
        sider__image_mobile,
        drawerPaper,
        toolbar,
        drawer,
        navlink,
        navlink__item,
        navlink__item_hover,
        navlink__icon_hover,
        navlink__icon,
    }
        = classes

    return (
        <nav className={drawer} aria-label="Mailbox folders">
            <Drawer
                variant={matches ? 'permanent' : null}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{ paper: drawerPaper }}
                ModalProps={{ keepMounted: true }}
            >
                <div className={toolbar} >
                    <Avatar src={logo} alt="joyup" className={sider__image_desktop} />

                    <Avatar src='https://randomuser.me/api/portraits/women/85.jpg' alt="profile" className={sider__image_mobile} />
                </div>
                <Divider />

                <List>
                    {

                        menuItems.map(menuItem => {
                            const { item, icon } = menuItem;
                            return (
                                <NavLink key={item} to={`${item.toLowerCase()}`} className={navlink} >
                                    <ListItem button className={path.includes(item.toLowerCase()) ? navlink__item : navlink__item_hover}>
                                        <ListItemIcon className={path.includes(item) ? navlink__icon : navlink__icon_hover}>

                                            {
                                                icon === 'Home' ? <HomeIcon /> : <SettingsIcon />
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                </NavLink>
                            )
                        })
                    }
                </List>
            </Drawer>
        </nav>
    )
}

export default Sidebar;

Sidebar.propTypes = {
    handleDrawerToggle: PropTypes.func,
    mobileOpen: PropTypes.bool,
};
