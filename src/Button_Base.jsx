import React from 'react';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// import Team from './Assets/IMG/TMK/Depositphotos_33035993_xl-2015.jpg'
// import Accounter from './Assets/IMG/TMK/Depositphotos_11632587_xl-2015.jpg'
// import Lawyers from './Assets/IMG/TMK/Depositphotos_222670292_xl-2015.jpg'

const useStyle = makeStyles ({
    
    grid: {
        position: "relative",
        height: "40vh",
    },
    button:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
       
        
        
    }
});

const images = []
//   {
//     url: "/IMG/Depositphotos_33035993_xl-2015.jpg",
//     title: 'Кадровый аутсорсинг',
//    
//   },
//   {
//     url: "/IMG/Depositphotos_11632587_xl-2015.jpg",
//     title: 'Аутсорсинг бухгалтерских услуг',
//     
//   },
//   {
//     url: "/IMG/Depositphotos_222670292_xl-2015.jpg",
//     title: 'Регистраия и ликвидация компаний',
//    
//   },
// ];


export default function ButtonBases() {

  const grd = useStyle() 
  images = useSelector(state => state.pages.filter(page => state.tree[0].childs.includes(page.id)).map(el => ({url:el.picture, title:el.name}))
  console.log (images.length)
  return (
    <Grid container spacing={8} justify="center">
    <Grid item xs={12} >
        <Typography variant="h4" align="center" style={{textTransform: "uppercase"}}>
        что мы делаем
        </Typography>
    </Grid>
    <Grid item xs={12} container spacing={8} justify="center">
      {images.map(image => (
        <Grid item xs={12} md={6} key={image.title}>
          
          <ButtonBase className={grd.grid}>
          <span className={grd.button} style={{backgroundImage: "url("+image.url+")"}}>
            
           </span> 
          </ButtonBase>  
        </Grid>
      ))}
    </Grid>
    </Grid>
  );
}
