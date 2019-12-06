import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {setCurrentPage, fetchPageIfNeeded, fetchPagesIfNeeded} from './Redux/Reducers.jsx'
import TestHook from './TestHook.jsx'

export default function Dispatcher(props) {
    // Данная функция устанавливает текущую страницу
    // Имя страницы содержится в параметре props.location.pathname
    // Данный параметр передается React Routerом 
    // Идентификатор текущей страницы заносится в ключ currentPage Redux's state
    // Это делается при помощи аction setCurrentPage
    // Если страницы с указанным адресом нет - то номер текущей приравнивается -1

    useDispatch()(setCurrentPage(props.location.pathname))
    // console.log("ЭТА!!!   ", props.location.pathname)
    return (<PageDrawer/>)
}


function PageDrawer () {
    useDispatch()(fetchPagesIfNeeded(page))
    const page  = useSelector (state => state.currentPage)
    const isLoaded = useSelector (state => currentPage !=-1 ? state.pages[state.currentPage].isLoaded: false)
    const isFetching = useSelector (state => currentPage !=-1 ? state.pages[state.currentPage].isFetching: false)
    // console.log("PageDrawer")
    return (
    page == -1 ?
    // Если страница не найдена - выводим страницу 404
    // Если найдена - то вызывается компонент, рендерящий ее.
    // Важно - указание key={page} приводит к созданию НОВОГО КОМПОНЕНТА
    // Делается для того, чтобы при нажатии на ссылку в header страницы
    // закрывалось все - в том числе Popper с навигацией. 
    <Redirect to="/404"/> : 
    (isFetching ? <div>{`Грузим страницу номер ${page}`}</div> :
    (isLoaded && <TestHook key={page} page={page}/>)
    
        // page == 0 ? <TestHook/> :<RenderPage page={page}/>
    
    
    ))}
    
export function Page404 () {
    return(
    <div>
    Page Not Found!!!
    </div>
    )
}

