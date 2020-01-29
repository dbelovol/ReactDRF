import React,{useState, useMemo, useEffect} from 'react';
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
    // const [target, setTarget]=useState({anchorEl: __isBrowser__ ? document.window : "", hovered: false})
    const [target, setTarget] = useState(
        toolBarEntries.map(
            entry => ({[entry.id]:{anchorEl:  React.createRef(), hovered: false}})
        ).reduce((acc, curr) => ({...acc, ...curr}), {})
    )
    

    return(
        <>
        { toolBarEntries.map( entry => 
        <MyPopper   
            open={target[entry.id].hovered}
            id ={entry.id}  
            key={entry.id} anchorEl={target[entry.id].anchorEl} 
            mouseOver={() => setTarget(prevState => 
                ({...prevState, [entry.id]: {hovered: true, anchorEl: prevState[entry.id].anchorEl}}))}
            mouseOut={() => setTarget(prevState => 
                ({...prevState, [entry.id]: {hovered: false, anchorEl: prevState[entry.id].anchorEl}}))}
        />
        )}
        <Grid container alignItems="center" direction="column">
            <Grid item xs={12}>
            <Toolbar className={classes.root}>
                {
                    toolBarEntries.map( entry =>
                        <Button 
                            variant={entry.onCurrentPath || entry.isCurrent ? "outlined": "text"}
                            entryid={entry.id}
                            key={entry.id}
                            ref = {target[entry.id].anchorEl}
                            component={entry.isCurrent? "button": entry.url}
                            className={classes.element}
                            onMouseOver={(e) => setTarget( prevState =>
                                ({...prevState, [entry.id]: {hovered: entry.hasChilds, anchorEl: prevState[entry.id].anchorEl.current}}))}
                            onMouseOut={(e) => setTarget(prevState=> 
                                ({...prevState, [entry.id]: {hovered: false, anchorEl: prevState[entry.id].anchorEl.current}}))}
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