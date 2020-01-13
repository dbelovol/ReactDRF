import React,{useState, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom';
import {createSelector} from 'reselect'
import MyPopper from './Popper.jsx'
import Grid from '@material-ui/core/Grid'
import {makeToolbarEntries} from './Utils/Selectors.jsx'


const appBarStaticStyles = makeStyles (theme => ({
    element: {
        padding: theme.spacing(3)
    }
    }));
// // const selectEntries = state =>
// //     state.tree[0].childs.map(elem => ({
// //         id: elem, 
// //         onCurrentPath: elem == state.tree[0].current,
// //         isCurrent: elem == state.currentPage,
// //         name: state.pages[elem].header,
// //         hasChilds: state.tree[elem].hasOwnProperty('childs'),
// //         url: React.forwardRef((itemProps, ref) => {
// //             return (
// //                 <RouterLink to={state.pages[elem].url} {...itemProps} innerRef={ref}/>
// //             )})
// //         }))

// // const selectToolbarEntries = createSelector (
// //     selectEntries,
// //     entries => entries

// )


export default function MainToolBar (props) {

    const { typProps, page} = props
    const classes = appBarStaticStyles()
    const textDataSelector= useMemo (
        makeToolbarEntries, 
        []
      )
      const toolBarEntries =  useSelector (state => 
          textDataSelector(state, 0)
        )
    // const toolBarEntries = useSelector (selectToolbarEntries)
    const [target, setTarget]=useState({anchorEl: document.window, hovered: false})
    
    return(
        <>
        <MyPopper   
            open={target.hovered}  
            key={page} anchorEl={target.anchorEl} 
            transition 
            mouseOver={(e) => setTarget(prevState => ({hovered: true, anchorEl: prevState.anchorEl}))}
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