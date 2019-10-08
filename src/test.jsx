import React from 'react'
import {useSelector} from 'react-redux'

export default function Test() {
   // const name = useSelector (state => state.pages[2].name)
    const name1 = "Бухгалтерские услуги"

return (
<div>
<div>{name}</div>
<div>{name1}</div> 
<div>Бухгалтесркие услуги</div>   
<div>{name.charCodeAt(1)}</div>
</div>
)
}