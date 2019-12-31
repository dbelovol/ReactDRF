import {createSelector} from 'reselect'
import {blockMap} from '../Mappings/ComponentMap.jsx'

// Функция, извлекающая и нормализующая инофрмацию о заголовке страницы из store
export const pageHeaderPrepare = (state, id=-1) => {
    console.log("CALL pageHeaderPrepare", id)
    const page_id = id ==-1? state.currentPage: id
    let res = Object.assign({}, state.pages[page_id])
    res = Object.assign(res, {features: res.features.map(item => state.features[item])})
    return res
}

// Создание запоминающего селектора для информации о заголовке. 
export const pageHeaderSelector = createSelector (
    pageHeaderPrepare,
    res => res
)

// Функция, извлекающая из store и нормализующая информацию о блоке
export const blockPrepare = (state, {id, type}) => {
    console.log("CALL iconBlockPrepare---", id)
    let res = Object.assign({}, state[type][id])
    res = Object.assign(res, {[blockMap[type]]: res[blockMap[type]].map( elem => state[blockMap[type]][elem])})
    return res
}

// Функция создания запоминающего селектора для информации для блока иконок
// Фактически эта функция - factory, создающая селектор. Это надо потому, что на странице
// Могут быть НЕСКОЛЬКО экземпляров блока иконок с РАЗНЫМИ значениями props!!
export const makeBlockSelector = () => {
    console.log("IN FACTORY")
    return createSelector(
        blockPrepare,
        res => res  
      )
}
    
