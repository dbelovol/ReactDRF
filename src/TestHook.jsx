/*!
=========================================================
* Material Kit React - v1.7.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-kit-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect, useState } from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useWindowSize} from './Utils/useWindowSize';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {useSelector} from 'react-redux' 


//Статические картинки параллаксов
// import FooterImage from './Assets/IMG/TMK/Footer13.jpg'

//Мои компоненты
import FormWithHeader from './FormWithHeader.jsx'
import FooterContent from './FooterContent.jsx'
import MainAppBar from './MainAppBar.jsx'
import HeaderInfo from './HeaderInfo.jsx'
import BreadCrumbs from './BreadCrumb.jsx'
import {blocksForPageSelector} from './Utils/Selectors.jsx'
import BlocksRenderer from './BlocksRenderer.jsx'

                    
/* Хук для задания стилей картинки параллакса в подвале страницы, а также набор вспомогательных
 * стилей к странице в целом 
 */

const useTransparent_1 = makeStyles(theme => ({

    //----------------------------Стили для параллакса в подвале------------------------//
    imgBott: {
        minHeight: "90vh",
        overflow: "hidden",

        backgroundPosition: "center top",
        backgroundSize: "100%",
        backgroundRepeat: "repeat-y",
        [theme.breakpoints.down('sm')]: {
            backgroundSize: "100%",
            backgroundPosition: "right bottom",

        },
        margin: "0",
        padding: "0",
        border: "0",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    filterBott: {    // фильтр практически такой же, так что меняется только прозрачность. Надо было поконтрастнее
        "&:before": {
            opacity: "0.7",
            background: theme.palette.grey[400]
        },
        "&:after,&:before": {
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "block",
            left: "0",
            top: "0",
            content: "''"
        }
    },
    //----------------------------------------------------------------------------------//    

    //----------Стиль для помещения содержимого подвала над фильтром картинки подвала--//
    message: {
        paddingTop: theme.spacing(8),
    },
    //----------------------------------------------------------------------------------//    

    //---Стиль для основного контейнера с содержимым страницы. Идея в том, чтобы ------//
    //---обеспечить наезжание на картинки параллакса в голове и подвале----------------//

    paper: {
        // padding: theme.spacing(1),
        //  marginTop: -theme.spacing(8),
        marginBottom: -theme.spacing(8),
        boxShadow: props => props.page == 0 ? theme.shadows[10]: "",
        // boxShadow: theme.shadows[10],
        // display: "block",
        padding: "24px"
    },
    //----------------------------------------------------------------------------------//    

    //---Стиль для разделения между кастомными компонентами, рендерящимися на странице--//    
    elements: {
        marginBottom: theme.spacing(2)
    },
    blocks: {
        padding: theme.spacing(1)
    },
    //----------------------------------------------------------------------------------//

    //-----------------------------------Стили параллакса-------------------------------//
    parallax: {// Неподвижное окно, через которое смотрим
        perspective: "1px",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
    },
    parallax__layer: {// Слой, в котором надо наложить картинку и текст, УБРАВ ПАРАЛЛАКС (overflow: "hidden")
        position: "relative",
        minHeight: "40vh",
        zIndex: 1,
        overflow: "hidden",
        transformStyle: "preserve-3d",
        marginTop: theme.spacing(-2)
    },
    parallax__layer_top: {// Слой, в котором надо наложить картинку и текст, СОХРАНИВ ПАРАЛЛАКС 
        position: "relative",
        minHeight: "40vh",
        // На главной странице картинка должна вылезать за границы
        // overflow: props => props.page==0 ? "": "hidden",
        zIndex: 1,
        transformStyle: "preserve-3d",
        marginTop: theme.spacing(-1),
        // marginBottom: theme.spacing(-6),
    },
    parallax__layer__base: {//Быстрый слой
        transform: "translateZ(0)",
        position: "relative",
        zIndex: 2
    },
    parallax__layer__back: {
        // Медленный слой
        // На главной странице картинка двигается медленно
        // На остальных - неподвижна
        transform: props => props.page == 0 ? "translateZ(-1px) scale(2.1)" : "translateZ(-100px) scale(112)",
        position: "relative",
        zIndex: 1,

    },
    parallax__layer__bott: {//Включение АБСОЛЮТНОГО позиционирования картинки
        position: "absolute",


    },
    //----------------------------------------------------------------------------------//
    bottomText: {
        color: theme.palette.grey[800],
        transition: "all 1s",
    },
}));

export default function ElevateAppBar(props) {

    /* Компонент, рендерящий страницу сайта
     */
    
    const [elem, setElem] = useState(__isBrowser__ ? window : "")
    // Кастомный хук, пригодный для использования в режиме SSR
    // На сервере вернет undefined
    const windowDims = useWindowSize()
    // Данный хук на сервере вернет "", что эквивалентно false, что и надо
    const pictureTrigger = useScrollTrigger({
        disableHysteresis: true,
        target: elem ,
        threshold: windowDims.height*1.5,
    }) 
    
    // При первом рендеринге элемента main_page_parallax в DOM нет
    // Поэтому после рендернига мы выполняем ОДНАЖДЫ этот хук
    // Цель - прикрепить useScrollTrigger к содержимому main_page_parallax
    //  а не к window
    useEffect(() => {
        if (__isBrowser__) {
            setElem(document.getElementById("main_page_parallax"))
            console.log("!!!!!!УСТАНАВЛИВАЕМ ССЫЛКУ НА ЭЛЕМЕНТ!!!!!")
    }}, []);



    /* Общие вещи по рендерингу.
     * Все содержимое, ЗА ИСКЛЮЧЕНИЕМ 
     * - Полоски AppBar
     * - Картинок  в голове и в подвале  
     * рендерится в контейнере, ширина которого
     * переключается скачкобразно при пересечении 
     * соответствующего breakpoint MediaQuery.
     * При этом максимальная ширина контейнера - lg
     */

    const imageStyles = useTransparent_1(props)
    const {page} = props
    const blockData = useSelector(blocksForPageSelector)
    const footerImageUrl = useSelector(state => Object.entries(state.glob_picts).find(([key,pict])=> pict.picture_name == 'footerpict')[1].picture)
    console.log("IMAGE URL",footerImageUrl)
    return (
        <React.Fragment>
            <CssBaseline />
            <MainAppBar position="fixed" page={props.page} />
            {/*Полоска AppBar
                * В данном компоненте параллакс реализован не с помощью EventListener,
                * а при помощи чистого css. Смысл в том, что на странице организуется
                * НЕПОДВИЖНЫЙ элемент id="main_page_parallax" высотой 100vh. Далее в нем задается
                * третье измерение - perspective. Далее все содержимое помещается внутрь этого
                * элемента на разном расстоянии по оси z. Те, чо ближе - двигаются быстрее, дальше - медленнее.
                */}

            <div className={imageStyles.parallax} id="main_page_parallax">
                <div className={imageStyles.parallax__layer_top}>
                    <HeaderInfo page={props.page} pictureTrigger={pictureTrigger}/>
                </div>
                {((id ) => {
                      const [Comp0, Comp1] = id == 0 ? [Container, Paper]: [Paper, Container]
                      const prop0 = id == 0 ? {fixed: true, maxWidth: "lg"}: {}
                      const prop1 = id != 0 ? {fixed: true, maxWidth: "lg"}: {}
                      return (
                        <Comp0  {...prop0}  className={imageStyles.parallax__layer__base}>
                        <Comp1 {...prop1}  className={imageStyles.paper}>
                        
                            <BreadCrumbs className={imageStyles.elements}/>
                            { blockData[1].length ? 
                                <Grid container alignItems="flex-start" >
                                    <Grid item xs={12} md={8} className={imageStyles.blocks}>
                                        <BlocksRenderer className={imageStyles.elements} page_id={id} data={blockData[0]} side={"L"}/>
                                    </Grid>
                                    <Grid item xs={12} md={4} className={imageStyles.blocks}>
                                        <BlocksRenderer className={imageStyles.elements} page_id={id} data={blockData[1]} side={"R"}/>
                                    </Grid>
                                </Grid>:
                                <BlocksRenderer className={imageStyles.elements} page_id={id} data={blockData[0]}/>
                            }
                            <FormWithHeader className={imageStyles.elements} page_id={id} />
                        </Comp1>
                    </Comp0>

                      )  
                })(page)}
                
                {/*Картинка подвала с содержимым
                От параллакса пришлось отказаться. Ведет себя неадекватно
                1. Если помещать в background и картинку, и текст, то тект оказывается
                увеличен и нечеток.
                2. Если помещать картинку в background, а текст в foreground, то 
                внизу образуется белая полоса (в Хроме). Как бороться - не понятно. 
                */}
                {/* position - relative. Это слой, в который помещаются и картинка, и текст
                Картинка позиционируется абсолютно, текст - относительно. 
                Это нужно, чтобы высота блока автоматически растягивалась при добавлении контента
                */}
                <div className={imageStyles.parallax__layer}>
                    <div
                        className={`${imageStyles.imgBott} ${imageStyles.filterBott} ${imageStyles.parallax__layer__base} ${imageStyles.parallax__layer__bott} `}
                        style={{ backgroundImage: "url(" + footerImageUrl + ")" }}
                    />
                    {/*Ссылки подвала */}
                    <FooterContent className={`${imageStyles.parallax__layer__base}  `} containerStyle={imageStyles.message} typProps={imageStyles.bottomText} />
                    {/*Картинка подвала с содержимым*/}
                </div>

            </div>
        </React.Fragment>
    );
}
