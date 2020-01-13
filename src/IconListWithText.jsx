import React, {useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles';
import {makeBlockSelector} from './Utils/Selectors.jsx'
import {useSelector} from 'react-redux'



const useStyle = makeStyles ( theme=> ({
    icon: {
        overflow: "visible"
    },
    text: {
        textTransform: "uppercase"
    },
    item: {
      padding: theme.spacing(2)
    }, 
    subitem: {
      padding: theme.spacing(1)
    },
    header: {
      padding: theme.spacing(5),
      // marginRight: -theme.spacing(1) 
    },
    border: props => props.page_id != 0 ? {
      border: "solid",
      borderWidth: 1,
      borderColor: theme.palette.primary.main,
      borderRadius: 15,
      boxShadow: theme.shadows[2]
    }: {},
    bodyToCaption: {
      fontSize: theme.typography.caption.fontSize
  },

}));

export default function IconListWithText(props) {

    /* Данная функция формирует список иконок с подписью под ними
     * Иконки с подписями помещаются в контейнер на белом (бумажном) фоне
     * Максимальная ширина контейнера - 1200 px.
     * Заголовок центрируется по ширин
     */
    const {className, side, id} = props
    const iconStyle = useStyle(props)
    // const position = "U"
    const iconDataSelector= useMemo (
      makeBlockSelector, 
      []
    )
    const iconData =  useSelector (state => 
        iconDataSelector(state, {id: id, type: "icon_blocks"})
      )
    console.log(iconData)
    const align = iconData.icons.length == 1 || side =="R" ? {xs:12}: 
                              (iconData.icons.length == 2 ? {xs:12, md:6}:{xs:12, md:6, lg:4} )
     
    return(
    
        
            <Grid container  alignItems="center"  direction="column" className={`${className} ${iconStyle.border}`}>
            <Grid item  className={iconStyle.header }>
                <Typography variant="h4" className={iconStyle.text} align="center">
                    {iconData.header}
                </Typography>
            </Grid>
            <Grid item container justify="center"> 
            {iconData.icons.map(image => (
                <Grid item key={image.id}
                  className={iconStyle.item } 
                  container 
                  {...align} 
                  direction= {iconData.position == "S"? "row": "column"} 
                  alignItems="center" 
                >
                    {iconData.position == "S"?  
                    <>
                    <Grid item xs={4} className={iconStyle.subitem }>
                      <Typography variant="h3" align="center" className={iconStyle.text} color={image.color}>
                          <FontAwesomeIcon icon={image.name.trim().split(/\s+/)}/>
                      </Typography>    
                    </Grid>
                    <Grid item container direction="column" alignItems="center" xs={8 } className={iconStyle.subitem }>
                        <Typography variant="h6" align="center" >
                            {image.header}
                        </Typography>
                        <Typography variant="body2" align="justify" classes={{body2: iconStyle.bodyToCaption}} >
                            {image.text}
                        </Typography>
                    </Grid>
                    </>:
                    <>
                    <Grid item className={iconStyle.subitem }>
                      <Typography variant="h3" align="center" className={iconStyle.text} color={image.color}>
                        <FontAwesomeIcon icon={image.name.trim().split(/\s+/)}/>
                      </Typography>    
                    </Grid>
                    <Grid item  className={iconStyle.subitem }>
                      <Typography variant="h6" align="center">
                          {image.header}
                      </Typography>
                      <Typography variant="body2" align="justify" classes={{body2: iconStyle.bodyToCaption}}>
                            {image.text}
                        </Typography>
                    </Grid>
                    </>
                  }
                </Grid>
                ))}
            </Grid>
            </Grid>
        
   
    );
}
        
