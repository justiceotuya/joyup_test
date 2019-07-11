import PropTypes from 'prop-types';
import React, { useState } from 'react';

import classes from './Layout.module.css'
import Navbar from './Navbar';
import Sidebar from './Sidebar'

const Layout = (props) => {
    const {
        root,
        content,
        toolbar,
    } = classes

    const [isMobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!isMobileOpen);
    }


    return (
        <div className={root}>
            <Navbar
                handleDrawerToggle={handleDrawerToggle}
            />
            <Sidebar
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={isMobileOpen}
            />
            <main className={content}>
                <div className={toolbar} />
                {props.children}
            </main>
        </div >
    );
}

export default Layout

Layout.propTypes = {
    children: PropTypes.node,
};
