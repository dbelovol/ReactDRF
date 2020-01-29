import React, {useState, useEffect} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import InfoToolBar from './InfoToolBar.jsx'
import MainToolBar from './MainToolBar.jsx'

/* Стили для AppBar. Идея в том, чтобы при листании в момент, когда пролистали
 * до позиции, заданной в кастомном хуке useScrollTransform (threshold), ПЛАВНО
 * (задается в transition) менялась высота AppBar и стили надписей:
 * На прозрачном AppBar - черный, на цветном - белый 
 */ 
const appBarDynamicStyles = makeStyles (theme => ({
    colorStyle: {
        height: props => props.heightProps.smallHeight,
        display: "flex",                // Этот и следующий параметры ВАЖНЫ. Без них надпись не 
        justifyContent: "center",       // центрируется в изменяющем ширину AppBar по высоте!!
        backgroundColor: "transparent",
        transition: "all 1s",
        
    },
    colorStyle_1: {
        height: props => props.heightProps.bigHeight,
        display: "flex",
        justifyContent: "center",
        transition: "all 1s",
    
    },
    transparent: {
        color: props => props.page == 0 ? theme.palette.common.black : theme.palette.secondary.light,
        transition: "all 1s",
    },
    colored: {
        color: theme.palette.common.white,
        transition: "all 1s",
    },
    
}));


function useScrollTransform (trigger, page) {
    /* Кастомный хук, переключающий стили Appbar при достижении вертикального
     * смещения элемента main_page_parallax величины threshold. 
     */
    
    // Создание стилей фона и текста Appbar
    const heightProps = {smallHeight: 80, bigHeight: 90}
    const textStyles = appBarDynamicStyles({heightProps, page})
    
    /* Выбор активного набора стилей по значению триггера
     * Смысл - часть стилей задается через props AppBar
     * часть - задается  в deep nested children в лоб,
     * через значение prop className. Это делается так потому,
     * что не все нужные стили можно задать через dedicated
     * props AppBar. В частности - нельзя переопределить
     * стиль текста в deep nested child
     * Очень важно понимать (я не сразу всосал), что в classes
     * нужно указывать не css, а ИМЯ СГЕНЕРИРОВАННОГО СТИЛЯ   
     */
    const triggerProps = trigger ? {
        appProps: {
            elevation: 4,
            color: "secondary",
            classes: {
                colorSecondary: textStyles.colorStyle_1 // Стиль, применяемый при значении prop color=primary
                },
            },
        typProps: {
            className: textStyles.colored,
            },
        typPropsBott: {
            className: textStyles.bottomText, // Стиль надписей подвала
            },    
    } : {
        appProps: {
            elevation: 0,
            color: "primary",
            classes: {
                colorPrimary: textStyles.colorStyle  // Стиль, применяемый при значении prop color=secondary
                },
            },
        typProps: {
            className: textStyles.transparent,
            },
    }
    return triggerProps
}
   
export default function MainAppBar(props) {
    // Компонент, рендерящий ToolBar
    //Хук, переключающий цвет фона и шрифта заголовка в процессе scrolla компонента
    // const elem = document.getElementById("main_page_parallax")
    const [elem, setElem] = useState(__isBrowser__ ? window : "")
    const trigger = useScrollTrigger({
                        disableHysteresis: true,
                        target: elem ,
                        threshold: 80,
                        });
    
    const {appProps, typProps} = useScrollTransform(trigger, props.page)
    // console.log("!!!ЭЛЕМЕНТ!!!!", elem)
   
    /*
     * Это надо, чтобы передернуть хук useScrollTransform выше.
     * При первом рендеринге он выполняется ДО ТОГО, как отрендерится
     * элемент с id="main_page_parallax", scroll- позиция которого
     * отслеживается этим хуком. useEffect ниже выполняется ОДНАЖДЫ
     * и меняет состояние компонента. Это вызывает его перерендеривание
     * но в этот раз элемент id="main_page_parallax" уже есть в DOM, так что 
     * EventListener вышеупомянутого хука добавляется корректно
     */ 
    useEffect(() => {
        if (__isBrowser__) {
            setElem(document.getElementById("main_page_parallax"))
    }}, []);
    

    return (
    /*Полоска AppBar*/
        <AppBar {...appProps} position={props.position}>
        <Container fixed maxWidth="lg" >
            {
                !trigger ?
            <InfoToolBar page={props.page} typProps={typProps}/> :
            <MainToolBar page={props.page} typProps={typProps}/>  
            }
        </Container>
        </AppBar>
        )
}