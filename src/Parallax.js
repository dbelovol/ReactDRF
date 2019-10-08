import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import {ThemeProvider, useTheme} from '@material-ui/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import picture from './Assets/IMG/Мы.jpg'
import Plx from "react-plx";

const useStyles = makeStyles({
  img: {
    height: "90vh",
    width:"50vw",
    maxHeight: "1000px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    margin: 10,
    padding: 5,
    border: 10,
    borderColor: "black",
    display: "flex",
    alignItems: "center"
  },
  filter: {
      "&:before": {
      background: "rgba(23,140,66,0.3)",
    border: 10
    
      },
  "&:after, &:before":{
    position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content:"''",
      border: 10
      
      
  }
  },
  
});

const useStyles1 = makeStyles({
    parallax: {
    height: "90vh",
    maxHeight: "1000px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center"
  },
  filter: {
    "&:before": {
      background: "rgba(23,140,66,0.3)"
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
});

const useStyles2 = makeStyles(theme => ({
  root: {
    
    borderColor: theme.palette.primary.main,
    border: 1,
    borderRadius: 15,
   
    
    height: 48,
    padding: '0 30px',
  },
}));

  

  
  


export default function Header () {
    const classes = useStyles()
    const classes_1 = useStyles1()
    const classes_2 = useStyles2()
    return (
        <>
        <div className={`${classes.img} `}>
       
        <img src={picture}/>
         </div>
         <div className={`${classes_1.parallax} ${classes_1.filter}`}>
       
        dick 
         </div>
       <Button variant="outlined" className={classes_2.root}>Hook</Button>
         
         </>
    )}
