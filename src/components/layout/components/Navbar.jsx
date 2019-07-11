import { Avatar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined'
import Toolbar from '@material-ui/core/Toolbar';

import classes from './Layout.module.css';
import logo from '../../../assets/logo-face.png'

const {
    desktop__avatar,
    desktop__logo,
    header,
    header__menuButton,
    header__items,
    header__image,
    header__shoppingCart
} = classes

const Navbar = ({ handleDrawerToggle }) => {
    return (
        <AppBar position="fixed" className={header}>
            <Toolbar className={header__items}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerToggle}
                    className={header__menuButton}
                >
                    <MenuIcon />
                </IconButton>

                <Avatar src={logo} alt="joyup" className={`${header__image} ${desktop__logo}`} />

                <Avatar src='https://randomuser.me/api/portraits/women/85.jpg' alt="profile" className={`${header__image} ${desktop__avatar}`} />


                <IconButton
                    color="inherit"
                    aria-label="Shopping cart"
                    className={header__shoppingCart}
                >
                    <ShoppingCart />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
