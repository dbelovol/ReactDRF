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

import React,{useEffect, useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useWindowSize from '@rehooks/window-size';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

//Статические картинки параллаксов
import picture from './Assets/IMG/TMK/FrontWoman.jpg'
import FooterImage from './Assets/IMG/TMK/Footer13.jpg'

//Мои компоненты
import Button_base from './Butt_base.jsx'
import IconListWithText from './IconListWithText.jsx'
import AvatarList from './AvatarList.jsx'
import BlockOfText from './BlockOfText.jsx'
import FormWithHeader from './FormWithHeader.jsx'
import FooterContent from './FooterContent.jsx'
import MainAppBar from './MainAppBar.jsx'

    
/* Хук для задания стилей картинки параллакса в голове 
 * и подвале страницы, а также набор вспомогательных
 * стилей к странице в целом 
 */

const useTransparent_1 = makeStyles (theme => ({

    //------------------------Стили для параллакса в голове-----------------------//
    img:{
        height: "90vh",
        maxHeight: "1000px",
        overflow: "hidden",
       // position: "relative", //Необходимо, чтобы корректно наложить фильтр (там position - absolute) 
        backgroundPosition: "right top",
        backgroundSize: "70%",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down('sm')]:{  //Переключение позиционирования фона на малых экранах
                backgroundSize: "100%",
                backgroundPosition: "right center",
        
        },
        backgroundColor: "white", // Нужно потому, что картинка в голове не полностью закрывает фон
        margin: "0",              // Если не задать - то видна вертикальная полоса справа от телки
        padding: "0",
        border: "0",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,                                      
    },
    filter: { // Это спижжено отсюда  
              // https://github.com/creativetimofficial/material-kit-react/blob/master/src/assets/jss/material-kit-react/components/parallaxStyle.jsx 
              // Этим объясняется вставка в шапке документа
              // Почему это работает и нало делать именно так - не вполне понимаю. 
    "&:before": {
      background: theme.palette.primary.dark, // цвет фильтра
      opacity: props => props.page ==0 ? "0.3": "0.6"                          // прозрачность
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
//----------------------------------------------------------------------------------//

//----------------------------Стили для параллакса в подвале------------------------//
  },
  imgBott:{
        minHeight: "90vh",
        overflow: "hidden",
        
        backgroundPosition: "center top",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down('sm')]:{
                backgroundSize: "100%",
                backgroundPosition: "right bottom",
        
        },
        
     //   marginТор: theme.spacing(40),
        margin: "0",
        padding: "0",
        border: "0",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,                                        
    },
    filterBott:{    // фильтр практически такой же, так что меняется только прозрачность. Надо было поконтрастнее
        "&:before": {
            opacity: "0.7",
            background: theme.palette.primary.light 
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
    
//----------------------------Стили для Надписей в AppBar---------------------------//        
    typografy:{
        opacity: "1.0",
        color : "black",
        padding: theme.spacing(2),
        textTransform: "lowercase",
        [theme.breakpoints.down('md')]:{
                padding: theme.spacing(1),
        },
    },
//----------------------------------------------------------------------------------//                                                    
    
//-----------------------Стиль для сдвигания кнопки AppBar вправо на малых экранах--//
    
    mail: { // 
        [theme.breakpoints.up('xs')]: {
        flexGrow: 1
    },
    },
//----------------------------------------------------------------------------------//    
    
//----------Стиль для помещения содержимого подвала над фильтром картинки подвала--//
    message: {
       paddingTop: theme.spacing(8),
    },
//----------------------------------------------------------------------------------//    
    
//---Стиль для переопределения стиля кнопок в заголовке. Там по умолчанию Uppercase-//
    button: {
         textTransform: "none",
    },
//----------------------------------------------------------------------------------//    
    
//---Стиль для основного контейнера с содержимым страницы. Идея в том, чтобы ------//
//---обеспечить наезжание на картинки параллакса в голове и подвале----------------//
    
    paper: {
         padding: theme.spacing(8),
      //  marginTop: -theme.spacing(8),
        marginBottom: -theme.spacing(8),
         boxShadow: theme.shadows[10]
    },
//----------------------------------------------------------------------------------//    

//---Стиль для разделения между кастомными компонентами, рендерящимися на странице--//    
    elements: {
        marginBottom: theme.spacing(10)
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
    }
}));

export default function ElevateAppBar(props) {
    
    /* Компонент, рендерящий корневую страницу сайта
     */
    const elem = document.getElementById("main_page_parallax")
    const windowDims = useWindowSize()
    const pictureTrigger = useScrollTrigger({
        disableHysteresis: true,
        target: elem ? elem: window,
        threshold: windowDims.innerHeight,
        });
    const qur_theme = useTheme();
    const down_md = useMediaQuery (qur_theme.breakpoints.down('md')) 
    const ownProps= {}

    const [interval, onInterval] = useState(true)
    useEffect(() => {
        onInterval (false)
       
    },[]);

  
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
      
    return (
        <React.Fragment>
            <CssBaseline />
            <MainAppBar position="fixed" primary page={props.page}/>
            {/*Полоска AppBar
                * В данном компоненте параллакс реализован не с помощью EventListener,
                * а при помощи чистого css. Смысл в том, что на странице организуется
                * НЕПОДВИЖНЫЙ элемент id="main_page_parallax" высотой 100vh. Далее в нем задается
                * третье измерение - perspective. Далее все содержимое помещается внутрь этого
                * элемента на разном расстоянии по оси z. Те, чо ближе - двигаются быстрее, дальше - медленнее.
                */}
     
            <div className={imageStyles.parallax} id="main_page_parallax">
                <div className={imageStyles.parallax__layer_top}>
                {/*Картинка параллакса головы с содержимым*/}    
                    {props.page == 0 || !pictureTrigger ? 
                    <div
                    className={`${imageStyles.img} ${imageStyles.parallax__layer__back} ${imageStyles.filter} ${imageStyles.parallax__layer__bott}`}
                    style={{ backgroundImage: "url("+picture+")"}}
                    />: ""
                    }
                    <Container className={` ${imageStyles.parallax__layer__base} `}   maxWidth="lg"  fixed>
                        <Grid container  justify="flex-start" alignItems="center" style={{height: "90vh"}}>
                            <Grid item xs={12}>
                                <Typography variant="h2"> ТМК ПЛЮС</Typography>
                                <Typography variant="h6"> Освобождаем от рутины</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            {/*Картинка параллакса головы с содержимым*/}
                <Container fixed maxWidth="lg" style={{zIndex: "12"}} className={imageStyles.parallax__layer__base}>
                    <Paper className={imageStyles.paper}>
                        {/*Кнопки-картинки */}
                        <Button_base className={imageStyles.elements}/>
                        {/*Список иконок с преимуществами */} 
                        <IconListWithText className={imageStyles.elements}/>
                        {/*Список аватаров с отзывами */} 
                        <AvatarList className={imageStyles.elements}/>
                        {/*Текст с трепом */} 
                        <BlockOfText className={imageStyles.elements}/>
                        {/*Форма обратной связи*/} 
                        <FormWithHeader className={imageStyles.elements}/>
                    </Paper>    
                </Container>
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
                    style={{  backgroundImage: "url("+FooterImage+")"}}
                    />
                    {/*Ссылки подвала */}
                    <FooterContent className={`${imageStyles.parallax__layer__base}  `} containerStyle={imageStyles.message} typProps={imageStyles.bottomText}/>
                    {/*Картинка подвала с содержимым*/}
                </div>
      
            </div>
        </React.Fragment>
    );
}
