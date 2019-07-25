import { Avatar, Divider, IconButton, Typography, Tooltip } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingIcon from '@material-ui/icons/Settings';

import AgentConfiguration from './AgentsConfiguration'
import classes from './Dashboard.module.css';
import { STRINGS } from '../constants'

const { MARVEL_COMICS } = STRINGS

//This component creates each card in the dashboard
const AgentCards = ({ data, agentsData, fetchData, facebookToken, merchantsFacebookPages, merchantID }) => {
    const [open, setOpen] = useState(false);
    //we need to keep track of the card that contains the info that is currently selected
    const [currentItem, setCurrentItem] = useState({})
    const [selectedFacebookAccount, setSelectedFacebookAccount] = useState({});
    const [selectedSquareAccount, setSelectedSquareAccount] = useState('');
    const [loading, setLoading] = useState(false)


    const {
        card,
        card__box,
        card__box_inner,
        clearfix,
        card__box_settings_icon,
        card__box_company,
        card__box_company_logo,
        card__box_last_item,
        divider,
        dashboard__content,
        settings_icon
    } = classes;

    // const fetchMerchantSelectedFacebook = (merchantID) => {
    //     axios.get('/get/merchantsSelectedFacebook')
    // }

    const updateMerchantSelectedFacebook = async (merchantID, facebook_page_id) => {
        try {
            const response = await axios.put('http://localhost:4000/save/fb/selected', {
                facebook_page_id,
                merchantID
            })
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    //get selected facebook page
    const fetchMerchantSelectedFacebook = async (merchantID) => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:4000/get_fb_selected',
                {
                    merchantID
                })

            let selectedFbAccount = response.data
            console.log('Response', response.data)
            if (selectedFbAccount.facebook_page_id !== null) {
                data.map(item => {
                    const { name } = item
                    if (item.id === selectedFbAccount.facebook_page_id) {
                        console.log('this is fuck', item.name)
                        setCurrentItem(item)
                        setSelectedFacebookAccount({ id: selectedFbAccount.facebook_page_id, name })
                    }
                })
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    // const handleFacebookAccountChange = (event) => {
    //     updateMerchantSelectedFacebook(merchantID, event.target.value)
    //         .then(() =>
    //             fetchMerchantSelectedFacebook(merchantID)
    //         )
    // }

    const handleFacebookAccountChange = (event) => {
        merchantsFacebookPages.map(item => {
            console.log(item)
            const { name } = item
            if (item.id === event.target.value) {
                setSelectedFacebookAccount({ id: event.target.value, name })
            }
        })
    }


    //sets the selected card
    const handleConfigureButtonClick = (e, passedID) => {
        setOpen(true);
        data.map(item => {
            if (item._id === passedID) {
                setCurrentItem(item)
            }
        })
        fetchMerchantSelectedFacebook(merchantID)
    }

    const handleFacebookTokenRefresh = async (e, passedId) => {
        let merchantID = passedId
        let token
        //get the token
        agentsData.map(agent => {
            const { _id } = agent
            if (_id === passedId) {
                token = agent.facebook_token
            }
        })

        try {
            const response = await axios.post('http://localhost:4000/get/merchantsSelectedFacebook',
                {
                    merchantID,
                })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    //closing the modal
    const handleClose = (e, item) => {
        console.log(item)
        setOpen(false);
        updateMerchantSelectedFacebook(merchantID, selectedFacebookAccount.id)
            .then(() =>
                fetchMerchantSelectedFacebook(merchantID)
            )
        // setSelectedFacebookAccount({})
        // setSelectedSquareAccount('')
    }

    const { name, facebook_page_ids } = data
    return (
        <main className={dashboard__content}>

            {
                Object.entries(data).length > 0 && agentsData.map(agent => {
                    const { id, name, _id, logo } = agent;
                    return (
                        <section className={`${card} ${card__box}`} key={_id}>
                            <div className={card__box_inner}>

                                {/* image and name */}
                                <div className={card__box_company}>
                                    <Avatar src={logo} alt={name} className={card__box_company_logo} />
                                    <Typography variant='body1' color='primary'>
                                        {name}
                                    </Typography>
                                </div>

                                <Divider
                                    classes={{
                                        root: divider,
                                    }}
                                />

                                <div className={card__box_last_item}>
                                    <Tooltip
                                        title={`Refresh Access for ${name}`}
                                        placement="top-start"
                                    >
                                        <IconButton
                                            className={card__box_settings_icon}
                                            onClick={(e) => handleFacebookTokenRefresh(e, _id)}
                                        >
                                            <RefreshIcon className={settings_icon}
                                            />
                                        </IconButton>
                                    </Tooltip>

                                    {/* setting icon */}
                                    <Tooltip
                                        title={`Edit configration for ${name}`}
                                        placement="top-end"
                                    >
                                        <IconButton
                                            className={card__box_settings_icon}
                                            onClick={(e) => handleConfigureButtonClick(e, _id)}
                                        >
                                            <SettingIcon className={settings_icon}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </section>

                    )
                })
            }
            <AgentConfiguration
                open={open}
                handleClose={handleClose}
                data={currentItem}
                selectedFacebookAccount={selectedFacebookAccount}
                selectedSquareAccount={selectedSquareAccount}
                handleFacebookAccountChange={handleFacebookAccountChange}
                loading={loading}
                facebookToken={facebookToken}
                merchantsFacebookPages={merchantsFacebookPages}
            // handleSquareAccountChange={handleSquareAccountChange}
            />
        </main>
    )

}
export default AgentCards

AgentCards.propTypes = {
    data: PropTypes.array,
}
