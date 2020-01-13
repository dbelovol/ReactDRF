import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import {Link} from 'react-router-dom' 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from './Form.jsx'
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import MySnack from './MySnack.jsx'

//Иконки

import Call from '@material-ui/icons/Call';
import Mail from '@material-ui/icons/Mail';

const appBarStaticStyles = makeStyles (theme => ({
    typografy:{
        //opacity: "1.0",
        
        padding: theme.spacing(2),
        textTransform: "lowercase",
        [theme.breakpoints.down('md')]:{
                padding: theme.spacing(1),
        
        },
    },
//-----------------------Стиль для сдвигания кнопки AppBar вправо на малых экранах--//
    
    mail: { // 
        [theme.breakpoints.up('xs')]: {
        flexGrow: 1
    },
    },
//----------------------------------------------------------------------------------//    
    
//---Стиль для переопределения стиля кнопок в заголовке. Там по умолчанию Uppercase-//
    button: {
         textTransform: "none",
    },
    border: {
        borderTop: " 1px solid"
    },
//----------------------------------------------------------------------------------// 
    }));

// const messages = [
//     ["success","Сообщение отправлено"],
//     ["error" , "Сообщение не отправлено. Попробуйте позже"]
// ]

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
//   }

export default function InfoToolBar (props) {

    const classes = appBarStaticStyles()
    const { typProps} = props
    const qur_theme = useTheme();
    const down_md = useMediaQuery (qur_theme.breakpoints.down('md'))
    const [open,setOpen] = useState(false)
    const [openSnack,setOpenSnack] = useState(false)
    const [message, setMessage] = useState(0)

    const handleOpen = () => {
        setOpen (true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // const handleSnackClose = () =>{
    //     setOpenSnack(false)

    // }
    return (
    <>
    <Toolbar disableGutters >
    {/*ToolBar children приходится делать кнопками. Иначе проблема с центрированием*/}

        <Button to="/" component={Link}>
            <Typography variant="h2" {...typProps} >TMK+</Typography>
        </Button>

        <Button  classes={{label: classes.typografy }} disabled>
        {/*На малых экранах и ниже иконка стандартная - иначе большая */}
            <Call fontSize={down_md? "default": "large"} {...typProps}/>
            <Typography variant={down_md ? "caption": "h6"} display="inline" {...typProps}>+7(495)&nbsp;322-22-33</Typography>
        </Button>

        {/*Телефон и почту рендерим disabled*/}
        <Box flexGrow={1}>
            <Button  classes={{label: classes.typografy }} disabled>
                <Mail fontSize={down_md? "default": "large"} {...typProps}/>
                <Typography variant={down_md ? "caption": "h6"}  {...typProps} >info@example.com</Typography>
            </Button>
        </Box>
        <Fab color="secondary"  variant="extended" className={classes.button} onClick={handleOpen}>
            <Typography variant={down_md ? "body2": "h6"}  >Стать&nbsp;клиентом</Typography>
        </Fab>
        <Dialog 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle id="form-dialog-title">Пожалуйста, заполните и отправьте форму</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Мы свяжемся с вами в ближайшее время
                    </DialogContentText>
                    <Form mode onSend={handleClose} onOpen={setOpenSnack} onMessage={setMessage}/>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" > 
                    Отменить
                </Button>
            </DialogActions>
        </Dialog>
    </Toolbar>
    <MySnack open={openSnack} message={message} setOpenSnack={setOpenSnack} />
    {/* <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity={messages[message][0]}>
            {messages[message][1]}
        </Alert>
    </Snackbar> */}
    </>
    )

}