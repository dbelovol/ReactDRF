import React from 'react'
import {StaticRouter as Router} from 'react-router-dom'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { Provider, useSelector, useDispatch } from 'react-redux'
import rootReducer from '../Redux/Reducers.jsx'
import {setCounter} from '../Redux/Reducers.jsx'
///
///
///
///
export default  ({store}) => {
    return (
    <Provider store={store}>
             <Router>
                <TestSelector/>  
            </Router>
    </Provider>)
}

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware(),
//     devTools: true,
//    // preloadedState: initialState
// })

const TestSelector = () => {
    useDispatch()(setCounter(100))
    const counter = useSelector(state => state.counter)
    const pageHeader = useSelector(state => state.pages[state.currentPage].header)
    const iconBlock = useSelector(state => state.pages[state.currentPage].icon_blocks[0]["order"])
    return <><div>Имеем counter = {counter}</div>
            <div>Имеем header = {pageHeader}</div>
            <div>Имеем iconBlock = {iconBlock}</div>
            </>
}


