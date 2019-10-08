import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import {ThemeProvider, useTheme} from '@material-ui/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'




        

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  colorPrimary: {
      color: red[200]
  },
  colorSecondary: {
      color: green[400]
  },
  
  
});

const useStyles1 = makeStyles ({
  
    root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },

  
});


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function SvgIcons() {
 const classes = useStyles();
 const classes1 = useStyles1()
 // const theme = useTheme()
  
  return (
  <>
      <Button
      classes={{
        root: classes1.root, // class name, e.g. `classes-nesting-root-x`
        label: classes1.label, // class name, e.g. `classes-nesting-label-x`
      }}
    >
      classes nesting
      </Button>
      <SvgIcon color="primary"
      classes={{ colorPrimary: classes.colorPrimary, root: classes.root}}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
      
      <div className={classes.root}>  
      <HomeIcon color="primary" classes={{ colorPrimary: classes.colorPrimary}}/>
      <HomeIcon color="primary"/>
      <HomeIcon className={classes.colorSecondary}/>
      <HomeIcon color="secondary"/>
 
      <HomeIcon  color="action" />
     
    </div>
</>
  );
}
