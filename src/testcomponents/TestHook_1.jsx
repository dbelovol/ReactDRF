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
//import FooterImage from './Assets/IMG/TMK/Depositphotos_237110932_xl-2015.jpg'



//Мои компоненты
import Button_base from '../Butt_base.jsx'
import IconListWithText from'../IconListWithText.jsx'
import AvatarList from'../AvatarList.jsx'
import BlockOfText from'../BlockOfText.jsx'
import FormWithHeader from'../FormWithHeader.jsx'
import FooterContent from'../FooterContent.jsx'


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
        minHeight: "90vh",
        overflow: "hidden",
        
        backgroundPosition: "center bottom",
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
    filterBott:{    // фильтр практически такой же, так что меняется только прозрачнось. Надо было поконтрастнее
        "&:before": {
            opacity: "0.9",
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
    parallax: {
        perspective: "1px",
        perscpectiveOrigin: "bottom",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
    },
    parallax__group: {
        position: "relative",
        minHeight: "40vh",
        zIndex: 1,
        
        transformStyle: "preserve-3d",
        marginTop: theme.spacing(-2)
    },
    parallax__layer_top: {
        position: "relative",
        minHeight: "40vh",
        zIndex: 1,
        
        transformStyle: "preserve-3d",
        marginTop: theme.spacing(-2)
    },
    parallax__layer__base: {
        transform: "translateZ(0)",
        position: "relative",
                
        zIndex: 2
    },
    parallax__layer__back: {
        transform: "translateZ(-1px) scale(2.1)",
        position: "relative",
        
        zIndex: 1,
       
    },
    parallax__layer__bott: {
        position: "absolute",
        
        
    },
}));


function useScrollTransform () {
    /* Кастомный хук, переключающий стили Appbar при достижении вертикального
     * смещения страницы величины threshold. 
     */
    
    const elem = document.getElementById("main_page_parallax")
    console.log(elem)
    // Собственно хук, отслеживающий положение прокрутки
    // trigger= true пересекли threshold
    const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: elem ? elem: window,
    threshold: 50,
  });
    console.log(trigger)
    
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
    const [interval, onInterval] = useState(true)
   
     
    useEffect(() => {
        onInterval (false)
       
    },[]);
        
         const imageStyles = useTransparent_1()
   
    
    
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
      
     
        <div className={imageStyles.parallax} id="test_id">
            <div className={imageStyles.parallax__group}>
                <Container className={` ${imageStyles.parallax__layer__back} `}>
                    < Typography variant="h4" className={imageStyles.title}>THIS IS ХУЙ</Typography>
                </Container>
            </div>
            <div className={imageStyles.parallax__group} >
            <Container fixed className={` ${imageStyles.parallax__layer__base} `}>
                < Typography variant="h2" className={imageStyles.title}> This is the foreground</Typography>
            </Container>
            </div>
           <div className={imageStyles.parallax__group}>
                
                <Container fixed className={`${imageStyles.parallax__layer__back} `}>
                    < Typography variant="h2" className={imageStyles.title}> This is the Back</Typography>
                </Container>
            
            </div>
           
        </div>
    </React.Fragment>
  );
}
