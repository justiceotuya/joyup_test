import { Avatar, FormControl, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

import classes from './Dashboard.module.css'
import { STRINGS } from '../constants'

const { NONE, OK } = STRINGS



const AgentConfiguration = props => {
    const {
        open,
        handleClose,
        data,
        selectedFacebookAccount,
        selectedSquareAccount,
        handleFacebookAccountChange,
        handleSquareAccountChange,
        loading,
        merchantsFacebookPages
    } = props;


    const { name, logo, location_ids, facebook_page_ids, facebook_page_id, _id, selected_square_account } = data

    console.log('aaa', data)
    // styles
    const {
        card__box_company_logo,
        formControl,
        selectEmpty
    } = classes;

    const addNewSquareAccount = async () => {
        try {
            const response = await axios('http://localhost:3000/square/account/switch')
            console.log('response - /square/account/switch', response)
        } catch (error) {
            console.log(error)
        }
    }





    /**
     *
     * @param {String} account The currect selected account of the social media network e.g facebook
     * @param {string} nameOfAccount The name of the social media network
     * @param {Array} accountsData The data for thet account
     * @param {Func} handlerFunction The function thats perform selection action when an account of a social media is selected
     */

    const generateAccount = (account = {}, nameOfAccount = '', accountsData = [], handlerFunction = null, currentSelectedAccount = '') => {
        console.log('data', data)
        const { id, name } = account;
        return (
            <>
                <DialogContentText>{nameOfAccount}: <strong>{currentSelectedAccount && `${name}`}</strong> </DialogContentText>
                <FormControl className={formControl}>
                    <Select
                        value={id}
                        onChange={handlerFunction}
                        displayEmpty
                        // name={name}
                        className={selectEmpty}
                    >
                        <MenuItem value="">
                            <em>{NONE}</em>
                        </MenuItem>
                        {
                            Object.entries(data).length !== 0
                                ?
                                accountsData.map(item => {
                                    if (nameOfAccount === 'Facebook Account') {
                                        const { _id, id, name } = item
                                        return (
                                            <MenuItem key={_id} name={name} value={id}>{name}</MenuItem>
                                        )
                                    } else if (nameOfAccount === 'Square Account') {
                                        const { _id, id, AccountName } = item
                                        return (
                                            <MenuItem key={_id} value={id}>{AccountName}</MenuItem>
                                        )
                                    }
                                })
                                : null
                        }
                    </Select>
                </FormControl>
            </>
        )
    }


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{`Edit configuration for ${name}`}</DialogTitle>
                <DialogContent>
                    <Avatar src={logo} alt='company' className={card__box_company_logo} />

                    <DialogContent>
                        {
                            generateAccount(selectedFacebookAccount, 'Facebook Account', merchantsFacebookPages, handleFacebookAccountChange, facebook_page_id)
                        }
                    </DialogContent>
                    {/* <DialogContent>
                        {generateAccount(selectedSquareAccount, 'Square Account', location_ids, handleSquareAccountChange, selected_square_account)}
                        <br />
                        <Button onClick={addNewSquareAccount} color="secondary">Add Square Account</Button>
                    </DialogContent> */}
                </DialogContent>


                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {OK}
                    </Button>
                </DialogActions>

            </Dialog>
        </div >
    );
}

export default AgentConfiguration

AgentConfiguration.propTypes = {
    data: PropTypes.object,
    handleClose: PropTypes.func,
    handleFacebookAccountChange: PropTypes.func,
    handleSquareAccountChange: PropTypes.func,
    open: PropTypes.bool,
    selectedFacebookAccount: PropTypes.string,
    selectedSquareAccount: PropTypes.string,
}
