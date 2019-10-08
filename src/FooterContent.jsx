import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";

const footerData = [{
    header: "Компания",
    entries:[
    "О Компании", "Вопросы и ответы", "Карьера", "Новости"
    ],
    },
    {    
    header: "Бухгалтерские услуги",
    entries:[
    "Бухгалтерское обслуживание", "Восстановление отчетности", "Комплексное обслуживание", "Разовое бухгалтерское обслуживание"
    ],
    },
    {    
    header: "Кадровый аутсорсинг",
    entries:[
    "Ведение кадрового учета", "Кадровый аудит", "Кадровый консалтинг", "Восстановление кадровой суперпупер документации", 
    ],
    },
    {
    header: "Регистрация и ликвидация",
    entries:[
    "Регистрация ООО, ИП", "Регистрация НКО", "Внесение изменений в ЕГРЮЛ", "Регистрация филиала", "И еще одна некая фигня"
    ],
    },
]    
        
/* Вычисляется максимальное количество ссылок в разделах подвала
 * Делается для выравнивания ссылок в случае когда в разделах 
 * количество ссылок неодинаково (а так будет всегда)
 * Смысл в том, что разделы с меньшим количесвом ссылок
 * добиваются ПУСТЫМИ ССЫЛКАМИ с жестким пробелом (&nbsp;) в качестве содержимого
 */

const maxNumEntries = footerData.reduce ( (accumulator, currentWalue) => (currentWalue.entries.length ? 
                                                (accumulator < currentWalue.entries.length? currentWalue.entries.length:accumulator) : accumulator),0)

// console.log (maxNumEntries)

export default function FooterContent(props) {
    
    /* Компонент формирует список ссылок на страницы, располагаемый в подвале
     * 
     */
    
    const {containerStyle, typProps, className}= props;

return (

    <Container className={`${containerStyle} ${className}`} style={{marginTop: "30px"}}fixed maxWidth="lg">
    <Grid container>
    {footerData.map(item => (
        <Grid item  key={item.header}container  direction="column"  justify="space-between" xs={12} md={6} lg={3} >
            <Grid item >
            <Typography variant="h6" className={typProps} >
                   {item.header}
            </Typography>
            </Grid>
           
            <Grid item container  >
           <Grid item zeroMinWidth>
           <List dense >
            {item.entries.map(litem => (
                <ListItem button key={litem}>
                       <Typography  variant="body2" className={typProps} noWrap >
                       {litem}
                       </Typography>
                 </ListItem>
                 ))}
            {/*Смысл кульбита такой. 
               Array.from({length: x}) создает массив размерности x, где каждый элемент - undefined.
               Мы в качестве x используем число, равное количеству недостающих ссылок
               в текущем разделе ссылок до раздела с максимальным их числом ссылок
               Такая форма нужна для получения стабильного уникального значения для key
               Затем на его основе рендеряться упомянутые выше пустые ссылки
               Все это - для выравнивания ссылок по горизонтали
                */}
            { Array.from({length: maxNumEntries-item.entries.length}, 
                            (x,i) => <ListItem key={i} button disabled>
                                    <Typography  variant="body2" className={typProps} noWrap >
                                        &nbsp;
                                    </Typography>
                                </ListItem>)
            }
            </List>
            </Grid>
            </Grid>
            
        </Grid>))}
    </Grid>    
    </Container>
)
}

