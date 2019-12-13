import React from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useSelector} from 'react-redux'
import {createSelector} from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const headerClasses = makeStyles(theme => ({

    //------------------------Стили для параллакса в голове-----------------------//
    img: {
        height: "90vh",
        maxHeight: "1000px",
        overflow: "hidden",
        // position: "relative", //Необходимо, чтобы корректно наложить фильтр (там position - absolute) 
        backgroundPosition: "right top",
        backgroundSize: "70%",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down('sm')]: {  //Переключение позиционирования фона на малых экранах
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
            opacity: props => props.page == 0 ? "0.3" : "0.9"                          // прозрачность
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
    h2sel:{// Включение жирного шрифта на дочерних страницах
        fontWeight : props => props.page != 0 ? theme.typography.fontWeightMedium : theme.typography.fontWeightLight
    },
    typography:{// Включение белого цвета текста в заголовке дочерней страницы
        color: props => props.page == 0 ? theme.palette.common.black : theme.palette.common.white
    }
}));

// Функция, извлекающая и нормализующая инофрмацию о заголовке страницы из store
const pageHeaderPrepare = (state) => {
    let res = Object.assign({}, state.pages[state.currentPage])
    res = Object.assign(res, {features: res.features.map(item => state.features[item])})
    return res
}

// Создание запоминающего селектора. 
const pageHeaderSelector = createSelector (
    pageHeaderPrepare,
    res => res
)



export default function pageHeadersRequest(props) {
    /*
        Функция, формирующая заголовок страницы.
        Принимает в качестве параметра идентификатор страницы
        использует номер для извлечения необходимой информации из Redux store
        Используется следующая информация из store
        - page.header - имя страницы
        - page.text - рекламный текст услуги, которой посвящена страница
        - page.picture - картинка страницы
        - page.features -  массив идентификаторов главных ценовых характеристик услуги
        - features - массив описаний услуг
           - id - идентификатор
           - name - наименование услуги
           - measure - единица измерения
           - price - цена

    */
    const classes = headerClasses(props)
    const pageInfo = useSelector(pageHeaderSelector) 


    return (
    <>
    {/* Отслеживается прокрутка страницы. Отрубается вывод катинки фона. Иначе она торчит внизу */}
    { !props.pictureTrigger ?
        <div
            className={`${classes.img} ${classes.parallax__layer__back} ${classes.filter} ${classes.parallax__layer__bott}`}
            style={{ backgroundImage: "url(" + pageInfo.picture + ")" }}
        /> : ""
    }
    <Container className={` ${classes.parallax__layer__base} `} maxWidth="lg" fixed>
    {/* Заголовок главной страницы выводится иначе. */}
        {props.page ==0 ?
        <Grid container justify="flex-start" alignItems="center" style={{ height: "90vh" }}>
            <Grid item xs={12}>
                <Typography className={classes.typography} classes={{h2: classes.h2sel}} variant="h2"> {pageInfo.header}</Typography>
                <Typography className={classes.typography} variant="h6"> {pageInfo.text}</Typography>
            </Grid>
        </Grid>:
        <Grid container justify="space-around" alignItems="center" direction="column" style={{ height: "90vh" }}>
            {/** Вставка полоски, иначе заголовок страницы наезжает на тулбар */}
            <Grid item style={{height: "40px"}}/>
            <Grid item >
                <Typography className={classes.typography} classes={{h2: classes.h2sel}} variant="h2"> {pageInfo.header}</Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.typography} variant="h6" align="justify"> {pageInfo.text}</Typography>
            </Grid>
            <Grid item container justify="space-between" >
                {pageInfo.features.map( feature => 
                        <Grid key={feature.id} item xs={4} container direction="column" alignItems="center">
                            <Grid item >
                                <Typography className={classes.typography} variant="h6">{feature.name}</Typography>
                            </Grid>
                            <Grid item >
                                <Typography className={classes.typography} variant="h6" >
                                    {/**Если цена содержит [P|р]уб c точкой либо без, то
                                     * в начале вставляется От, а руб заменяется иконкой рубля
                                      */}
                                    {feature.measure.search(/[Рр]уб\.?/) != -1 ? "От ": ""}
                                    {feature.price}
                                    {feature.measure.search(/[Рр]уб\.?/) != -1 ?
                                        <FontAwesomeIcon icon={['fas', 'ruble-sign']}/> : ""}
                                    {feature.measure.replace(/[Рр]уб\.?/, "")}
                                </Typography>
                            </Grid>
                        </Grid>    
                )}
            </Grid>
        </Grid>
        }
    </Container>
    </>
    )}
