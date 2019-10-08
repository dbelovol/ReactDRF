import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const images = {
    header: "Преимущества работы с нами",
    icons:[
    {
    icon: "fa fa-laptop",
    title: 'Используем современные технологии',
    
   
  },
  {
    icon: "fa fa-pen-square",
    title: 'Работаем по договору',
    
  },
  {
    icon: 'fa fa-boxes',
    title: 'Оказываем комплексные услуги',

  },
  {
    icon: "fa fa-trash",
    title: 'Выполняем ликвидацию в минимально возможные сроки',
    
   
  },
  {
    icon: "fa fa-certificate",
    title: 'Гарантируем успешную регистрацию',
    
  },
  {
    icon: 'fa fa-people-carry',
    title: 'Применяем индивидуальный подход к клиенту',

  },
  ]
};

const useStyle = makeStyles ({
    icon: {
        overflow: "visible"
    },
    text: {
        textTransform: "uppercase"
    }

});

export default function IconListWithText(props) {

    /* Данная функция формирует список иконок с подписью под ними
     * Иконки с подписями помещаются в контейнер на белом (бумажном) фоне
     * Максимальная ширина контейнера - 1200 px.
     * Заголовок центрируется по ширине
     */
    const {className} = props
    const iconStyle = useStyle()
    return(
    
        
            <Grid container  justify="space-around" spacing={8} className={className}>
            <Grid item xs={12}>
                <Typography variant="h4" className={iconStyle.text} align="center">
                    {images.header}
                </Typography>
            </Grid>
            {images.icons.map(image => (
                <Grid item container xs={12} md={6} lg={4} spacing={2} direction="column" alignItems="center" key={image.title}>
                    <Grid item >
                        <Icon className={`${iconStyle.icon} ${image.icon}`} fontSize="large" color="secondary" />
                    </Grid>
                    <Grid item >
                        <Typography variant="h6" align="center" className={iconStyle.text}>
                            {image.title}
                        </Typography>
                    </Grid>
                </Grid>
                ))}
            </Grid>
        
   
    );
}
        
