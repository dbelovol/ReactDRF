import React, {useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import {makeBlockSelector} from './Utils/Selectors'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        width: 150,
        height: 150
    },
    avatarBorder:{
        borderRadius: "4px"
    },
    text: {
        textTransform: "uppercase"
    },
    color:{
        color: theme.palette.secondary.main
    },
    border: {
        border: "solid",
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
        borderRadius: 15,
        // boxShadow: theme.shadows[2]
    },
    // paddings:{
    //     paddingLeft: theme.spacing(2)
    // },
    item: {
        padding: theme.spacing(2)
      }, 
    subitem: {
        padding: theme.spacing(1)
      },
    header: {
        padding: theme.spacing(5),  
    }

}));


export default function IconListWithText(props) {

    /* Данная функция формирует список аватаров 
     * Под аватором указывается должность, организация и прямая речь
     * Аватары  с подписями помещаются в контейнер на белом (бумажном) фоне
     * Максимальная ширина контейнера - 1200 px.
     * Заголовок центрируется по ширине
     */
    const {className, id} = props
   
    // const {className, side, id} = props
    const iconStyle = useStyle()
    // const position = "U"
    const avatarDataSelector= useMemo (
      makeBlockSelector, 
      []
    )
    const avatarData =  useSelector (state => 
        avatarDataSelector(state, {id: id, type: "avatar_blocks"})
      )
    // console.log(iconData)
    // avatarData.position = "S"
    return(
    
        
            <Grid container  justify="space-around"   className={`${className} `}>
            <Grid item xs={12} className={iconStyle.header}>
                <Typography variant="h4"  align="center" className={iconStyle.text}>
                    {avatarData.header}
                </Typography>
            </Grid>
            {avatarData.avatars.map(image => (
                <Grid 
                    item 
                    container 
                    xs={12} md={6} lg={4}
                    className={iconStyle.item}   
                    direction={avatarData.position == "S"? "row": "column"} 
                    alignItems="center" 
                    key={image.id}>
                    <Grid item className={iconStyle.subitem} xs={avatarData.position == "S"? 6: false}>
                        <Avatar src={image.photo}  className={`${iconStyle.avatar} ${!image.circle ? iconStyle.avatarBorder: ""}`}/>
                    </Grid>
                    <Grid item container direction="column" xs={avatarData.position == "S"? 6: false} alignItems="center">
                        <Grid item className={iconStyle.subitem}>
                            <Typography variant="body1" align="center" >
                                {image.name}
                            </Typography>
                        </Grid>
                        <Grid item className={iconStyle.subitem}>
                            <Typography variant="body1" align="center" color="secondary">
                                {image.position}
                            </Typography>
                        </Grid>
                        <Grid item className={iconStyle.subitem}>
                            
                            <Typography variant="body1" align="center" >
                                <FontAwesomeIcon icon={['fas', 'quote-left']} className={iconStyle.color}/>

                                {image.speech}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                ))}
            </Grid>
        
   
    );
}
        
