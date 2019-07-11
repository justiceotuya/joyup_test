import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Avatar,
    FormControl,
    MenuItem,
    Select,
} from '@material-ui/core'

import classes from './Dashboard.module.css'

const AgentConfiguration = (props) => {

    const {
        open,
        handleClose,
        data,
        selectedFacebookAccount,
        selectedSquareAccount,
        handleFacebookAccountChange,
        handleSquareAccountChange,
    } = props

    const { card__box_company_logo } = classes
    const { name, logo, squareAccountsData, facebookAccountsData } = data
    const generateAccount = (account = '', nameOfAccount = '', accountsData = [], handlerFunction = null) => {

        return (
            <>
                <DialogContentText>{nameOfAccount}: <strong>{`${account}`}</strong> </DialogContentText>

                <FormControl className={classes.formControl}>
                    <Select
                        value={account}
                        onChange={handlerFunction}
                        displayEmpty
                        name={`${account}`}
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
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
                        Disagree
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AgentConfiguration
