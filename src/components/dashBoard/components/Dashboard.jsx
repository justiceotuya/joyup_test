import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import Layout from '../../layout';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import AgentCards from './AgentCards';
import agentData from '../../../data/data.json'
import classes from './Dashboard.module.css';
import { STRINGS } from '../constants';
import { flexbox } from '@material-ui/system';


//This component renders the dashboard of the app
const Dashboard = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [data, setData] = useState([]);
    const [facebookToken, setFacebookToken] = useState('');
    const [merchantsFacebookPages, setMerchantsFacebookPages] = useState([]);
    const [isDataFetching, setIsDataFetching] = useState(false)
    const [searchData, setSearchData] = useState([]);
    const [merchantID, setmerchantID] = useState('5d39c00b4d3f616e4c976ccb')
    const { SEARCH_AGENT, NEW_ORDERS, TOTAL } = STRINGS;



    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = React.useCallback(async () => {
        setIsDataFetching(true)
        try {
            const response = await axios.post('http://localhost:4000/get/fetch_Merchants_data',
                {
                    merchantID
                })

            let merchantData = response.data.merchant
            let merchantsFacebookPages = response.data.response.data

            const { facebook_page_ids, facebook_token } = merchantData
            setMerchantsFacebookPages(merchantsFacebookPages)
            setFacebookToken(facebook_token)
            setData(facebook_page_ids)
            setSearchData(facebook_page_ids)
            setIsDataFetching(false)
        } catch (error) {
            setIsDataFetching(false)
            console.log(error)
        }

    })

    const {
        card,
        dashboard__search_button,
        searchInput__mobile,
        search__desktop,
        search__desktop_icon,
        searchInput__desktop,
        card__search,
        loading
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
            {
                isDataFetching ?
                    <div className={loading}>
                        <CircularProgress />
                    </div>
                    :
                    <AgentCards data={data} agentsData={searchData} facebookToken={facebookToken} fetchData={fetchData} merchantsFacebookPages={merchantsFacebookPages} merchantID={merchantID} />
            }
        </Layout >
    );
}

export default Dashboard;
