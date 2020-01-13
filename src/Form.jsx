import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const initFormState = {
    telField: {error: false},
    nameField: {error: false},
    familyField: {error: false},
    mailField: {error: false},
    messageField: {error: false},
}


export default function Form(props) {
    const [submitData, handleSubmit] = useState(initFormState)
    const [resetForm, handleResetForm] = useState(1)
    
    const {mode, onSend, onOpen, onMessage, id} = props
    
    
    const eventHandler = (e) =>{
        e.preventDefault();
        if (!submitData.telField.value || !submitData.nameField.value) {
            handleSubmit(state => ({...state, telField:{error: true}, nameField:{error: true}   
            }))
            console.log("НЕОТПРАВКА", submitData) 
        } else {
            if (!Object.entries(submitData).reduce((res, [key, value]) => value.error || res, false)){
            fetch ("http://localhost:8000/email/", 
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                             'Accept': 'application/json',
                            // 'Access-Control-Request-Headers': 'Content-Type, Accept'
                        },
                        mode: 'cors',
                        body: JSON.stringify(submitData)
                    }
            ).
            then(response => {onMessage(0); onOpen(true)}, reject =>{{onMessage(1); onOpen(true)}}).
            then(voiddata => {
                if (resetForm == 1) {
                    handleResetForm(2)
                } else {
                    handleResetForm(1)
                }
                handleSubmit(initFormState)
                // console.log("РЕСЕТ ФОРМЫ ПОСЛЕ ОТПРАВКИ", submitData, initFormState)
                if (onSend) {
                    onSend(false)
                }      
             })

    
        }}
        // return (
        // // handleSubmit (submitData.name == "default"? {name: "working"} : {name: "default"})
        // )
    }

    const handleBlur =(e) => {
        console.log("SUBMITDATA",e.target, e.target.validity.valid)
        const valid = e.target.validity.valid
        const target = e.target.id
        const value = e.target.value
        if (!valid){
            handleSubmit (state => ({...state, [target]: {value: value, error: true}}))
            console.log("SUBMITDATA",submitData)
        } else {
            handleSubmit (state => ({...state, [target]: {value: value, error: false}}))
            console.log("SUBMITDATA",submitData)
        }
        
    }

    const handleChange =(e) => {
        console.log("SUBMITDATA",e.target, e.target.validity.valid)
        const valid = e.target.validity.valid
        const target = e.target.id
        
        const value = e.target.value
        if (valid){
            handleSubmit (state => ({...state, [target]: {value: value, error: false}}))
            console.log("SUBMITDATA",submitData)
        } 
        
    }

    

    return(
    
        <form onSubmit={eventHandler} noValidate key={resetForm}>
        <Grid container direction="column"   > 
            <Grid container direction={mode? "row":"column"} justify="space-between">
            <Grid item >
                <TextField
                error = {submitData.nameField.error}
                id="nameField"
                label={submitData.nameField.error ? "Ошибка": "Ваше имя"}
                placeholder=""
                helperText={submitData.nameField.error ?"Только буквы и пробелы" :"Обязательный параметр"}
                fullWidth
                margin="normal"
                required
                inputProps={{pattern: "[A-Za-zА-Яа-я ]+", onBlur: handleBlur}}
                onChange={handleChange}
                size="small"
                />
            </Grid>
            <Grid item >
                <TextField
                error = {submitData.familyField.error}
                id="familyField"
                label={submitData.familyField.error ? "Ошибка": "Ваша фамилия"}
                placeholder=""
                helperText={submitData.familyField.error ?"Только буквы и пробелы" :"Необязательный параметр"}
                fullWidth
                margin="normal"
                inputProps={{pattern: "[A-Za-zА-Яа-я ]+", onBlur: handleBlur}}
                onChange={handleChange}
                size="small"
                />
            </Grid>
            </Grid>
            <Grid container direction={mode? "row":"column"} justify="space-between">
            <Grid item >
                <TextField
                error = {submitData.telField.error}
                id="telField"
                label={submitData.telField.error ? "Ошибка": "Ваш телефон"}
                placeholder="+7XXXXXXXXXX"
                // defaultValue = "+7(926) 222-33-22"
                // value = {submitData.telField.value} 
                helperText={submitData.telField.error ? "+7 и десять циф без пробела":"Пожалуйста вводите в вышеуказанном формате"}
                fullWidth
                margin="normal"
                required
                onChange={handleChange}
                inputProps={{pattern: "[+]7[0-9]{10}", onBlur: handleBlur}}
                size="small"
                // pattern="[+]7[0-9]{10}"
                />
            </Grid>
            <Grid item  >
                <TextField
                error = {submitData.mailField.error}
                id="mailField"
                label={submitData.mailField.error ? "Ошибка": "Ваша почта"}
                placeholder=""
                helperText="Необязательный параметр"
                fullWidth
                margin="normal"
                inputProps={{pattern: "[A-Za-z0-9_-]+@[A-Za-z0-9_-]+[\.][a-z][a-z][a-z]?", onBlur: handleBlur}}
                onChange={handleChange}
                size="small"
                />
            </Grid>
            </Grid>
            <Grid item >
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
                size="small"
                />
            </Grid>
            <Grid item  container direction="column" alignItems="center" >
                <Grid item >
                    <Button type="submit" variant="contained" color="secondary">
                        Отправить
                    </Button>
                </Grid>
            </Grid>       
        </Grid>
        </form>
        
                
    );
}