import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Beard_man from './Assets/IMG/TMK/Depositphotos_208431120_xl-2015_1.jpg'
import Young_woman from './Assets/IMG/TMK/Depositphotos_23563515_xl-2015_1.jpg'
import Woman from './Assets/IMG/TMK/Depositphotos_79149494_xl-2015_1.jpg'


const images = {
    header: "Клиенты о нас",
    avatars:[
    {
    avatar: Beard_man,
    name: 'Петр Житников',
    title: 'Директор ООО "ЗагородСтрой"',
    speech: 'Быстро. Качественно. Бюджетно. Редко такое встретишь в наше время'
    
   
  },
  {
    avatar: Young_woman,
    name: 'Оксана Костина',
    title: 'Индивидуальный предприниматель',
    speech: 'Очень ответственные, отзывчивые сотрудники, подходят к работе с душой'
  },
  {
    avatar: Woman,
    name: 'Надежда Тополь',
    title: 'Директор ООО "Домашняя Выпечка"',
    speech: 'Удивительное сочетание профессионализма и отсутствия формализма  в работе'

  },
  ]
};

const useStyle = makeStyles (theme => ({
    avatar: {
        width: 200,
        height: 200
    },
    text: {
        textTransform: "uppercase"
    },
    border: {
        border: "solid",
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
        borderRadius: 15,
        // boxShadow: theme.shadows[2]
    },
    paddings:{
        paddingLeft: theme.spacing(2)
    }

}));


export default function IconListWithText(props) {

    /* Данная функция формирует список аватаров 
     * Под аватором указывается должность, организация и прямая речь
     * Аватары  с подписями помещаются в контейнер на белом (бумажном) фоне
     * Максимальная ширина контейнера - 1200 px.
     * Заголовок центрируется по ширине
     */
    const {className} = props
    const iconStyle = useStyle()
    return(
    
        
            <Grid container  justify="space-around"   className={`${className} ${iconStyle.border}`}>
            <Grid item xs={12}>
                <Typography variant="h4"  align="center" className={iconStyle.text}>
                    {images.header}
                </Typography>
            </Grid>
            {images.avatars.map(image => (
                <Grid item container xs={12} md={6} className={iconStyle.paddings} lg={4}  direction="column" alignItems="center" key={image.title}>
                    <Grid item >
                        <Avatar src={image.avatar} className={iconStyle.avatar}/>
                    </Grid>
                    <Grid item >
                        <Typography variant="body1" align="center" >
                            {image.name}
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography variant="body1" align="center" color="secondary">
                            {image.title}
                        </Typography>
                    </Grid>
                    <Grid item >
                        
                        <Typography variant="body1" align="center" >
                            <Icon className="fa fa-quote-left" color="secondary"/>
                            {image.speech}
                        </Typography>
                    </Grid>
                </Grid>
                ))}
            </Grid>
        
   
    );
}
        
