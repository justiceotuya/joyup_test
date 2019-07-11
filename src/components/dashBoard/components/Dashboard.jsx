import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Dashboard.module.css';
import Layout from '../../layout';
import {
    Typography,
    IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AgentCards from './AgentCards';
import agentData from '../../../data/data.json'

export default function Dashboard({ children }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [data] = useState(agentData)
    const [searchData, setSearchData] = useState(data)

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
                {isSearchOpen ? (
                    <input placeholder='search here ..' className={searchInput__mobile} onChange={e => handleAgentSearch(e)} />
                ) : (
                        <>
                            <Typography variant='subtitle1' color='primary'>
                                New Orders
                        </Typography>
                            <Typography variant='body2' color='textPrimary'>
                                {searchData.length} total
                        </Typography>
                        </>
                    )}

                <IconButton
                    color='primary'
                    edge='start'
                    className={dashboard__search_button}
                    onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <SearchIcon />
                </IconButton>

                <div className={search__desktop}>
                    <SearchIcon className={search__desktop_icon} />
                    <input placeholder='search here ..' className={searchInput__desktop} onChange={e => handleAgentSearch(e)} />
                </div>
            </section>
            <AgentCards data={searchData} />
        </Layout>
    );
}

Dashboard.propTypes = {
    children: PropTypes.object,
};
