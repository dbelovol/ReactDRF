import React,{useEffect} from 'react';
import ReactDOM from 'react-dom'; 
import {BrowserRouter as Router} from 'react-router-dom'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { Provider } from 'react-redux'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import rootReducer from '../Redux/Reducers.jsx'
import App from '../Dispatcher.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(fas)

const tmk_theme = responsiveFontSizes( createMuiTheme({
 palette: {
  secondary: { main: '#1565c0' , light: '#1565c0', dark:"#1565c0"},
  primary: { main: '#ff6f00', dark: "#a03304", light: '#ffccbc' }
},
}), {factor: 5});


const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    devTools: true,
    preloadedState: window.__PRELOADED_STATE__ 
})

delete window.__PRELOADED_STATE__ 

function Main () {
    useEffect(() => {
        const jssStyles = document.getElementById('jss-server-side');
        const faStyles = document.getElementById("awesome-icons-ssr");
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
        if (faStyles) {
            faStyles.parentElement.removeChild(faStyles);
          }
      }, []);
    return (
        <ThemeProvider theme={tmk_theme}>
            <Provider store={store}>
                <Router>
                    <App/>  
                </Router>
            </Provider>
        </ThemeProvider>
    )
}


ReactDOM.hydrate(
<Main/>
, document.getElementById("app"));
