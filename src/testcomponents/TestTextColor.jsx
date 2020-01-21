import React from 'react';


import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function MyTypography(props) {
    return(
        <Typography variant="body1" color={props.test ? "primary": "secondary"}>
        {props.children}
        </Typography>
    )
}


export default function TestText(props) {
    
    return (
        <Button test="true" >
            {props => 
            <MyTypography>
                Это я
            </MyTypography>}
        </Button>
    )}
    
    
    
