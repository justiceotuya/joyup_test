import React from 'react';
import {
    Typography,
    IconButton,
    Divider,
    Avatar
} from '@material-ui/core';
import SettingIcon from '@material-ui/icons/Settings';
import { agents } from '../constants'
import classes from './Dashboard.module.css';


const AgentCards = ({ data }) => {
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

    return (
        <main className={dashboard__content}>

            {
                data.map(agent => {
                    const { logo, name } = agent;
                    return (
                        <section className={`${card} ${card__box}`} key={name}>
                            <div className={card__box_inner}>
                                {/* setting icon */}
                                <div className={clearfix}>
                                    <IconButton className={card__box_settings_icon}>
                                        <SettingIcon className={settings_icon} />
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
                                        Marvel Comics
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
        </main>

    )

}
export default AgentCards
