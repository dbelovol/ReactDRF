import React from 'react';
import ReactDOM from 'react-dom'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { Provider, useSelector, useDispatch } from 'react-redux'
//import Test from "./test";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {fetchPagesIfNeeded} from './Redux/Reducers.jsx'
// import mediaQuery from 'css-mediaquery';

//import Parallax from "./Parallax";
//import Button from "./Buttons.jsx";
//import Scroll from "./scrollTrigger.jsx";
//import TestTextColor from "./TestTextColor.jsx";
//port ButtonBase from "./Butt_base.jsx";
import TestHook from "./TestHook.jsx";
//import TestHook_1 from "./TestHook_1.jsx";
//import TestParallax from "./TestParallax.jsx";
//import Hover from "./TestHover.jsx"
import InitialState from "./Redux/InitialState.jsx"
//import 'typeface-roboto-cyrillic'
import '@fortawesome/fontawesome-free/css/all.css'
import rootReducer from './Redux/Reducers.jsx'
import Dispatcher, {Page404} from './Dispatcher.jsx'
import {initialState} from './Redux/InitialState.jsx'
import Normalize from './Normalize.jsx'
import Test from './test.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import {setCounter} from './Redux/Reducers.jsx'


// Данный прием позволяет импортировать все картинки 
function importAll(r) {
        r.keys().forEach(r);
}
importAll(require.context('./Assets/IMG/TMK/',false,/\.jpg$/));

library.add(fab, fas, far)

const tmk_theme = responsiveFontSizes( createMuiTheme({
 palette: {
  primary: { main: '#7a758c' , light: '#f3e5f5'},
  secondary: { main: '#e54a07', dark: "#a03304", light: '#ffccbc' }
},
// props: {
//     // Change the default options of useMediaQuery
//     MuiUseMediaQuery: { ssrMatchMedia: browserMatchMedia },
//   },
}), {factor: 5});



const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    devTools: true,
   // preloadedState: initialState
})
// const browserMatchMedia = query => ({
//     matches: mediaQuery.match(query, {
//       // The estimated CSS width of the browser.
//       type: "screen",
//       width: '1024px'
//     }),
//   });

// console.log (browserMatchMedia('(min-width:600px)'))
// console.log (window.matchMedia('(min-width:600px)'))

const ConditionalSwitch = () => {
    const isLoaded = useSelector( state=> state.isLoaded)
    const isFetching = useSelector( state=> state.isFetching)
    console.log("IN MAIN")
    useDispatch()(fetchPagesIfNeeded())
    return (
        <>
            {isFetching && <div>Loading pages structure</div> }
            {isLoaded &&
            <Switch>
                <Route path="/404" component={Page404}/>
                <Route component={Dispatcher}/>
            </Switch>   
            }
        </>
    )
}

const TestSelector = () => {
    useDispatch()(setCounter(100))
    const counter = useSelector(state => state.counter)
    return <div>Имеем counter = {counter}</div>
}

ReactDOM.render(
<ThemeProvider theme={tmk_theme}>
    <Provider store={store}>
         <Router>
            <ConditionalSwitch/>  
        </Router>
    </Provider>
 </ThemeProvider>
, document.getElementById("app"));

// ReactDOM.render(
   
//         <Provider store={store}>
//              <Router>
//                 <TestSelector/>  
//             </Router>
//         </Provider>
    
//     , document.getElementById("app"));