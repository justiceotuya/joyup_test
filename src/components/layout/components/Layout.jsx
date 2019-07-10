import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Layout.module.css'
import Navbar from './Navbar';
import Sidebar from './Sidebar'

export default function Layout({ children }) {
    const {
        root,
        content,
        toolbar,
    } = classes

    const [mobileOpen, setMobileOpen] = useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }


    return (
        <div className={root}>
            <Navbar
                handleDrawerToggle={handleDrawerToggle}
            />
            <Sidebar
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            />
            <main className={content}>
                <div className={toolbar} />
                {children}
            </main>
        </div >
    );
}

Layout.propTypes = {
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    children: PropTypes.node,
};
