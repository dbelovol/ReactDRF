import React, {useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {makeBlockSelector} from './Utils/Selectors'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyle = makeStyles (theme => ({
    text: {
        textTransform: "uppercase"
    },
    border: props => props.page_id != 0 ? {
        border: "solid",
        borderWidth: 1,
        borderColor: theme.palette.secondary.main,
        borderRadius: 15,
        boxShadow: theme.shadows[2]
    }: {},
    item: {
        padding: theme.spacing(2),
    }, 
    subitem: {
        padding: theme.spacing(1)
    },
    header: {
        padding: theme.spacing(5),
        color: theme.palette.secondary.main  
    }

}));

export default function Offer(props){

    const {className, id} = props
    const iconStyle = useStyle(props)
    const offerDataSelector= useMemo (
      makeBlockSelector, 
      []
    )
    const offerData =  useSelector (state => 
        offerDataSelector(state, {id: id, type: "offer"})
      )

return(
    
        
    <Grid container   alignItems="center" justify="space-between" className={`${className} ${iconStyle.border}`}>
    <Grid item xs={3} className={iconStyle.header}>
        <Typography variant="h4" className={`${iconStyle.text}`} align="center" color="secondary">
            {offerData.value}
            {offerData.measure.search(/[Рр]уб\.?/) != -1 ?
                <FontAwesomeIcon icon={['fas', 'ruble-sign']}/> : ""}
            {offerData.measure.replace(/[Рр]уб\.?/, "")}
        </Typography>
    </Grid>
    <Grid item container xs={9} className={iconStyle.item} direction="column" alignItems="stretch" justify="center">
        <Grid item className={iconStyle.subitem}>
                <Typography variant="h4" color="secondary" align="left" className={`${iconStyle.text}`}>
                    {offerData.header}
                </Typography>
        </Grid>
        <Grid item className={iconStyle.subitem}>
                <Typography variant="body1"  align="justify" >
                    {offerData.text}
                </Typography>
        </Grid>
        
        
    </Grid>
    </Grid>


)
}