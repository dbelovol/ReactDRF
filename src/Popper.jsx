import React, {useState,} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import PopMenu from './RenderPage.jsx'

/*
 * Стили Popper, всплывающего при наведении мыши на AppBar
 * Имеются следующие тонкие моменты
 * 1. Стрелка, указывающая на объект под указателем мыши, задается при помощи объекта с НУЛЕВОЙ ВЫСОТОЙ И ШИРИНОЙ
 *  и ненулевыми границами.
 * 2. Мы должны сами создать стрелку, она должна быть ДОЧЕРНИМ ОБЪЕКТОМ Popper
 *  и мы должны передать ССЫЛКУ на этот объект в объект modifiers, ключ arrow, явлющийся Popper's prop!!
 * 3. Если не задать псевдоэлемент &before, то стрелка получается с черной точкой
 * 4. Popper получает объект, от которого он высплывает, при помощи ссылки anchorEl
 *    передаваемой ему как props.anchorEl 
 * 5. Popper добавяет к объекту anchorEl атрибут х-placement, значение которого задается
 *     свойством placement Popper. В нашем случае это bottom-start
 */ 

const popperStyles = makeStyles (theme=> ({
    popper:{
        position: "relative",
        zIndex: theme.zIndex.appBar+1,// Чтобы Popper был над AppBar
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            width: 0, 
            height: 0, 
            borderLeft: '1em solid transparent',
            borderRight: '1em solid transparent',
            borderBottom: `1em solid ${theme.palette.grey[200]}`,
            
            marginTop: "-0.9em",
    
            '&:before, &:after':{
                borderWidth: '0 ',
            }
        }
    },
        arrow: {
            position: "absolute",
            fontSize: "15px",
            width: "3em",
            height: "3em",

            '&:before': {
                content: '""',
                margin: "auto",
                display: "block",
                width: 0,
                height: 0,
                borderStyle: "solid",
            },       
        },
        paper: {
            backgroundColor: theme.palette.primary.light,
            width: "95vw",
            // height: "50vh",
            // overflowY: "hidden"
        }

    }));

export default function AppBarPopper (props) {
    
    const popStyles = popperStyles()
    const {open, anchorEl, mouseOver, mouseOut, id} = props
    const [arrowRef, setArrowRef]=useState(null) //stateHook , управляющий извлечением ссылки на стрелку
    
    return (
        <Popper  className={popStyles.popper} open={open}  anchorEl={anchorEl} transition onMouseOver={mouseOver}
        onMouseOut={mouseOut} placement="bottom-start" modifiers={{
                    flip: {
                      enabled: true,
                    },
                    arrow: {
                      enabled: true,
                      element: arrowRef,
                    }
                  }}>
                   {/*Popper принимает в качестве children функцию. Если Popper's props.transition=true
                      то Popper передает в эту функцию параметр - объект TransitionProps, задающий 
                      стандартные параметры для transition
                       */}
                    {({ TransitionProps }) => (
                            
                    <Fade {...TransitionProps} timeout={0}>
                        <div>
                             <Paper className={popStyles.paper}>
                                <PopMenu page={id}/>
                            </Paper>    
                            <span className={popStyles.arrow} ref={node=> setArrowRef(node)}/>
                        </div>
                    </Fade>   
                    )}     
        </Popper>
    )
}
