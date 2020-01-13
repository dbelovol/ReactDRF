import React, {useMemo} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import {makeBlockSelector} from './Utils/Selectors.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//import Team from './Assets/IMG/TMK/Depositphotos_33035993_xl-2015.jpg'
//import Accounter from './Assets/IMG/TMK/Depositphotos_11632587_xl-2015.jpg'
//import Lawyers from './Assets/IMG/TMK/Depositphotos_222670292_xl-2015.jpg'

//const images = [
//   {
//     url: Team,
//     title: 'Кадровый аутсорсинг',
//     width: "100%"
//    
//   },
//   {
//     url: Accounter,
//     title: 'Аутсорсинг бухгалтерских услуг',
//     width: "100%"
//   },
//   {
//     url: Lawyers,
//     title: 'Регистрация и ликвидация компаний',
//     width: "100%"
//   },
// ];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  item: {
    padding: theme.spacing(2)
  }, 
  subitem: {
    padding: theme.spacing(1)
  },
  header: {
    padding: theme.spacing(5),
    
  },
  avatar: {
    width: 150,
    height: 150
  },
  body1Toh6: {
      fontWeight : theme.typography.fontWeightMedium
  },
  border: props => props.page_id != 0 ? {
    border: "solid",
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderRadius: 15,
    boxShadow: theme.shadows[2]
  }: {},
  image: {
    position: 'relative',
    height: "40vh",
    [theme.breakpoints.down('xs')]: {
     // width: '100% !important', // Overrides inline-style
    //  height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
        color: "black"
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageCalc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    fontSize: theme.typography.h1.fontSize
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.primary.dark,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1)+6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function ButtonBases(props) {
  /*
    Компонент, формирующий блок ссылок. 
    В качестве  id получает номер блока в массиве link_blocks store
    Имеет несколько форм отображения
      - если mode - true, то это картинки,иначе - аватары
    в случае вывода картинок в качестве информации на картинке используется название 
    страницы.
    в случае вывода аватаров помимо названия страницы еще выводится текст и некая базвая цена услуги
  */
    const {className, id, side} = props
    // Создание мемоизированного селектора для извлечения информации
    // По данным блока
    const linkDataSelector= useMemo (
      makeBlockSelector, 
      []
    )
    //  Получение информации о данных блока. Используется переданный в качестве prop
    //  идентификатор блока
    const linkData =  useSelector (state => 
      linkDataSelector(state, {id: id, type: "link_blocks"})
    )
    //console.log("LINKDATA", linkData)
    const classes = useStyles(props);
    //  В данных блока иформация по ссылкам на страницу представлена в виде
    //  идентификаторов страниц. Для рендеринга нужно иметь информацию по 
    //  данным страницы. Извлекаем ее из store и помещаем в данные вместо идентификаторов
    linkData.links = useSelector(state => linkData.links.map(elem => ({
                                  ...elem,
                                  url: state.pages[elem.page].picture,
                                  title: state.pages[elem.page].header,
                                  width: "100%", 
                                  // Ссылки реализованы ВНУТРИ базовой кнопки либо аватара
                                  // Оба эти компонента делают форвард реф на рут
                                  // Мы в качесте рута подставляем компонент Link библиотеки RecatRouter
                                  // ПОэтому мы должны поддержать форвард реф
                                  to:  React.forwardRef((itemProps, ref) => (
                                      // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
                                      <RouterLink to={state.pages[elem.page].url} {...itemProps} innerRef={ref} />
                                      ))
    })))
   
    
    // linkData.mode = false
    // let position = "S"
    const align = linkData.links.length == 1 || side =="R" ? {xs:12}: 
                              (linkData.links.length == 2 ? {xs:12, md:6}:{xs:12, md:6, lg:4} )
    

  return (
        
        <Grid container alignItems="center" direction="column" className={`${className} ${classes.border}`}>
            <Grid item className={classes.header}>
                <Typography variant="h4" align="center" style={{textTransform: "uppercase"}}>
                    {linkData.header}
                </Typography>
            </Grid>
            {linkData.mode ?
            <Grid item container justify="center">
                {linkData.links.map(image => (
                <Grid item xs={12} md={6} className={classes.subitem} key={image.title}>
                    <ButtonBase
                    focusRipple
                    component={image.to}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                    >
                        <Paper
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageCalc}>
                            <Icon  color="secondary" fontSize="inherit" className={"fa fa-calculator"}/>
                           
                        </span>
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="h6"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                                {image.title}
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                </Grid>
                ))}
            </Grid>:
            <Grid item container justify="center">
              {linkData.links.map( item => (
                <Grid 
                  container
                  item 
                  {...align}
                  key={item.id} 
                  direction ={linkData.position == "S" ? "row": "column"}
                  alignItems="center"
                  className={classes.item}
                >
                  <Grid item xs={linkData.position == "S"? 6: false } className={classes.subitem}>
                      <Avatar src={item.url} className={classes.avatar} component={item.to}/>
                  </Grid>
                  <Grid 
                    item xs={linkData.position == "S"? 6: false } 
                    container 
                    className={classes.subitem}
                    direction= "column" 
                    alignItems="center" >
                      <Grid item>
                        <Typography variant="body1" align="center" classes={{body1: classes.body1Toh6}}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" align="justify">
                          {item.text}
                        </Typography>
                        <Typography variant="body2" align="center">
                          {item.measure.search(/[Рр]уб\.?/) != -1 ? "От ": ""}
                          {item.price}
                          {item.measure.search(/[Рр]уб\.?/) != -1 ?
                              <FontAwesomeIcon icon={['fas', 'ruble-sign']}/> : ""}
                          {item.measure.replace(/[Рр]уб\.?/, "")}
                        </Typography>
                      </Grid>    
                  </Grid>
                  
                </Grid>
              )
              )}
            </Grid>
            }
         </Grid> 
  );
}
