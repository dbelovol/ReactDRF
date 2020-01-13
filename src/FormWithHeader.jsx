import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
        backgroundColor: theme.palette.primary.light,
        width: "70%",
        marginBottom: theme.spacing(2)
    }
    

}));


export default function FormWithHeader(props) {
    
    const {className, id} = props
    const iconStyle = useStyle(props)
    const [openSnack,setOpenSnack] = useState(false)
    const [message, setMessage] = useState(0)
    // const patt = "[A-Za-zА-Яа-я ]+"
    // const [submitData, handleSubmit] = useState({
    //     telField: {error: false},
    //     nameField: {error: false},
    //     familyField: {error: false},
    //     mailField: {error: false},
    //     messageField: {error: false},

    // })
    
    // const eventHandler = (e) =>{
    //     e.preventDefault();
    //     if (!submitData.telField.value || !submitData.nameField.value) {
    //         handleSubmit(state => ({...state, telField:{error: true}, nameField:{error: true}   
    //         }))
    //         console.log("НЕОТПРАВКА", submitData) 
    //     } else {
    //         fetch ("http://localhost:8000/email/", 
    //                 {
    //                     method: "POST",
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                          'Accept': 'application/json',
    //                         // 'Access-Control-Request-Headers': 'Content-Type, Accept'
    //                     },
    //                     mode: 'cors',
    //                     body: JSON.stringify(submitData)
    //                 }
    //         ).
    //         then(response => response.json()).
    //         then (json => console.log(json))

    
    //     }
    //     // return (
    //     // // handleSubmit (submitData.name == "default"? {name: "working"} : {name: "default"})
    //     // )
    // }

    // const handleBlur =(e) => {
    //     console.log("SUBMITDATA",e.target, e.target.validity.valid)
    //     const valid = e.target.validity.valid
    //     const target = e.target.id
    //     const value = e.target.value
    //     if (!valid){
    //         handleSubmit (state => ({...state, [target]: {value: value, error: true}}))
    //         console.log("SUBMITDATA",submitData)
    //     } else {
    //         handleSubmit (state => ({...state, [target]: {value: value, error: false}}))
    //         console.log("SUBMITDATA",submitData)
    //     }
        
    // }

    // const handleChange =(e) => {
    //     console.log("SUBMITDATA",e.target, e.target.validity.valid)
    //     const valid = e.target.validity.valid
    //     const target = e.target.id
        
    //     const value = e.target.value
    //     if (valid){
    //         handleSubmit (state => ({...state, [target]: {value: value, error: false}}))
    //         console.log("SUBMITDATA",submitData)
    //     } 
        
    // }
                                                 
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
                    {/* <form onSubmit={eventHandler} noValidate>
                    <Grid container direction="column"   > 
                        
                        <Grid item >
                            <TextField
                            error = {submitData.nameField.error}
                            id="nameField"
                            label={submitData.nameField.error ? "Ошибка. Повторите пожалуйста ввод": "Ваше имя"}
                            placeholder=""
                            helperText={submitData.nameField.error ?"Только буквы и пробелы" :"Обязательный параметр"}
                            fullWidth
                            margin="normal"
                            required
                            inputProps={{pattern: "[A-Za-zА-Яа-я ]+", onBlur: handleBlur}}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                            error = {submitData.familyField.error}
                            id="familyField"
                            label={submitData.familyField.error ? "Ошибка. Повторите пожалуйста ввод": "Ваша фамилия"}
                            placeholder=""
                            helperText={submitData.familyField.error ?"Только буквы и пробелы" :"Необязательный параметр"}
                            fullWidth
                            margin="normal"
                            inputProps={{pattern: "[A-Za-zА-Яа-я ]+", onBlur: handleBlur}}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                            error = {submitData.telField.error}
                            id="telField"
                            label={submitData.telField.error ? "Ошибка. Повторите пожалуйста ввод": "Ваш телефон"}
                            placeholder="+7XXXXXXXXXX"
                            // defaultValue = "+7(926) 222-33-22"
                            // value = {submitData.telField.value} 
                            helperText={submitData.telField.error ? "+ и десять циф без пробела":"Пожалуйста вводите в вышеуказанном формате"}
                            fullWidth
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputProps={{pattern: "[+]7[0-9]{10}", onBlur: handleBlur}}
                            // pattern="[+]7[0-9]{10}"
                            />
                        </Grid>
                        <Grid item item >
                            <TextField
                            error = {submitData.mailField.error}
                            id="mailField"
                            label={submitData.mailField.error ? "Ошибка. Повторите пожалуйста ввод": "Ваша почта"}
                            placeholder=""
                            helperText="Необязательный параметр"
                            fullWidth
                            margin="normal"
                            inputProps={{pattern: "[A-Za-z0-9_-]+@[A-Za-z0-9_-]+[\.][a-z][a-z][a-z]?", onBlur: handleBlur}}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item item>
                            <TextField
                            id="messageField"
                            label="Ваше сообщение"
                            placeholder="Опишите кратко, что вы хотите нам поручить"
                            helperText="Необязательный параметр"
                            multiline
                            rows="4"
                            fullWidth
                            margin="normal"
                            inputProps={{onBlur: handleBlur}}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item  className={iconStyle.alignButton} container direction="column" alignItems="center" >
                            <Grid item >
                                <Button type="submit" variant="contained" color="secondary">
                                    Отправить
                                </Button>
                            </Grid>
                        </Grid>       
                    </Grid>
                    </form> */}
                </Grid>
        </Grid>
        <MySnack open={openSnack} message={message} setOpenSnack={setOpenSnack} />
        </>
            
            
        
   
    );
}
