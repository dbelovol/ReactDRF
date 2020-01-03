import React from 'react';
import {useSelector} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import {breadCrumbSelector} from './Utils/Selectors'

export default function BreadCrumbs(props){
    /*
    Компонент, реализующий хлебные крошки
    */

    // Информация для компонента извлекается из store при помощи 
    // запоминающего селектора
    // Данные возвращаются массивом двумерных массивов,
    //  Нулевой элемент - название страницы, первый - ссылка на нее
    const bcData = useSelector (breadCrumbSelector)
    const {className} = props 
    
    return (
    <Breadcrumbs className={className}>
        {bcData.slice(0,-1).map( el=>
            <Link 
                key={el[1]}
                component={React.forwardRef((itemProps, ref) => (
                // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
                    <RouterLink to={el[1]} {...itemProps} innerRef={ref} />
                ))}
            >
                {el[0]}
            </Link>
            )}
            {/* Последний элемент - текущая страница. Вводится без ссылки и выделяется цветом */}
            <Typography color="secondary">
                {bcData[bcData.length-1][0]}
            </Typography>
    </Breadcrumbs>
    )
} 
