import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    border: {
        border: "solid",
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
        borderRadius: 15,
        boxShadow: theme.shadows[2]
    },
    alignButton: {
        marginTop: theme.spacing(5)
    },
    colorTel: {
        color: theme.palette.secondary.main
    },
    

}));


export default function FormWithHeader(props) {
    
    const {className} = props
    const iconStyle = useStyle()
    const [submitData, handleSubmit] = useState({
        name: "default"
    })
    
    const eventHandler = (e) =>{
        e.preventDefault();
        return (
        handleSubmit (submitData.name == "default"? {name: "working"} : {name: "default"})
        )
    }
                                                 
    return(
    
        
           
        <Grid container  justify="center" spacing={8} className={`${className} ${iconStyle.border}`}>
                <Grid item xs={12}>
                    <Typography variant="h4" className={iconStyle.text} align="center">
                        {form.header}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={eventHandler}>
                    <Grid container justify="center"> 
                        <Grid item xs={12}>
                            <Typography variant="h6" align="justify">
                                {form.text1} <span className={iconStyle.colorTel}> {form.tel}</span> {form.text2}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                            id="name-field"
                            label="Ваше имя"
                            placeholder=""
                            helperText="Обязательный параметр"
                            fullWidth
                            margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                            id="family-field"
                            label="Ваша фамилия"
                            placeholder=""
                            helperText="Необязательный параметр"
                            fullWidth
                            margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                            id="tel-field"
                            label="Ваш телефон"
                            placeholder="+7(XXX)XXX-XX-XX"
                            helperText="Пожалуйста вводите в вышеуказанном формате"
                            fullWidth
                            margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                            id="mail-field"
                            label="Ваша почта"
                            placeholder=""
                            helperText="Необязательный параметр"
                            fullWidth
                            margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                            id="message-field"
                            label="Ваше сообщение"
                            placeholder="Опишите кратко, что вы хотите нам поручить"
                            helperText="Необязательный параметр"
                            multiline
                            rows="4"
                            fullWidth
                            margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} className={iconStyle.alignButton} container direction="column" alignItems="center" >
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="secondary">
                                    Отправить
                                </Button>
                            </Grid>
                        </Grid>       
                    </Grid>
                    </form>
                </Grid>
        </Grid>
            
            
        
   
    );
}
