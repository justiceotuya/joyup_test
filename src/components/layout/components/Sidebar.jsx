import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import classes from './Layout.module.css';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { menuItems } from '../constants'

const Sidebar = ({ handleDrawerToggle, mobileOpen }) => {
    const { drawerPaper, toolbar, drawer } = classes
    const matches = useMediaQuery('(min-width:600px)')

    return (
        <nav className={drawer} aria-label="Mailbox folders">
            <Drawer
                variant={matches ? 'permanent' : null}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{ paper: drawerPaper }}
                ModalProps={{ keepMounted: true }}
            >
                <div className={toolbar} />
                <Divider />
                <List>
                    {

                        menuItems.map(menuItem => {
                            const { item, icon } = menuItem;
                            return <ListItem button key={item}>
                                <ListItemIcon>
                                    {
                                        icon === 'Home' ? <HomeIcon /> : <SettingsIcon />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        })
                    }
                </List>
            </Drawer>
        </nav>
    )
}
export default Sidebar;
