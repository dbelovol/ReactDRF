import React from 'react'
import {componentMap} from "./Mappings/ComponentMap.jsx"

export default function BlockRenderer(props) {
    const {page_id, data, className, side} = props

    return (
        data.map( ([type, id]) =>{
            const Comp = componentMap[type] 
            return (
                <Comp className={className} id={id} key={`${type}${id}`} page_id={page_id} side={side}/>
            )
        })

    )

}