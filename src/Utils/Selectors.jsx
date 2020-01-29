import React from 'react'
import {Link as RouterLink} from 'react-router-dom';
import {createSelector} from 'reselect'
import {blockMap} from '../Mappings/ComponentMap.jsx'


// Функция, извлекающая и нормализующая инофрмацию о заголовке страницы из store
export const pageHeaderPrepare = (state, id=-1) => {
    // console.log("CALL pageHeaderPrepare", id)
    const page_id = id ==-1? state.currentPage: id
    let res = Object.assign({}, state.pages[page_id])
    res = Object.assign(res, {features: res.features.map(item => state.features[item])})
    return res
}

// Создание запоминающего селектора для информации о заголовке. 
// Это НЕ ЗАПОМИНАЮЩИЙ СЕЛЕКТОР И ЭТО ХОРОШО!!!!
export const pageHeaderSelector = createSelector (
    pageHeaderPrepare,
    res => res
)

// Функция, извлекающая из store и нормализующая информацию о блоке
export const blockPrepare = (state, {id, type}) => {
    // console.log("CALL iconBlockPrepare---", id)
    let res = Object.assign({}, state[type][id])
    if (blockMap.hasOwnProperty(type)){
    res = Object.assign(res, {[blockMap[type]]: res[blockMap[type]].map( elem => state[blockMap[type]][elem])})
    }
    return res
}

// Функция создания запоминающего селектора для информации для блока иконок
// Фактически эта функция - factory, создающая селектор. Это надо потому, что на странице
// Могут быть НЕСКОЛЬКО экземпляров блока иконок с РАЗНЫМИ значениями props!!
export const makeBlockSelector = () => {
    // console.log("IN FACTORY")
    return createSelector(
        blockPrepare,
        res => res  
      )
}

const breadCrumbPrepare = (state) => {
    const parser = (node, res) => {
        res.push([state.pages[node].header,state.pages[node].url])
        if (state.tree[node].parent != node) {
            return parser(state.tree[node].parent, res)
        }
    }
    let data = []
    data.push([state.pages[state.currentPage].header, ""])
    // console.log("---IN BC. ПРОШЛО!!!")
    if (state.currentPage == "0") {
        return data
    }
    else {
        parser(state.tree[state.currentPage].parent, data)
    }
    return data.reverse()
}

// Создание запоминающего селектора для информации о хлебных крошках. 
export const breadCrumbSelector = createSelector (
    breadCrumbPrepare,
    res => res
)

const blocksForPagePrepare = (state) => [state.pages[state.currentPage].L,state.pages[state.currentPage].R]    

export const blocksForPageSelector = createSelector (
    blocksForPagePrepare,
    res => res
)
    
const selectEntries = (state, id) => {
    if (state.tree[id].childs) {
    return (    
    state.tree[id].childs.map(elem => ({
        id: elem, 
        onCurrentPath: elem == state.tree[id].current,
        isCurrent: elem == state.currentPage,
        name: state.pages[elem].header,
        hasChilds: state.tree[elem].hasOwnProperty('childs'),
        url: React.forwardRef((itemProps, ref) => {
            return (
                <RouterLink to={state.pages[elem].url} {...itemProps} innerRef={ref}/>
            )})
        })))
    }else {return ([])}
}

export const makeToolbarEntries = () =>{
    return createSelector (
    selectEntries,
    entries => entries
)
    }