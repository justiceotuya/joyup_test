import React, { useState } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import Layout from '../../layout';
import SearchIcon from '@material-ui/icons/Search';

import AgentCards from './AgentCards';
import agentData from '../../../data/data.json'
import classes from './Dashboard.module.css';
import { STRINGS } from '../constants';

require('react-dom');
window.React2 = require('react');

//This component renders the dashboard of the app
const Dashboard = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [data, setData] = useState(agentData);
    const [searchData, setSearchData] = useState(data);
    const { SEARCH_AGENT, NEW_ORDERS, TOTAL } = STRINGS;


    const {
        card,
        dashboard__search_button,
        searchInput__mobile,
        search__desktop,
        search__desktop_icon,
        searchInput__desktop,
        card__search
    } = classes;

    const handleAgentSearch = (e) => {
        let searchString = e.target.value.trim().toLowerCase()
        if (searchString.length > 0) {
            let filteredData = data.filter(agent => {
                const { name } = agent
                return name.toLowerCase().match(searchString)
            })
            setSearchData(filteredData)
        } else {
            setSearchData(data)
        }
    }

    return (
        <Layout>
            <section className={`${card} ${card__search}`}>
                {
                    isSearchOpen ? (
                        <input
                            placeholder={SEARCH_AGENT}
                            className={searchInput__mobile}
                            onChange={
                                e => handleAgentSearch(e)
                            }
                        />
                    ) : (
                            <>
                                <Typography
                                    variant='subtitle1'
                                    color='primary'
                                >
                                    {NEW_ORDERS}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textPrimary'
                                >
                                    {`${searchData.length} ${TOTAL}`}
                                </Typography>
                            </>
                        )}

                <IconButton
                    color='primary'
                    edge='start'
                    className={dashboard__search_button}
                    onClick={
                        () => setIsSearchOpen(!isSearchOpen)
                    }>
                    <SearchIcon />
                </IconButton>

                <div className={search__desktop}>
                    <SearchIcon className={search__desktop_icon} />
                    <input
                        placeholder={SEARCH_AGENT}
                        className={searchInput__desktop}
                        onChange={
                            e => handleAgentSearch(e)
                        }
                    />
                </div>
            </section>
            <AgentCards data={searchData} />
        </Layout>
    );
}

export default Dashboard;
