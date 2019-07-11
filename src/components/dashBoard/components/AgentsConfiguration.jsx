import { Avatar, FormControl, MenuItem, Select } from '@material-ui/core'
import React from 'react';
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
    } = props;

    // styles
    const {
        card__box_company_logo,
        formControl,
        selectEmpty
    } = classes;

    const { name, logo, squareAccountsData, facebookAccountsData } = data

    /**
     *
     * @param {String} account The currect selected account of the social media network e.g facebook
     * @param {string} nameOfAccount The name of the social media network
     * @param {Array} accountsData The data for thet account
     * @param {Func} handlerFunction The function thats perform selection action when an account of a social media is selected
     */

    const generateAccount = (account = '', nameOfAccount = '', accountsData = [], handlerFunction = null) => {
        return (
            <>
                <DialogContentText>{nameOfAccount}: <strong>{`${account}`}</strong> </DialogContentText>
                <FormControl className={formControl}>
                    <Select
                        value={account}
                        onChange={handlerFunction}
                        displayEmpty
                        name={`${account}`}
                        className={selectEmpty}
                    >
                        <MenuItem value="">
                            <em>{NONE}</em>
                        </MenuItem>
                        {
                            Object.entries(data).length !== 0
                                ?
                                accountsData.map(item => {
                                    const { id, AccountName } = item
                                    return (
                                        <MenuItem key={id} value={AccountName}>{AccountName}</MenuItem>
                                    )
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
                            generateAccount(selectedFacebookAccount, 'Facebook Account', facebookAccountsData, handleFacebookAccountChange)
                        }
                    </DialogContent>
                    <DialogContent>
                        {generateAccount(selectedSquareAccount, 'Square Account', squareAccountsData, handleSquareAccountChange)}
                    </DialogContent>
                </DialogContent>


                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {OK}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
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
