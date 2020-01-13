import React, {useMemo} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import {makeToolbarEntries} from './Utils/Selectors.jsx'
import {useSelector} from 'react-redux'
import Button from '@material-ui/core/Button';



export default function FooterContent(props) {
    
    /*
     * Компонент формирует список ссылок на страницы, располагаемый в подвале
     */
    
    // Создание запоминающего селектора
    const {containerStyle, typProps, className}= props;
    const textDataSelector= useMemo (
        makeToolbarEntries, 
        []
    )
    
    // Извлечение из store информации по ссылкам первого уровня. Уровень
    // - второй аргумент в селекторе
    const toolBarEntries =  useSelector (state => 
        textDataSelector(state, 0)
    )

return (

    <Container className={`${containerStyle} ${className}`} style={{marginTop: "30px"}}fixed maxWidth="lg">
        <Grid container justify="flex-start">
            {toolBarEntries.map(item => (
            <Grid item  key={item.id} container  direction="column"  alignItems="flex-start" xs={12} md={6} lg={3} >
                <Grid item >
                    <Button
                        variant={item.onCurrentPath || item.isCurrent ? "outlined": "text"}
                        key={item.id}
                        component={item.isCurrent? "div": item.url}
                    >
                        <Typography variant="body1" align="left" className={typProps} >
                            {item.name}
                        </Typography>
                    </Button>
                </Grid>
                
                <Grid item container >
                    <Grid item zeroMinWidth>
                        <ListChildPages id={item.id} typProps={typProps}/> 
                    </Grid>
                </Grid>
            </Grid>))}
        </Grid>    
    </Container>
)
}

const ListChildPages = (props) => {

    const {id, typProps} = props
    const textDataSelector= useMemo (
        makeToolbarEntries, 
        []
      )
      const toolBarEntries =  useSelector (state => 
          textDataSelector(state, id)
        )
     return (   
    <List dense >
            {toolBarEntries.map(litem => (
                <ListItem 
                    button 
                    key={litem.id}
                    component={litem.isCurrent? "button" : litem.url}
                    selected={litem.onCurrentPath}
                >
                    <Typography  variant="body2" className={typProps} noWrap >
                        {litem.name}
                    </Typography>
                 </ListItem>
            ))}
    </List>
     )
}

