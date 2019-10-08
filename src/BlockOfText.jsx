import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const blocks = {
    header: "преимущества аутсорсинга вспомогательных бизнес-процессов",
    blocks:[
    {
    
    content: 'Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat. Sed fermentum auctor elit, nec faucibus mauris tincidunt quis. Nulla a fringilla purus. Ut commodo congue dui id faucibus. Nam eget mi libero. Curabitur sed volutpat mi, eu fermentum purus. Suspendisse mollis vehicula libero, id finibus ex hendrerit commodo. Donec accumsan urna sit amet orci ultrices, quis euismod libero posuere. Ut vel fermentum ligula',
  },
  {
    content: 'Donec quis nisl sit amet purus vulputate imperdiet quis vel ex. Etiam elit tortor, accumsan et ultricies non, volutpat vel odio. Fusce ac diam venenatis, pulvinar ante et, tincidunt mi. Fusce laoreet elit ac felis efficitur, quis porta arcu auctor. Nam pretium, est vitae dignissim finibus, dolor lectus volutpat leo, non efficitur nibh urna luctus tellus. Mauris viverra luctus felis vitae placerat. Ut interdum, magna ac lobortis sollicitudin, odio risus tempus diam, sed pretium augue lacus eu leo. Vivamus accumsan porttitor libero non eleifend. Proin suscipit hendrerit consectetur. Morbi et ex sit amet arcu rhoncus consectetur nec nec ipsum. Cras id justo vel tortor consequat dignissim et id est. Suspendisse cursus sollicitudin rutrum. Proin a est vitae dolor lobortis dignissim a a quam. Sed eget turpis id nunc sagittis hendrerit in sit amet magna. Nulla aliquet quis eros a lacinia. Morbi euismod aliquet ipsum, vel sagittis mauris bibendum ut',
  },
  {
    content: 'Duis pulvinar, ipsum vitae bibendum viverra, erat dolor elementum quam, sed commodo ipsum orci imperdiet enim. Suspendisse ac porta libero. Vivamus purus nisi, hendrerit quis maximus eu, finibus in metus. Donec dignissim, odio at accumsan porttitor, massa tortor ornare diam, vitae efficitur turpis libero in orci. Cras vestibulum nisl ut consectetur volutpat. Duis at interdum lacus. Suspendisse potenti. Vestibulum quis suscipit nisi, et tincidunt ex. Vivamus iaculis odio quis justo venenatis auctor. Maecenas mi eros, accumsan vel rutrum eu, posuere vitae enim. Mauris suscipit ante in eleifend lacinia. Donec hendrerit, tellus in imperdiet ultricies, lacus ex faucibus tellus, et tristique ante lectus et velit. Praesent interdum urna vitae mattis consectetur. Nam vitae orci ut enim sollicitudin pellentesque id sit amet augue.',

  },
  {
    content: 'Maecenas congue tellus et est tristique elementum. Vestibulum malesuada convallis eros vel auctor. Sed blandit non ante at fermentum. Proin sed ullamcorper augue, volutpat mattis risus. Sed ullamcorper sodales arcu. Quisque non blandit felis, id rhoncus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in tincidunt arcu. Suspendisse potenti. Vivamus aliquam nunc id enim ultrices finibus. Nulla a ornare mauris. Maecenas volutpat urna eros, molestie mattis quam malesuada a. Nunc auctor ante in sagittis ornare. Ut luctus nibh nulla, ut tristique est tincidunt a. Donec eget neque ut ipsum tempor consectetur nec id quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
  },
  {
    content: 'Nam aliquet gravida urna, et tincidunt augue mollis nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu pharetra lorem. Maecenas eget facilisis mi. Proin lacus dolor, blandit quis nisl auctor, lacinia pretium ligula. Donec fermentum tortor ac tempus consectetur. Integer auctor tristique scelerisque. Maecenas quis lectus nisl.',
  },

  ]
};

const useStyle = makeStyles (theme => ({
    icon: {
        overflow: "visible"
    },
    text: {
        textTransform: "uppercase"
    },
    border: {
        border: "solid",
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
        borderRadius: 15,
        boxShadow: theme.shadows[2]
    },

}));

export default function BlockOfText(props) {
    
    /* Данный компонент выводит параграф с переменным числом абзацев
     */
    
    const {className} = props
    const iconStyle = useStyle()
    return(
    
        
            <Grid container  justify="center" spacing={8} className={`${className} ${iconStyle.border}`}>
            <Grid item xs={12}>
                <Typography variant="h4" className={iconStyle.text} align="center">
                    {blocks.header}
                </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
            {blocks.blocks.map((image,index) => (
                <Grid item xs={12} key={index} >
                        <Typography variant="body1" align="justify">
                            {image.content}
                        </Typography>
                 </Grid>
                
                ))}
            </Grid>
            </Grid>
        
   
    );
}
        
