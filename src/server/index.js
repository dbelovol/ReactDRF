import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import React from 'react'
import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import App from '../Dispatcher.jsx'
import { normalize} from 'normalizr'
import { Provider} from 'react-redux'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import rootReducer,{setCurrentPage, pageHeadersResponse, pageDetailResponse} from '../Redux/Reducers.jsx'
import {pageSchema, pagesSchema, globaldataSchema} from '../Schema/schema.jsx'
import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { StaticRouter} from "react-router-dom"
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles'
import {API} from '../Mappings/api'

// import App from '../shared/App'
config.autoAddCss = false
library.add(fab, fas, far)

const faStyles = dom.css()
let context = {}

const tmk_theme = responsiveFontSizes( createMuiTheme({
 palette: {
  secondary: { main: '#1565c0' , light: '#1565c0', dark:"#1565c0"},
  primary: { main: '#ff6f00', dark: "#a03304", light: '#ffccbc' }
},
}), {factor: 5});


const {addAsync} = require('@awaitjs/express')
const path = require('path')
const app = addAsync(express())


app.use(cors())

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use('/static', function(req, res, next){
  let encodings = req.get('Accept-Encoding').split(",").map(el => el.trim())
  let extension = req.url.match(/\.js$/)
  if (encodings && extension == ".js") {
    console.log("POSSIBLE ENCODINGS ARE", encodings)
    if (encodings.find(el => el =="br")){
      res.set('Content-Encoding', 'br')
      req.url = req.url + ".br"
    } else {
      if (encodings.find(el => el =="gzip")) {
        res.set('Content-Encoding', 'gzip')
        req.url = req.url + ".gz"
      }
    }
  }
  next()
},
express.static( 'dist/public', {fallthrough: false}))
app.use( function(req, res, next) {

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  return next();

});

app.useAsync(async function(req, res, next) {
  
  console.log("ENVIRONMENT!!",process.env.NODE_ENV)
  const generateClassName = createGenerateClassName({
    productionPrefix: 'jss',
  })
  const sheets = new ServerStyleSheets();
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    devTools: true,
  })
  const pagesData = await fetch(`${API}pagetotal/`)
  .then(
      response=>{ return response.json()},
      error => {console.log('Что-то пошло не так c заголовками', error); return Promise.reject("Эта")})
  .then(
      json => normalize(json, globaldataSchema),
      error => console.log(error)
  )
  store.dispatch(pageHeadersResponse(pagesData))
  store.dispatch(setCurrentPage(req.path))
  if (store.getState().currentPage >=0) {
  const pageData = await fetch(`${API}page/${store.getState().currentPage}/`)
  .then(
      response=>response.json(),
      error => {console.log('Что-то пошло не так со страницей', error); return Promise.reject()})
  .then(
      json => normalize(json, pageSchema),
      error => console.log(error)
  )
  store.dispatch(pageDetailResponse(pageData))
  }
  const markup = renderToString(
    sheets.collect(
    <StylesProvider  generateClassName={generateClassName}>
    <ThemeProvider theme={tmk_theme}>
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <App/>
        </StaticRouter>
      </Provider>
    </ThemeProvider>
    </StylesProvider>  
    
  ))
  
  const preloadedState = store.getState()
  const css = sheets.toString();
  if(context.url) {
    res.redirect(301, "/404")
    context={}
  } else {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <style id="awesome-icons-ssr">${faStyles}</style>
        <style id="jss-server-side">${css}</style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>

      <body>
        <div id="app">${markup}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/static/index.js"></script>
      </body>
    </html>
  `)
  }
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

