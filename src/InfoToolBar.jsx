import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import {Link} from 'react-router-dom' 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from './Form.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useSelector} from 'react-redux'
import MySnack from './MySnack.jsx'

//Иконки

// import Call from '@material-ui/icons/Call';
// import Mail from '@material-ui/icons/Mail';

const appBarStaticStyles = makeStyles (theme => ({
    typografy:{
        //opacity: "1.0",
        
        padding: theme.spacing(2),
        textTransform: "lowercase",
        [theme.breakpoints.down('md')]:{
                padding: theme.spacing(1),
        
        },
    },
    bold: {
        fontWeight: theme.typography.fontWeightBold
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
    h6: {
        ...theme.typography.h6,
        [theme.breakpoints.down('md')]:{
        ...theme.typography.body2
        },
    }
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
    const { typProps, page} = props
    // const qur_theme = useTheme();
    // const down_md = useMediaQuery (qur_theme.breakpoints.down('md'))
    const [open,setOpen] = useState(false)
    const [openSnack,setOpenSnack] = useState(false)
    const [message, setMessage] = useState(0)
    
    const tel = useSelector(state => Object.entries(state.data).find(([key,item])=> item.item_name == 'tel')[1].item_value)
    const email = useSelector(state => Object.entries(state.data).find(([key,item])=> item.item_name == 'email')[1].item_value)
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
            <Typography variant="h2" {...typProps} classes={{h2:classes.bold }}>TMK+</Typography>
        </Button>

        <Button  classes={{label: classes.typografy }} disabled>
        {/*На малых экранах и ниже иконка стандартная - иначе большая */}
            {/* <Call fontSize={down_md? "default": "large"} {...typProps}/> */}
            <Typography variant="h6" classes={{h6: classes.h6}} display="inline" {...typProps}>
                <FontAwesomeIcon icon={["fas", "phone-alt"]}/>
                &nbsp;{tel}
            </Typography>
        </Button>

        {/*Телефон и почту рендерим disabled*/}
        <Box flexGrow={1}>
            <Button  classes={{label: classes.typografy }} disabled>
                {/* <Mail fontSize={down_md? "default": "large"} {...typProps}/> */}
                <Typography variant="h6" classes={{h6: classes.h6}} {...typProps} >
                    <FontAwesomeIcon icon={["fas", "envelope"]}/>
                    &nbsp;{email}
                </Typography>
            </Button>
        </Box>
        <Fab color={page ==0 ? "primary": "secondary"}  variant="extended" className={classes.button} onClick={handleOpen}>
            <Typography variant="h6" classes={{h6: classes.h6}}   >Стать&nbsp;клиентом</Typography>
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
    </>
    )

}