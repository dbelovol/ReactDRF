import React, {useState, useEffect, useRef,} from 'react';
import {Container, Paper, Typography, Popper, Fade} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

export default function Hover (){
    const [hovered, setHover]=useState(false)
    const [target, setTarget]=useState({curr: "null", tar: "null", anchorEl: document.window})
    
    return(
        <Container fixed onMouseOver={(e) => setTarget({tar:e.target.getAttribute("mey"), curr:e.currentTarget.getAttribute("mey"), anchorEl: e.target})} mey={1}>
            
            <Paper style={{height: "40vh"}} mey={2} onMouseOut={() => setHover(false)} onMouseOver={() => setHover(true)}
            modifiers={{
      arrow: {
        enabled: true,
      },
    }}
            > 
                <Popper  open={hovered}  anchorEl={target.anchorEl} transition >
                    {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography variant="h5">The content of the Popper.</Typography>
                        </Paper>
                    </Fade>
                    )}
                </Popper>
                <Typography variant="h6"> {hovered? "HOVERED": "NOT HOVERED"}</Typography>
                <Typography variant="h6"> {target.curr}</Typography>
                <Typography variant="h6" mey={6}> {target.tar}</Typography>
            </Paper>
        </Container>
    )}
