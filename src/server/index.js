import 'babel-polyfill';
import fetch from 'isomorphic-fetch'
import React from 'react';
import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import App from './App.jsx'
// import addAsync from '@awaitjs/express'
import { normalize} from 'normalizr';
import { Provider, useSelector, useDispatch } from 'react-redux'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import rootReducer,{setCurrentPage, pageHeadersResponse, pageDetailResponse} from '../Redux/Reducers.jsx'
import {pageSchema, pagesSchema} from '../Schema/schema.jsx'

// import App from '../shared/App'


// const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware(),
//   devTools: true,
//  // preloadedState: initialState
// })
const {addAsync} = require('@awaitjs/express')
const app = addAsync(express())

app.use(cors())

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"))
app.use( function(req, res, next) {

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  return next();

});

app.useAsync(async function(req, res, next) {
  
  console.log("ПУТЬ!!",req)
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    devTools: true,
   // preloadedState: initialState
  })
  const pagesData = await fetch('http://localhost:8000/page/')
  .then(
      response=>{console.log(response); return response.json()},
      error => {console.log('Что-то пошло не так c заголовками', error); return Promise.reject("Эта")})
  .then(
      json => normalize(json, pagesSchema),
      error => console.log(error)
  )
  store.dispatch(pageHeadersResponse(pagesData))
  store.dispatch(setCurrentPage(req.path))
  const pageData = await fetch(`http://localhost:8000/page/${store.getState().currentPage}/`)
  .then(
      response=>response.json(),
      error => {console.log('Что-то пошло не так со страницей', error); return Promise.reject()})
  .then(
      json => normalize(json, pageSchema),
      error => console.log(error)
  )
  store.dispatch(pageDetailResponse(pageData))
  const markup = renderToString(
    <App store={store}/>
  )

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
      </head>

      <body>
        <div id="app">
${markup}</div>
      </body>
    </html>
  `
)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

