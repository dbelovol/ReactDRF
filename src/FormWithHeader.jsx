import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Container from "@material-ui/core/Container";
// import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Form from './Form.jsx'
import MySnack from './MySnack.jsx'

const form = {
    header: "Получить бесплатную консультанцию",
    text1:  "Оставьте вашу заявку либо позвоните нам по телефону ", 
    text2 : ". Наши специалисты с превеликой радостью ответят на все ваши вопросы.",
    tel: "+7(495) 322-22-33"
}

const useStyle = makeStyles (theme => ({
    icon: {
        overflow: "visible"
    },
    text: {
        textTransform: "uppercase"
    },
    border: props => props.page_id != 0 ? {
        border: "solid",
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
        borderRadius: 15,
        boxShadow: theme.shadows[2]
    }: {},
    item: {
        padding: theme.spacing(2)
      }, 
    subitem: {
        padding: theme.spacing(1)
      },
    header: {
        padding: theme.spacing(5),  
    },
    alignButton: {
        marginTop: theme.spacing(5)
    },
    colorTel: {
        color: theme.palette.secondary.main
    },
    background: {
        backgroundColor: theme.palette.primary.main,
        width: "70%",
        marginBottom: theme.spacing(2)
    }
    

}));


export default function FormWithHeader(props) {
    
    const {className, id} = props
    const iconStyle = useStyle(props)
    const [openSnack,setOpenSnack] = useState(false)
    const [message, setMessage] = useState(0)
                                       
    return(
    
        
        <>  
        <Grid container  direction="column" alignItems="center" className={`${className} ${iconStyle.border}`}>
                <Grid item className={iconStyle.header}>
                    <Typography variant="h4" className={iconStyle.text} align="center">
                        {form.header}
                    </Typography>
                </Grid>
                <Grid item className={iconStyle.item}>
                    <Typography variant="h6" align="justify">
                        {form.text1} <span className={iconStyle.colorTel}> {form.tel}</span> {form.text2}
                    </Typography>
                </Grid>
                <Grid  item className={`${iconStyle.item} ${iconStyle.background}`}>
                    <Form id={id} onOpen={setOpenSnack} onMessage={setMessage}/>
                </Grid>
        </Grid>
        <MySnack open={openSnack} message={message} setOpenSnack={setOpenSnack} />
        </>
            
            
        
   
    );
}
