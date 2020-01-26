import React from 'react';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useSelector, useDispatch} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {createSelector} from 'reselect'
import {Helmet} from 'react-helmet'
import {setCurrentPage, fetchPageIfNeeded, fetchPagesIfNeeded} from './Redux/Reducers.jsx'
import TestHook from './TestHook.jsx'

// Селекторная функция запоминающего селектора
const retrieveMeta = (glob_tags, glob_attrs, mode=true) => {
    const attrArray = mode ? "glob_attrs" : "attrs"
    let ret_state = 
    glob_tags ? 
    Object.entries(glob_tags).map(([id, el]) =>{
        // Имя глобального тэга
        const tag_name = el.tag_name
        // Значение глобального тэга. Проверка нужна потому, что 
        // если значения нет, то передавать в createElement надо null
        // а мы в этом случае из базы получаем ""
        const tag_value = el.tag_value ? el.tag_value : null
        // Атрибуты тэга. Здесь важно помещение в формируемый объект ключа тэга
        // Это нужно Реакту при рендеринге
        const tag_attrs = el[attrArray].map(attr => ({
           [glob_attrs[attr].attr_name]: glob_attrs[attr].attr_value 
        })).reduce((acc, el) => ({...acc, ...el}), {key: el.id})
         return React.createElement(tag_name, tag_attrs, tag_value)
    }) :""
    return ret_state
}   

// Запоминающий селектор, извлекающий глобальные метатеги
const globalMetaTagSelector = createSelector (
    [state => state.glob_tags, state=> state.glob_attrs],
    retrieveMeta
)

// Запоминающий селектор, извлекающий локальные метатеги

const localMetaTagSelector = createSelector (
    [(state, id)=> {console.log("IDIDI", id);return id == -1 ? []: state.pages[id].page_tags}, 
    (state, _)=> state.page_tags, 
    (state,_) => state.attrs,
    (state, id) => state.currentPage != -1 ? state.pages[id].isLoaded: false],
    (page_tag_ids, page_tags, page_attrs, isLoaded) => {
        console.log("ВОТ ЧТО ВОШЛО!!!!", page_tag_ids, page_tags, page_attrs)
        const result = isLoaded ? page_tag_ids.map(el => ({[el]: page_tags[el]})).reduce((acc,el)=> ({...acc, ...el}), {}): " Мимо!!!"
        console.log("ВОТ ЧТО ВЫШЛО!!!!", result)
        return isLoaded ? retrieveMeta(
             result, 
             page_attrs, false) :""
         }

)

export default function ConditionalSwitch () {
    const isLoaded = useSelector( state=> state.isLoaded)
    const isFetching = useSelector( state=> state.isFetching)
    const globalMetas = useSelector(globalMetaTagSelector)
    const defaultTitle = useSelector(state => state.data ?
        Object.entries(state.data).find(([key,item])=> item.item_name == 'defaultTitle')[1].item_value:
         "ТМКПлюс")
    console.log("!!!!!!!!!МЕТАТЭГИ", globalMetas)
    console.log("IN MAIN")
    useDispatch()(fetchPagesIfNeeded())
    return (
        <>
            {isFetching && <div>Loading pages structure</div> }
            {isLoaded &&
            <div>
                <Helmet defaultTitle={defaultTitle}>
                    {globalMetas} 
                </Helmet>
                <Switch>
                    <Route path="/404" component={Page404}/>
                    <Route component={Dispatcher}/>
                </Switch> 
            </div>
              
            }
        </>
    )
}



function Dispatcher(props) {
    // Данная функция устанавливает текущую страницу
    // Имя страницы содержится в параметре props.location.pathname
    // Данный параметр передается React Routerом 
    // Идентификатор текущей страницы заносится в ключ currentPage Redux's state
    // Это делается при помощи аction setCurrentPage
    // Если страницы с указанным адресом нет - то номер текущей приравнивается -1
    console.log ("In dispatcher")
    useDispatch()(setCurrentPage(props.location.pathname))
    const page  = useSelector (state => {console.log(`Текущая страница -  ${state.currentPage}`); return state.currentPage})
    console.log("ТЕКУЩАЯ СТРАНИЦА ОДНАКО!!!", page)
    return (page ? <PageDrawer page={page}/>:
    <div>{(() => {console.log("ОППАНЬКИ!!"); return("Переключаемся на затребованную страницу")})()}</div>)
}


function PageDrawer ({page}) {
    useDispatch()(fetchPageIfNeeded(page))
    // const page  = useSelector (state => state.currentPage)
    const isLoaded = useSelector (state => page !=-1 ? state.pages[page].isLoaded: false)
    const isFetching = useSelector (state => page !=-1 ? state.pages[page].isFetching: false)
    const localMetas = useSelector(state => localMetaTagSelector(state, page))
     console.log("PageDrawer", isFetching, isLoaded)
    return (
    page == -1 ?
    // Если страница не найдена - выводим страницу 404
    // Если найдена - то вызывается компонент, рендерящий ее.
    // Важно - указание key={page} приводит к созданию НОВОГО КОМПОНЕНТА
    // Делается для того, чтобы при нажатии на ссылку в header страницы
    // закрывалось все - в том числе Popper с навигацией. 
    <Redirect to="/404"/> : 
    (isFetching ? <div>{`Грузим страницу номер ${page}`}</div> :
    (isLoaded && 
        <div>
            <Helmet>
                {localMetas}
            </Helmet>
            <TestHook key={page} page={page}/>
        </div>
    )
    ))}
    
export function Page404 () {
    // const status = useMediaQuery('(min-width:600px)')
    return(
    <div>
    {`Page  Not Found!!!`}
    </div>
    )
}

