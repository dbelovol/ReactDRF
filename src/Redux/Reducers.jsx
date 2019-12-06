import React from 'react';
import {createSlice} from'redux-starter-kit'
import { slugify as address} from 'transliteration';
import urlJoin from 'url-join';
import { normalize} from 'normalizr';
import {pageSchema, pagesSchema} from '../Schema/schema.jsx'
// import {initialState} from './InitialState.jsx'


function markCurrent(node,tree) {
    // Функция формирует поля current. 
    // Нужно для подсветки текущего пути. 
    console.log(node, tree[node].parent)
    if (tree[node].parent != node) {
        tree[tree[node].parent].current = node
        markCurrent (tree[node].parent,tree)
    }
}

function makeUrl (prev_node,tree,level, url, pages){
    // Функция формирует полные url-адреса страниц
    console.log(pages)
    if (tree[prev_node].childs) {
        tree[prev_node].level = level
        pages[prev_node].url= address(url)
        for (const i of tree[prev_node].childs.values()) {
            makeUrl (i,tree,level+1, urlJoin(url, address( pages[i].url)), pages)
        }
    }
     else {
         tree[prev_node].level = level
         pages[prev_node].url= address(url)

    }
}

function makeStartTree(start_tree) {
    // Функция формирует структуру данных для работы с компонентом заголовка
    // страницы. В объекте содержаться следующие данные
    // Ключ - номер страницы
    // Значение - объект, содержащий
    //      ключ childs - массив с номерами дочерних страниц
    //      ключ parent - номер родительской страницы
    //      ключ current - является ли страница либо какой-либо ее потомок текущими
    //                     пишется номер текущей страницы
    // На вход получает объект, у которого заполнены только ключи parent
    // Отдает заполненными ключи childs 
    for (let [key,value] of Object.entries(start_tree)) {
        if (start_tree[value.parent].childs) { 
            start_tree[value.parent].childs.push(key)
        }
        else {
            start_tree[value.parent].childs=[]
            start_tree[value.parent].childs[0]=key
        }
    }
    //  Из списка дочерних страниц корнево страницы(нулевой) удаляется ссылка на себя
    //  Нужно, чтобы корректно работали компоненты, работающе с данной структурой
    const ind = start_tree[0].childs.findIndex((el) => el == 0)
    start_tree[0].childs.splice(ind,(ind >= 0 ? 1 :0))
}


const testSlice = createSlice ({
    initialState: {
        isFetching: false,
        isLoaded: false,
    },
    reducers:{
        pageHeadersRequest: (state, action) => {
            state.isFetching = true
        },
        pageHeadersResponse: (state, action) => {
            state.isFetching = false
            state.isLoaded = true
            state.start_tree = {}
            state.pages = action.payload.entities.pages
            console.log(state.pages)
            //  После загрузки информации по заголовкам
            //  страниц очевидно пока не загружено ни одной.
            //  Поэтому по каждой странице устанавливаем isLoaded = false
            //  Кроме того, инициализируем ДЛЯ КАЖДОЙ СТРАНИЦЫ isFetching
            Object.entries(state.pages).forEach(([key, value]) =>{
                state.start_tree[key]={parent: value.parent}
                value.isFetching = false
                value.isLoaded = false
            })
            // Размечаем данные для работы с компонентом заголовка
            makeStartTree(state.start_tree)
            console.log(state.start_tree)
            // Формируем полные адреса страниц
            makeUrl(0, state.start_tree, 0, "/", state.pages)
        },
        pageDetailRequest: (state, action) => {
            state.pages[action.payload].isFetching = true
        },
        pageDetailResponse: (state, action) => {
            let id = action.payload.result.id
            state.pages[id].isFetching = false
            state.pages[id].isLoaded = true
            // Смысл - надо оставить в state.pages[id] пары ключ-значение, которых
            // нет в action.payload.result. При этом state.pages[id] уже ОБЯЗАТЕЛЬНО
            // ЕСТЬ!
            Object.assign(state.pages[id], action.payload.result)
            // То же самое, НО state[key] МОЖЕТ НЕ БЫТЬ. ПОэтому проверяем
            // и если нет - то просто присваиваем 
            for (let [key,value] of Object.entries(action.payload.entities)) {
                if (state[key]) {
                    Object.assign(state[key], value)
                }
                else{
                    state[key] = value
                } 
            } 

        },
        setCurrentPage:(state,action)=> {
            let currentPage = state.pages.find((page)=> page.url === action.payload)
            state.currentPage = currentPage ? currentPage.id : -1
            for (let [key,value] of Object.entries(state.tree)) {
                state.tree[key].current = 0
            }
            if (state.currentPage >= 0) {
                markCurrent(state.currentPage,state.tree)
            }
        },
        setCurrentHeaders:(state,action) => {
            state.tree.map(el=> el.current = 0)
            if (state.currentPage >= 0) {
                
                markCurrent(action.payload,state.tree)
            }
        }
    }});

export function fetchPages() {
    return function(dispatch) {
        // взводим загрузку информации по страницам
        dispatch(pageHeadersRequest())
        return (fetch('http://localhost:8000/page/')
        .then(
            response=>{console.log(response); return response.json()},
            error => {console.log('Что-то пошло не так c заголовками', error); return Promise.reject("Эта")})
        .then(
            json => {console.log ("мы здесь"); dispatch(pageHeadersResponse(normalize(json, pagesSchema)))},
            error => console.log(error)
        ))
    }
}

export function fetchPage(pageid) {
    return function(dispatch) {
        // взводим загрузку информации по страницам
        dispatch(pageDetailRequest(pageid))
        return fetch(`http://localhost:8000/page/${pageid}`)
        .then(
            response=>response.json(),
            error => {console.log('Что-то пошло не так со страницей', error); return Promise.reject()})
        .then(
            json => dispatch(pageDetailResponse(normalize(json, pageSchema)))
        )
    }
}

export function fetchPagesIfNeeded() {
    return function (dispatch, getState) {
        if (!getState().isLoaded && !getState().isFetching) {
            return dispatch (fetchPages())
        }
        else {
            return Promise.resolve()
        }
    }
}

export function fetchPageIfNeeded(pageid) {
    return function (dispatch, getState) {
        if (pageid && !getState().pages[pageid].isLoaded) {
            return dispatch (fetchPage(pageid))
        }
        else {
            return Promise.resolve()
        }
    }
}

export const {setCurrentPage, setCurrentHeaders, pageDetailRequest, pageDetailResponse,
              pageHeadersRequest, pageHeadersResponse               
} = testSlice.actions

export default testSlice.reducer
