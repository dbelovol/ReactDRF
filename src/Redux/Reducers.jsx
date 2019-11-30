import React from 'react';
import {createSlice} from'redux-starter-kit'
import {initialState} from './InitialState.jsx'


function markCurrent(node,tree) {
    console.log(node, tree[node].parent)
    if (tree[node].parent != node) {
        tree[tree[node].parent].current = node
        markCurrent (tree[node].parent,tree)
    }
}

const testSlice = createSlice ({
//    initialState: initialState,
    reducers:{
        pageHeadersRequset: (state, action) => {
            state.isFetching = True
        },
        pageHeadersResponse: (state, action) => {

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


export const {setCurrentPage, setCurrentHeaders} = testSlice.actions

export default testSlice.reducer
