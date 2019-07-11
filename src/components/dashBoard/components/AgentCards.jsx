import { Avatar, Divider, IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SettingIcon from '@material-ui/icons/Settings';

import AgentConfiguration from './AgentsConfiguration'
import classes from './Dashboard.module.css';
import { STRINGS } from '../constants'

const { MARVEL_COMICS } = STRINGS

//This component creates each card in the dashboard
const AgentCards = ({ data }) => {
    const [open, setOpen] = useState(false);
    //we need to keep track of the card that contains the info that is currently selected
    const [currentItem, setCurrentItem] = useState({})
    const [selectedFacebookAccount, setSelectedFacebookAccount] = useState('');
    const [selectedSquareAccount, setSelectedSquareAccount] = useState('');

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



    const handleFacebookAccountChange = (event) => {
        setSelectedFacebookAccount(event.target.value)
    }

    const handleSquareAccountChange = (event) => {
        setSelectedSquareAccount(event.target.value)
    }

    //sets the selected card
    const handleConfigureButtonClick = (e, items) => {
        setOpen(true);
        data.map(item => {
            const { id } = item
            if (id === items) {
                return setCurrentItem(item)
            } else {
                return null
            }
        })
    }

    //closing the modal
    const handleClose = () => {
        setOpen(false);
        setSelectedSquareAccount('')
        setSelectedFacebookAccount('')
    }


    return (
        <main className={dashboard__content}>

            {
                data.map(agent => {
                    const { logo, name, id } = agent;
                    return (
                        <section className={`${card} ${card__box}`} key={id}>
                            <div className={card__box_inner}>
                                {/* setting icon */}
                                <div className={clearfix}>
                                    <IconButton className={card__box_settings_icon}
                                        onClick={(e) => handleConfigureButtonClick(e, id)}
                                    >
                                        <SettingIcon className={settings_icon}
                                        />
                                    </IconButton>
                                </div>

                                {/* image and name */}
                                <div className={card__box_company}>
                                    <Avatar src={logo} alt='company' className={card__box_company_logo} />
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
                                    <Typography variant='body1' color='textPrimary'>
                                        {MARVEL_COMICS}
                                    </Typography>

                                    <span>
                                        <Typography variant='body2' color='textPrimary'>
                                            New
                            </Typography>
                                    </span>
                                </div>
                                {/* text and button */}
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
                handleSquareAccountChange={handleSquareAccountChange}
            />
        </main>
    )

}
export default AgentCards

AgentCards.propTypes = {
    data: PropTypes.array,
}
