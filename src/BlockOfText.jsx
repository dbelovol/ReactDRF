import React, {useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {makeBlockSelector} from './Utils/Selectors.jsx'
import {useSelector} from 'react-redux'


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
        padding: theme.spacing(2)
    },
    header: {
        padding: theme.spacing(5),  
    }

}));

export default function BlockOfText(props) {
    
    /* Данный компонент выводит параграф с переменным числом абзацев
     */
    
    const {className, id} = props
    const iconStyle = useStyle(props)
    const textDataSelector= useMemo (
      makeBlockSelector, 
      []
    )
    const textData =  useSelector (state => 
        textDataSelector(state, {id: id, type: "text_blocks"})
      )
    
    return(
    
        
            <Grid container  direction="column" alignItems="center" className={`${className} ${iconStyle.border}`}>
            <Grid item className={iconStyle.header}>
                <Typography variant="h4" className={`${iconStyle.text}`} align="center">
                    {textData.header}
                </Typography>
            </Grid>
            <Grid item container direction="column" alignItems="center">
            {textData.paragraphs.map((image,index) => (
                <Grid item key={index} className={iconStyle.subitem}>
                        <Typography variant="body1" align="justify">
                            {image.text}
                        </Typography>
                 </Grid>
                
                ))}
            </Grid>
            </Grid>
        
   
    );
}
        
