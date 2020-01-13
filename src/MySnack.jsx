import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const messages = [
    ["success","Сообщение отправлено"],
    ["error" , "Сообщение не отправлено. Попробуйте позже"]
]

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function MySnack(props) {

    const handleSnackClose = () => {
        setOpenSnack(false)
    }

    const {open, setOpenSnack, message} = props
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={messages[message][0]}>
                {messages[message][1]}
            </Alert>
        </Snackbar>
    )
}