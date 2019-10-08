import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';


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
  image: {
    position: 'relative',
    height: "40vh",
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
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
    const {className} = props
    const classes = useStyles();
    const images = useSelector(state => state.pages.filter(page => state.tree[0].childs.includes(String(page.id))).map(el => ({url:el.picture, title:el.name, width:"100%", to: 
       
            React.forwardRef((itemProps, ref) => (
        // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
                <RouterLink to={el.url} {...itemProps} innerRef={ref} />
        ))
})))
    console.log(images.length, images[0])
    
    
    

  return (
        <Grid container spacing={8} justify="center" className={className}>
            <Grid item xs={12} >
                <Typography variant="h4" align="center" style={{textTransform: "uppercase"}}>
                    что мы делаем
                </Typography>
            </Grid>
            <Grid item xs={12} container spacing={2} justify="center">
                {images.map(image => (
                <Grid item xs={12} md={6} key={image.title}>
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
            </Grid>
         </Grid>   
  );
}
