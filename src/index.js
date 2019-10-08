import React from 'react';
import ReactDOM from 'react-dom'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { Provider } from 'react-redux'
//import Test from "./test";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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
import '@fortawesome/fontawesome-free/css/all.min.css'
import rootReducer from './Redux/Reducers.jsx'
import Dispatcher, {Page404} from './Dispatcher.jsx'
import {initialState} from './Redux/InitialState.jsx'
import Test from './test.jsx'


// Данный прием позволяет импортировать все картинки 
function importAll(r) {
        r.keys().forEach(r);
}
importAll(require.context('./Assets/IMG/TMK/',false,/\.jpg$/));


const tmk_theme = responsiveFontSizes( createMuiTheme({
 palette: {
  primary: { main: '#7a758c' , light: '#f3e5f5'},
  secondary: { main: '#e54a07' }
}
}), {factor: 5});


const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    devTools: true,
    preloadedState: initialState
})



ReactDOM.render(
<ThemeProvider theme={tmk_theme}>
    <Provider store={store}>
         <Router>
            <Switch>
                <Route path="/404" component={Page404}/>
                <Route component={Dispatcher}/>
            </Switch>    
        </Router>
    </Provider>
 </ThemeProvider>
, document.getElementById("app"));
