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

import React, {useState, useEffect, useRef,} from 'react';
import useWindowScrollPosition from '@rehooks/window-scroll-position'
import AppBar from '@material-ui/core/AppBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import Toolbar from '@material-ui/core/Toolbar';
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


//Иконки
import Call from '@material-ui/icons/Call';
import Mail from '@material-ui/icons/Mail';

//Статические картинки параллаксов
import picture from './Assets/IMG/TMK/FrontWoman.jpg'
import FooterImage from './Assets/IMG/TMK/Footer13.jpg'



//Мои компоненты
import Button_base from './Butt_base.jsx'
import IconListWithText from'./IconListWithText.jsx'
import AvatarList from'./AvatarList.jsx'
import BlockOfText from'./BlockOfText.jsx'
import FormWithHeader from'./FormWithHeader.jsx'
import FooterContent from'./FooterContent.jsx'


/* Стили для AppBar. Идея в том, чтобы при листании в момент, когда пролистали
 * до позиции, заданной в кастомном хуке useScrollTransform (threshold), ПЛАВНО
 * (задается в transition) менялась высота AppBar. 
 */ 
const useTransparent = makeStyles (theme => ({
    colorStyle: {
        height: 80,
        display: "flex",                // Этот и следующий параметры ВАЖНЫ. Без них надпись не 
        justifyContent: "center",       // центрируется в изменяющем ширину AppBar по высоте!!
        backgroundColor: "transparent",
        transition: "all 1s",
        
    },
    colorStyle_1: {
        height: 100,
        display: "flex",
        justifyContent: "center",
        transition: "all 1s",
    
    },
}));


/* Хук для задания стилей надписей в AppBar 
 * На прозрачном AppBar - черный, на цветном - белый
 * Для надписей в повале цвет всегда - серый
 */

const useHeaderTextColor = makeStyles (theme => ({
    transparent: {
        color: theme.palette.common.black,
        transition: "all 1s",
    },
    colored: {
        color: theme.palette.common.white,
        transition: "all 1s",
    },
    bottomText: {
        color: theme.palette.grey[600],
        transition: "all 1s",
    },
}));
    
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
        position: "relative", //Необходимо, чтобы корректно наложить фильтр (там position - absolute) 
        backgroundPosition: "right top",
        backgroundSize: "70%",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down('sm')]:{  //Переключение позиционирования фона на малых экранах
                backgroundSize: "100%",
                backgroundPosition: "right bottom",
        
        },
        backgroundColor: "white", // Нужно потому, что картинка в голове не полностью закрывает фон
        margin: "0",              // Если не задать - то видна вертикальная полоса справа от телки
        padding: "0",
        border: "0",
        display: "flex",
        alignItems: "center",
      
                                            
    },
    filter: { // Это спижжено отсюда  
              // https://github.com/creativetimofficial/material-kit-react/blob/master/src/assets/jss/material-kit-react/components/parallaxStyle.jsx 
              // Этим объясняется вставка в шапке документа
              // Почему это работает и нало делать именно так - не вполне понимаю. 
    "&:before": {
      background: theme.palette.primary.dark, // цвет фильтра
      opacity: "0.3"                          // прозрачность
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
        minHeight: "20vh",
        overflow: "hidden",
        position: "relative",
        backgroundPosition: "center top",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down('sm')]:{
                backgroundSize: "100%",
                backgroundPosition: "right bottom",
        
        },
        backgroundColor: "white",
        margin: "0",
        padding: "0",
        border: "0",
        display: "flex",
        flexDirection: "column"
        
      
                                            
    },
    filterBott:{    // фильтр практически такой же, так что меняется только прозрачнось. Надо было поконтрастнее
        "&:before": {
            opacity: "0.8",
            background: theme.palette.primary.light
            
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
        zIndex: "12"
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
        marginTop: -theme.spacing(8),
        marginBottom: -theme.spacing(8),
         boxShadow: theme.shadows[10]
    },
//----------------------------------------------------------------------------------//    

//---Стиль для разделения между кастомными компонентами, рендерящимися на странице--//    
    elements: {
        marginBottom: theme.spacing(10)
    },
//----------------------------------------------------------------------------------//    
}));


function useScrollTransform () {
    /* Кастомный хук, переключающий стили Appbar при достижении вертикального
     * смещения страницы величины threshold. 
     */
    
    
    // Собственно хук, отслеживающий положение прокрутки
    // trigger= true пересекли threshold
    const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });
    
    // Создание стилей фона и текста Appbar
    const textColor = useHeaderTextColor()
    const transparentStyle = useTransparent()
    
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
            color: "primary",
            classes: {
                colorPrimary: transparentStyle.colorStyle_1 // Стиль, применяемый при значении prop color=primary
                },
            },
        typProps: {
            className: textColor.colored,
            },
        typPropsBott: {
            className: textColor.bottomText, // Стиль надписей подвала
            },    
    } : {
        appProps: {
            elevation: 0,
            color: "secondary",
            classes: {
                colorSecondary: transparentStyle.colorStyle  // Стиль, применяемый при значении prop color=secondary
                },
            },
        typProps: {
            className: textColor.transparent,
            },
    }
    return triggerProps
}
            
    
    

export default function ElevateAppBar(props) {
    
   
    const {appProps, typProps, typPropsBott} = useScrollTransform()
    
    /* State хуки, рассчитывающие и формирующие css параллакс-сдвига картинок
    *  фона заголовка и подвала. Вызываются колбэком EventListener-а,  
    * который фаерится при скролле. Сам EventListener аттачится 
    *  в Effect хуке - ПОЛНОМ аналоге componentDidMount()
    * хук вызывается только при монтировании компонента, так как массив 
    * зависимостей хука ПУСТОЙ. 
    * Сам сдвиг осуществляется при помощи translate3d. Картинка сдвигается на треть
    * от Y-позиции scroll. Верхняя картинка - вниз, нижняя - вверх.
    * В итоге Paper с содержимым страницы ОБГОНЯЕТ картинки как при движении вниз
    * так и вверх. 
    * Положение нижней катинки расчитывается так, чтобы при долистывании страницы
    * до конца сдвиг оказался равным нулю. 
    */
    const [translation, setTranslation] = useState({
      transform: "translate3d(0,0,0)"})
    const [translationBott, setTranslationBott]= useState({
      transform: "translate3d(0,0,0)"})
   // const position = useWindowScrollPosition({throttle: 1})
    const imageStyles = useTransparent_1()
    
    useEffect(() => {
        const setPosition = () =>{
                setTranslation({transform: "translate3d(0," + window.pageYOffset/3 + "px,0)"})
        };
        const setPositionBott = () =>{
                setTranslationBott({
                    transform: "translate3d(0," + (-(document.body.scrollHeight-window.innerHeight-window.pageYOffset))/3 + "px,0)"})
        };
        window.addEventListener("scroll", setPosition)
        window.addEventListener("scroll", setPositionBott)
        return(()=> {
            window.removeEventListener("scroll", setPosition)     // При демонтировании компонента EventListener НЕОБХОДИМО
            window.removeEventListener("scroll", setPositionBott) // ОТКЛЮЧИТЬ. Иначе будет утечка!!!!
        })
        
    },[]);
    
    // Получение доступа к текущему инстансу theme и 
    // определение текущей ширины экрана при помощи 
    // при помощи соответствующего хука.
    const qur_theme = useTheme();
    const down_md = useMediaQuery (qur_theme.breakpoints.down('md')) 
        
    
    
    /* Общие вещи по рендерингу.
     * Все содержимое, ЗА ИСКЛЮЧЕНИЕМ 
     * - Полоски AppBar
     * - Картинок параллакса в голове и в подвале  
     * рендерится в контейнере, ширина которого
     * переключается скачкобразно при пересечении 
     * соответствующего breakpoint MediaQuery.
     * При этом максимальная ширина контейнера - lg
     */
    
    
  return (
    <React.Fragment>
      <CssBaseline />
     
      {/*Полоска AppBar*/}
        <AppBar {...appProps}>
        <Container fixed maxWidth="lg" >
          <Toolbar>
          {/*ToolBar children приходится делать кнопками. Иначе проблема с центрированием*/}
          <Button >
            <Typography variant="h2" {...typProps} >TMK+</Typography>
          </Button>
          <Button  classes={{label: imageStyles.typografy }} disabled>
          {/*На малых экранах и ниже иконка стандартная - иначе большая */}
            <Call fontSize={down_md? "default": "large"} {...typProps}/>
            <Typography variant={down_md ? "caption": "h6"} display="inline" {...typProps}>+7(495)&nbsp;322-22-33</Typography>
          </Button>
          {/*Телефон и почту рендерим disabled*/}
          <Button classes={{label: imageStyles.typografy }}  disabled>
            <Mail fontSize={down_md? "default": "large"} {...typProps}/>
            <Typography variant={down_md ? "caption": "h6"}  {...typProps} >info@example.com</Typography>
          </Button>
          <div className={imageStyles.mail}/>
          <Fab color="secondary"  variant="extended" className={imageStyles.button}>
            <Typography variant={down_md ? "body2": "h6"}  >Стать&nbsp;клиентом</Typography>
          </Fab>
          </Toolbar>
        </Container>
        </AppBar>
   
      {/*Полоска AppBar*/}
     
      {/*Картинка параллакса головы с содержимым*/}    
      <div
        className={`${imageStyles.img} ${imageStyles.filter}`}
        style={{...translation,   backgroundImage: "url("+picture+")"}}
      >
      <Container className={imageStyles.message} maxWidth="lg"  fixed>
      
        <Typography variant="h2"> ТМК ПЛЮС</Typography>
        <Typography variant="h6"> Освобождаем от рутины</Typography>

      </Container>
      </div>
      {/*Картинка параллакса головы с содержимым*/}
      
      <Container fixed maxWidth="lg" style={{zIndex: "12", position: "relative"}}>
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
      
      {/*Картинка параллакса подвала с содержимым*/}
       <div
        className={`${imageStyles.imgBott} ${imageStyles.filter} ${imageStyles.filterBott}`}
        style={{...translationBott,   backgroundImage: "url("+FooterImage+")"}}
      >
      {/*Ссылки подвала*/}
        <FooterContent containerStyle={imageStyles.message} typProps={typPropsBott}/>
      
      </div>
      {/*Картинка параллакса подвала с содержимым*/}
    </React.Fragment>
  );
}
