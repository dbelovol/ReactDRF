
import React, {useState, useEffect, useRef,} from 'react';
import useWindowScrollPosition from '@rehooks/window-scroll-position'
import AppBar from '@material-ui/core/AppBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import withStyles from '@material-ui/core/styles/withStyles';
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
import FooterImage from './Assets/IMG/TMK/Footer13.jpg'


const styles= makeStyles ({
    parallax: {
        perspective: "1px",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
       
    },
    parallax__top:{
        
        height: "30vh",
        backgroundColor: "cyan",
        transform: "translateZ(0)"
    },
    parallax__layer: {
        position: "absolute",
        top: 0
        
    },
    parallax__group: {
        position: "relative",
        minHeight: "90vh",
        zIndex: 1,
        
        
        transformStyle: "preserve-3d",
        
    },
    parallax__layer__base: {
        transform: "translateZ(0)",
        backgroundColor: "red",
        height: "500vh",
        zIndex: 2
   
        
    },
    parallax__layer__back: {
        transform: "translateZ(-1px) scale(2)",
        
        height: "90vh",
        zIndex: 1
        
    },
    
    parallax__layer_shift: {
    position: "absolute"
    },

   /* centre the content in the parallax layers */
    title: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    },


  /* misc
  --------------------------------------------- */
   demo__info: {
    position: "absolute",
    zIndex: 100,
    bottom: "1vh",
    top: "auto",
    textAlign: "center",
    width: "100%",
   }
    
});

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
}));


export default function Test () {
    
    
    
    const [translation, setTranslation] = useState({
      position: 0})
    const [translationBott, setTranslationBott]= useState({
      transform: "translate3d(0,0,0)"})
   // const position = useWindowScrollPosition({throttle: 1})
   
    
    useEffect(() => {
        const setPosition = (e) =>{
                setTranslation({position: e.target.scrollTop})
        };
        const setPositionBott = () =>{
                setTranslationBott({
                    transform: "translate3d(0," + (-(document.body.scrollHeight-window.innerHeight-window.pageYOffset))/3 + "px,0)"})
        };
        const elem = document.getElementById("test_id")
        console.log(elem)
        elem.addEventListener("scroll", setPosition)
        window.addEventListener("scroll", setPositionBott)
        return(()=> {
            elem.removeEventListener("scroll", setPosition)     // При демонтировании компонента EventListener НЕОБХОДИМО
            window.removeEventListener("scroll", setPositionBott) // ОТКЛЮЧИТЬ. Иначе будет утечка!!!!
        })
        
    },[]);
    
    
    const classes = styles()
    const classes_1 = useTransparent_1()
    const clName = `${classes.parallax__layer} ${classes.parallax__layer__back} }
                    ${classes_1.imgBott} ${classes_1.filter} ${classes_1.filterBott}`
    
    return (
        <>
        <CssBaseline />
        <div className={classes.demo__info}>
            Pure CSS parallax scroll demo #1 by Keith Clark. Please read the <a href="../">blog post</a> for more information.
        </div>
        <div className={classes.parallax} id="test_id">
            <div className={classes.parallax__group}>
                <Container className={` ${classes.parallax__layer__back} `}>
                    < Typography variant="h2" className={classes.title}>{translation.position}</Typography>
                </Container>
            </div>
            <div className={classes.parallax__group} >
            <Container fixed className={` ${classes.parallax__layer__base} `}>
                < Typography variant="h2" className={classes.title}> This is the foreground</Typography>
            </Container>
            </div>
           <div className={classes.parallax__group}>
                <div className={clName} style={{  backgroundImage: "url("+FooterImage+")"}}/>
                <Container fixed className={`${classes.parallax__layer} ${classes.parallax__layer__back} `}>
                    < Typography variant="h2" className={classes.title}> This is the Back</Typography>
                </Container>
            
            </div>
           
        </div>
        
       </>
    )}
