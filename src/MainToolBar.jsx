import React,{useState, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux'
import MyPopper from './Popper.jsx'
import Grid from '@material-ui/core/Grid'
import {makeToolbarEntries} from './Utils/Selectors.jsx'


const appBarStaticStyles = makeStyles (theme => ({
    element: {
        padding: theme.spacing(3)
    }
    }));


export default function MainToolBar (props) {

    // Компонент, рендерящий всплывающий ToolBar
    const { typProps, page} = props
    const classes = appBarStaticStyles()

    // Вызов factory, возвращающей селектор для выбора данных для вывода
    // выводятся ссылки на страницы первого уровня - дочерние стартовой

    const textDataSelector= useMemo (
        makeToolbarEntries, 
        []
      )
      const toolBarEntries =  useSelector (state => 
          textDataSelector(state, 0)
        )
    // const toolBarEntries = useSelector (selectToolbarEntries)
    const [target, setTarget]=useState({anchorEl: __isBrowser__ ? document.window : "", hovered: false})
    
    return(
        <>
        <MyPopper   
            open={target.hovered}  
            key={page} anchorEl={target.anchorEl} 
            transition 
            mouseOver={() => setTarget(prevState => ({hovered: true, anchorEl: prevState.anchorEl}))}
            mouseOut={() => setTarget(prevState => ({hovered: false, anchorEl: prevState.anchorEl}))}
        />
        <Grid container alignItems="center" direction="column">
            <Grid item xs={12}>
            <Toolbar className={classes.root}>
                {
                    toolBarEntries.map( entry =>
                        <Button 
                            variant={entry.onCurrentPath || entry.isCurrent ? "outlined": "text"}
                            entryid={entry.id}
                            key={entry.id}
                            component={entry.isCurrent? "button": entry.url}
                            className={classes.element}
                            onMouseOver={(e) => setTarget({
                                anchorEl: e.currentTarget, 
                                hovered: entry.hasChilds
                            })}
                            onMouseOut={(e) => setTarget(prevState=> ({hovered: false, anchorEl: prevState.anchorEl}))}
                            >
                            <Typography variant="body2" {...typProps} >{entry.name}</Typography>
                        </Button>
                        )
                }
            </Toolbar>
            </Grid>
        </Grid>
        </>
    )
    
}