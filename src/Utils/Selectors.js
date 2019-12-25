import {createSelector} from 'reselect'

// Функция, извлекающая и нормализующая инофрмацию о заголовке страницы из store
export const pageHeaderPrepare = (state, id=-1) => {
    let page_id = id ==-1? state.currentPage: id
    let res = Object.assign({}, state.pages[page_id])
    res = Object.assign(res, {features: res.features.map(item => state.features[item])})
    return res
}

// Создание запоминающего селектора. 
export const pageHeaderSelector = createSelector (
    pageHeaderPrepare,
    res => res
)