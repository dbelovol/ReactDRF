import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Link as RouterLink} from 'react-router-dom';
import {pageHeaderPrepare} from './Utils/Selectors.jsx';
import {HeaderContent} from './HeaderInfo.jsx'
 



const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor:  theme.palette.primary.light,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    imageSrc: {
       position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: theme.spacing(1),
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        
      },
    filter: {
      
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, // цвет фильтра
        opacity: "0.95",
        position: "absolute",
        zIndex: theme.zIndex.appBar+1,
        margin: theme.spacing(1),
        display: "flex",
        padding: theme.spacing(2),
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        // content: "''"
      
    }
  }));


export default function RenderPage ({page}){

    const classes = useStyles()
    function parse(state,node,baseNode) {
        if (state.tree[node].childs) {
            return(
                <List key={node} className={node==0 ? classes.root : classes.nested}>
                    <ListItem 
                        button
                        key={node}
                        nodeid={node}
                        onMouseOver={(e) => setHovered({
                            ...hovered,
                            picture: state.pages[e.currentTarget.getAttribute('nodeid')].picture,
                            pageInfo: pageHeaderPrepare(state, e.currentTarget.getAttribute('nodeid'))
                        })}
                        onMouseOut={(e) => setHovered( prevState => prevState)}
                        component={node==state.currentPage ? "button" : RouterLink}
                        to={node==state.currentPage ? "": state.pages[node].url}
                        selected={node==state.currentPage || node == state.tree[state.tree[node].parent].current}    
                    >
                        <ListItemText primary={state.pages[node].header}/>
                        {node != baseNode ?
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={()=> setCollapse({ ...collapsed, [node]: !collapsed[node] })}>
                                {collapsed[node] ? <ExpandLess/>:<ExpandMore/>}
                            </IconButton>
                        </ListItemSecondaryAction> :
                        ""
                        }   
                    </ListItem>
                    
                    <Collapse in={collapsed[node]} timeout="auto" unmountOnExit>
                            {state.tree[node].childs.map(child =>
                                 parse(state,child,baseNode))}
                    </Collapse>
                </List>)
        }
        else {
            return(
                <List key={node} className={node==0 ? classes.root : classes.nested}>
                <ListItem 
                    button
                    key={node}
                    nodeid={node}
                    onMouseOver={(e) => setHovered({
                        ...hovered,
                        picture: state.pages[e.currentTarget.getAttribute('nodeid')].picture,
                        pageInfo: pageHeaderPrepare(state, e.currentTarget.getAttribute('nodeid'))
                    })}
                    onMouseOut={(e) => setHovered( prevState => prevState)}
                    component={node==state.currentPage ? "button" : RouterLink}
                    to={node==state.currentPage ? "": state.pages[node].url}
                    selected={node==state.currentPage || node == state.tree[state.tree[node].parent].current}   
                > 
                    <ListItemText primary={state.pages[node].header} />
                </ListItem>
                </List>)
        }
    }
    const [collapsed, setCollapse]=useState(useSelector(state => {
        let arrayCollapse = {}
        for (const [key,item] of Object.entries(state.tree)) {
            if (item.childs) {
                arrayCollapse[key] = false
            }
        }
        for (const key of state.tree[0].childs.values()){
            arrayCollapse[key] = true 
        }
        console.log(arrayCollapse)
        return arrayCollapse
    }))
    //Селектор срабатывает при изменении свойства page
    //Фактически задает начальное знаение для содержимого POPPER
    const curPicture = useSelector(state=> ({
                                    picture: state.pages[page].picture, 
                                    id: page,
                                     pageInfo: pageHeaderPrepare(state,page)
                                }))
    const [hovered, setHovered] = useState(curPicture)
    // При наведении мыши ВНУТРИ поппера срабатывает setHovered. То есть 
    // выводится то, чо хранится в hovered
    // При переключении page в результате движения мыши инстанс POPPER не меняется
    // а значит перенинициализации hovered НЕ ПРОИЗОЙДЕТ. Для этого используется useEffect
    // Иными словами, он нужен для корректной переинициализации hovered при ИЗМЕНЕНИИ ref
    // POPPER
    useEffect(()=> setHovered(prevState => prevState.id != curPicture.id ? 
          curPicture: prevState
     ))
    const result = useSelector(state => parse(state,page,page))
      
        
    return (
    <Grid container >
        <Grid item xs={5} className={classes.root} style={{height: "50vh", overflowY: "auto"}}>
            {result}
        </Grid>
        <Grid item xs={7} className={classes.root} style={{position: "relative"}}>
            <Paper
                className={classes.imageSrc}
                style={{
                     backgroundImage: `url(${hovered.picture})`,
                }}
            >
            </Paper>
            
            <div className={classes.filter}>
                {/* Очень важно, чтобы было установлено свойство display = flex */}
                 <HeaderContent page={1} mode="" pageInfo={hovered.pageInfo} /> 
            </div>
        </Grid>
    </Grid>
    )
}
