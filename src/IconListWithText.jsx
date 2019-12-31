import React, {useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles';
import {makeBlockSelector} from './Utils/Selectors'
import {useSelector} from 'react-redux'



const useStyle = makeStyles ( theme=> ({
    icon: {
        overflow: "visible"
    },
    text: {
        textTransform: "uppercase"
    },
    item: {
      padding: theme.spacing(1)
    }, 
    subitem: {
      padding: theme.spacing(1)
    },
    header: {
      padding: theme.spacing(2),
      marginRight: -theme.spacing(1) 
    }

}));

export default function IconListWithText(props) {

    /* Данная функция формирует список иконок с подписью под ними
     * Иконки с подписями помещаются в контейнер на белом (бумажном) фоне
     * Максимальная ширина контейнера - 1200 px.
     * Заголовок центрируется по ширин
     */
    const {className, side, id} = props
    const iconStyle = useStyle()
    // const position = "U"
    const iconDataSelector= useMemo (
      makeBlockSelector, 
      []
    )
    const iconData =  useSelector (state => 
        iconDataSelector(state, {id: id, type: "icon_blocks"})
      )
    console.log(iconData)
    return(
    
        
            <Grid container  alignItems="center"  direction="column" className={className}>
            <Grid item  className={iconStyle.header }>
                <Typography variant="h4" className={iconStyle.text} align="center">
                    {iconData.header}
                </Typography>
            </Grid>
            <Grid item container> 
            {iconData.icons.map(image => (
                <Grid item 
                  className={iconStyle.item } 
                  container 
                  xs={12} md={6} lg={4}  
                  direction= {iconData.position == "S"? "row": "column"} 
                  alignItems="center" 
                  justify="flex-start"
                  key={image.header}
                >
                    {iconData.position == "S"?  
                    <>
                    <Grid item xs={4} className={iconStyle.subitem }>
                      <Typography variant="h3" align="center" className={iconStyle.text} color="secondary">
                          <FontAwesomeIcon icon={image.name.trim().split(/\s+/)}/>
                      </Typography>    
                    </Grid>
                    <Grid item xs={8 } className={iconStyle.subitem }>
                        <Typography variant="body1" align="center" className={iconStyle.text}>
                            {image.header}
                        </Typography>
                    </Grid>
                    </>:
                    <>
                    <Grid item className={iconStyle.subitem }>
                      <Typography variant="h3" align="center" className={iconStyle.text} color="secondary">
                        <FontAwesomeIcon icon={image.name.trim().split(/\s+/)}/>
                      </Typography>    
                    </Grid>
                    <Grid item  className={iconStyle.subitem }>
                      <Typography variant="body1" align="center" className={iconStyle.text}>
                          {image.header}
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
        
