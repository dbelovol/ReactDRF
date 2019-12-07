/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Redux/Reducers.jsx":
/*!********************************!*\
  !*** ./src/Redux/Reducers.jsx ***!
  \********************************/
/*! exports provided: fetchPages, fetchPage, fetchPagesIfNeeded, fetchPageIfNeeded, setCurrentPage, setCurrentHeaders, pageDetailRequest, pageDetailResponse, pageHeadersRequest, pageHeadersResponse, setCounter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchPages\", function() { return fetchPages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchPage\", function() { return fetchPage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchPagesIfNeeded\", function() { return fetchPagesIfNeeded; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchPageIfNeeded\", function() { return fetchPageIfNeeded; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCurrentPage\", function() { return setCurrentPage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCurrentHeaders\", function() { return setCurrentHeaders; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageDetailRequest\", function() { return pageDetailRequest; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageDetailResponse\", function() { return pageDetailResponse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageHeadersRequest\", function() { return pageHeadersRequest; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageHeadersResponse\", function() { return pageHeadersResponse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCounter\", function() { return setCounter; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_starter_kit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-starter-kit */ \"redux-starter-kit\");\n/* harmony import */ var redux_starter_kit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_starter_kit__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var transliteration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! transliteration */ \"transliteration\");\n/* harmony import */ var transliteration__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(transliteration__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var url_join__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! url-join */ \"url-join\");\n/* harmony import */ var url_join__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(url_join__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! normalizr */ \"normalizr\");\n/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(normalizr__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Schema_schema_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Schema/schema.jsx */ \"./src/Schema/schema.jsx\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n // import {initialState} from './InitialState.jsx'\n\nfunction markCurrent(node, tree) {\n  // Функция формирует поля current. \n  // Нужно для подсветки текущего пути. \n  console.log(node, tree[node].parent);\n\n  if (tree[node].parent != node) {\n    tree[tree[node].parent].current = node;\n    markCurrent(tree[node].parent, tree);\n  }\n}\n\nfunction makeUrl(prev_node, tree, level, url, pages) {\n  // Функция формирует полные url-адреса страниц\n  console.log(pages);\n\n  if (tree[prev_node].childs) {\n    tree[prev_node].level = level;\n    pages[prev_node].url = Object(transliteration__WEBPACK_IMPORTED_MODULE_2__[\"slugify\"])(url);\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = tree[prev_node].childs.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var i = _step.value;\n        makeUrl(i, tree, level + 1, url_join__WEBPACK_IMPORTED_MODULE_3___default()(url, Object(transliteration__WEBPACK_IMPORTED_MODULE_2__[\"slugify\"])(pages[i].url)), pages);\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator.return != null) {\n          _iterator.return();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  } else {\n    tree[prev_node].level = level;\n    pages[prev_node].url = Object(transliteration__WEBPACK_IMPORTED_MODULE_2__[\"slugify\"])(url);\n  }\n}\n\nfunction makeStartTree(start_tree) {\n  // Функция формирует структуру данных для работы с компонентом заголовка\n  // страницы. В объекте содержаться следующие данные\n  // Ключ - номер страницы\n  // Значение - объект, содержащий\n  //      ключ childs - массив с номерами дочерних страниц\n  //      ключ parent - номер родительской страницы\n  //      ключ current - является ли страница либо какой-либо ее потомок текущими\n  //                     пишется номер текущей страницы\n  // На вход получает объект, у которого заполнены только ключи parent\n  // Отдает заполненными ключи childs \n  for (var _i = 0, _Object$entries = Object.entries(start_tree); _i < _Object$entries.length; _i++) {\n    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),\n        key = _Object$entries$_i[0],\n        value = _Object$entries$_i[1];\n\n    if (start_tree[value.parent].childs) {\n      start_tree[value.parent].childs.push(key);\n    } else {\n      start_tree[value.parent].childs = [];\n      start_tree[value.parent].childs[0] = key;\n    }\n  } //  Из списка дочерних страниц корнево страницы(нулевой) удаляется ссылка на себя\n  //  Нужно, чтобы корректно работали компоненты, работающе с данной структурой\n\n\n  var ind = start_tree[0].childs.findIndex(function (el) {\n    return el == 0;\n  });\n  start_tree[0].childs.splice(ind, ind >= 0 ? 1 : 0);\n}\n\nvar testSlice = Object(redux_starter_kit__WEBPACK_IMPORTED_MODULE_1__[\"createSlice\"])({\n  initialState: {\n    isFetching: false,\n    isLoaded: false,\n    counter: 1\n  },\n  reducers: {\n    pageHeadersRequest: function pageHeadersRequest(state, action) {\n      state.isFetching = true;\n    },\n    pageHeadersResponse: function pageHeadersResponse(state, action) {\n      state.isFetching = false;\n      state.isLoaded = true;\n      state.start_tree = {};\n      state.pages = action.payload.entities.pages;\n      console.log(state.pages); //  После загрузки информации по заголовкам\n      //  страниц очевидно пока не загружено ни одной.\n      //  Поэтому по каждой странице устанавливаем isLoaded = false\n      //  Кроме того, инициализируем ДЛЯ КАЖДОЙ СТРАНИЦЫ isFetching\n\n      Object.entries(state.pages).forEach(function (_ref) {\n        var _ref2 = _slicedToArray(_ref, 2),\n            key = _ref2[0],\n            value = _ref2[1];\n\n        state.start_tree[key] = {\n          parent: value.parent\n        };\n        value.isFetching = false;\n        value.isLoaded = false;\n      }); // Размечаем данные для работы с компонентом заголовка\n\n      makeStartTree(state.start_tree);\n      console.log(state.start_tree); // Формируем полные адреса страниц\n\n      makeUrl(0, state.start_tree, 0, \"/\", state.pages);\n    },\n    pageDetailRequest: function pageDetailRequest(state, action) {\n      state.pages[action.payload].isFetching = true;\n    },\n    pageDetailResponse: function pageDetailResponse(state, action) {\n      var id = action.payload.result.id;\n      state.pages[id].isFetching = false;\n      state.pages[id].isLoaded = true; // Смысл - надо оставить в state.pages[id] пары ключ-значение, которых\n      // нет в action.payload.result. При этом state.pages[id] уже ОБЯЗАТЕЛЬНО\n      // ЕСТЬ!\n\n      Object.assign(state.pages[id], action.payload.result); // То же самое, НО state[key] МОЖЕТ НЕ БЫТЬ. ПОэтому проверяем\n      // и если нет - то просто присваиваем \n\n      for (var _i2 = 0, _Object$entries2 = Object.entries(action.payload.entities); _i2 < _Object$entries2.length; _i2++) {\n        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),\n            key = _Object$entries2$_i[0],\n            value = _Object$entries2$_i[1];\n\n        if (state[key]) {\n          Object.assign(state[key], value);\n        } else {\n          state[key] = value;\n        }\n      }\n    },\n    setCurrentPage: function setCurrentPage(state, action) {\n      var currentPage = state.pages.find(function (page) {\n        return page.url === action.payload;\n      });\n      state.currentPage = currentPage ? currentPage.id : -1;\n\n      for (var _i3 = 0, _Object$entries3 = Object.entries(state.tree); _i3 < _Object$entries3.length; _i3++) {\n        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),\n            key = _Object$entries3$_i[0],\n            value = _Object$entries3$_i[1];\n\n        state.tree[key].current = 0;\n      }\n\n      if (state.currentPage >= 0) {\n        markCurrent(state.currentPage, state.tree);\n      }\n    },\n    setCurrentHeaders: function setCurrentHeaders(state, action) {\n      state.tree.map(function (el) {\n        return el.current = 0;\n      });\n\n      if (state.currentPage >= 0) {\n        markCurrent(action.payload, state.tree);\n      }\n    },\n    setCounter: function setCounter(state, action) {\n      state.counter += action.payload;\n    }\n  }\n});\nfunction fetchPages() {\n  return function (dispatch) {\n    // взводим загрузку информации по страницам\n    dispatch(pageHeadersRequest());\n    return fetch('http://localhost:8000/page/').then(function (response) {\n      console.log(response);\n      return response.json();\n    }, function (error) {\n      console.log('Что-то пошло не так c заголовками', error);\n      return Promise.reject(\"Эта\");\n    }).then(function (json) {\n      console.log(\"мы здесь\");\n      dispatch(pageHeadersResponse(Object(normalizr__WEBPACK_IMPORTED_MODULE_4__[\"normalize\"])(json, _Schema_schema_jsx__WEBPACK_IMPORTED_MODULE_5__[\"pagesSchema\"])));\n    }, function (error) {\n      return console.log(error);\n    });\n  };\n}\nfunction fetchPage(pageid) {\n  return function (dispatch) {\n    // взводим загрузку информации по страницам\n    dispatch(pageDetailRequest(pageid));\n    return fetch(\"http://localhost:8000/page/\".concat(pageid)).then(function (response) {\n      return response.json();\n    }, function (error) {\n      console.log('Что-то пошло не так со страницей', error);\n      return Promise.reject();\n    }).then(function (json) {\n      return dispatch(pageDetailResponse(Object(normalizr__WEBPACK_IMPORTED_MODULE_4__[\"normalize\"])(json, _Schema_schema_jsx__WEBPACK_IMPORTED_MODULE_5__[\"pageSchema\"])));\n    });\n  };\n}\nfunction fetchPagesIfNeeded() {\n  return function (dispatch, getState) {\n    if (!getState().isLoaded && !getState().isFetching) {\n      return dispatch(fetchPages());\n    } else {\n      return Promise.resolve();\n    }\n  };\n}\nfunction fetchPageIfNeeded(pageid) {\n  return function (dispatch, getState) {\n    if (pageid && !getState().pages[pageid].isLoaded) {\n      return dispatch(fetchPage(pageid));\n    } else {\n      return Promise.resolve();\n    }\n  };\n}\nvar _testSlice$actions = testSlice.actions,\n    setCurrentPage = _testSlice$actions.setCurrentPage,\n    setCurrentHeaders = _testSlice$actions.setCurrentHeaders,\n    pageDetailRequest = _testSlice$actions.pageDetailRequest,\n    pageDetailResponse = _testSlice$actions.pageDetailResponse,\n    pageHeadersRequest = _testSlice$actions.pageHeadersRequest,\n    pageHeadersResponse = _testSlice$actions.pageHeadersResponse,\n    setCounter = _testSlice$actions.setCounter;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (testSlice.reducer);\n\n//# sourceURL=webpack:///./src/Redux/Reducers.jsx?");

/***/ }),

/***/ "./src/Schema/schema.jsx":
/*!*******************************!*\
  !*** ./src/Schema/schema.jsx ***!
  \*******************************/
/*! exports provided: pagesSchema, pageSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pagesSchema\", function() { return pagesSchema; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageSchema\", function() { return pageSchema; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! normalizr */ \"normalizr\");\n/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(normalizr__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar feature = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('features');\nvar page_short = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('pages', {\n  features: [feature]\n});\nvar pagesSchema = [page_short];\nvar paragraph = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('paragraphs');\nvar link = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('links');\nvar avatar = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('avatars');\nvar icon = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('icons');\nvar table_row = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('table_rows');\nvar offer = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('offers');\nvar table = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('tables', {\n  table_rows: [table_row]\n});\nvar icon_block = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('icon_blocks', {\n  icons: [icon]\n});\nvar avatar_block = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('avatar_blocks', {\n  avatars: [avatar]\n});\nvar link_block = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('link_blocks', {\n  links: [link]\n});\nvar text_block = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Entity('text_blocks', {\n  paragraphs: [paragraph]\n});\nvar pageSchema = new normalizr__WEBPACK_IMPORTED_MODULE_1__[\"schema\"].Object({\n  text_blocks: [{\n    block: text_block\n  }],\n  link_blocks: [{\n    block: link_block\n  }],\n  avatar_blocks: [{\n    block: avatar_block\n  }],\n  icon_blocks: [{\n    block: icon_block\n  }],\n  table: [{\n    table: table\n  }],\n  offer: [{\n    offer: offer\n  }]\n});\n\n//# sourceURL=webpack:///./src/Schema/schema.jsx?");

/***/ }),

/***/ "./src/server/App.jsx":
/*!****************************!*\
  !*** ./src/server/App.jsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux_starter_kit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-starter-kit */ \"redux-starter-kit\");\n/* harmony import */ var redux_starter_kit__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_starter_kit__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Redux_Reducers_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Redux/Reducers.jsx */ \"./src/Redux/Reducers.jsx\");\n\n\n\n\n\n ///\n///\n///\n///\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"Provider\"], {\n    store: store\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"StaticRouter\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TestSelector, null)));\n});\nvar store = Object(redux_starter_kit__WEBPACK_IMPORTED_MODULE_2__[\"configureStore\"])({\n  reducer: _Redux_Reducers_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  middleware: Object(redux_starter_kit__WEBPACK_IMPORTED_MODULE_2__[\"getDefaultMiddleware\"])(),\n  devTools: true // preloadedState: initialState\n\n});\n\nvar TestSelector = function TestSelector() {\n  Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useDispatch\"])()(Object(_Redux_Reducers_jsx__WEBPACK_IMPORTED_MODULE_4__[\"setCounter\"])(100));\n  var counter = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useSelector\"])(function (state) {\n    return state.counter;\n  });\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"\\u0418\\u043C\\u0435\\u0435\\u043C counter = \", counter);\n};\n\n//# sourceURL=webpack:///./src/server/App.jsx?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _App_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App.jsx */ \"./src/server/App.jsx\");\n\n\n\n\n // import App from '../shared/App'\n\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()();\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()()); // We're going to serve up the public\n// folder since that's where our\n// client bundle.js file will end up.\n\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(\"public\"));\napp.get(\"*\", function (req, res, next) {\n  var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null));\n  res.send(\"\\n    <!DOCTYPE html>\\n    <html>\\n      <head>\\n        <title>SSR with RR</title>\\n      </head>\\n\\n      <body>\\n        <div id=\\\"app\\\">\\n\".concat(markup, \"</div>\\n      </body>\\n    </html>\\n  \"));\n});\napp.listen(3000, function () {\n  console.log(\"Server is listening on port: 3000\");\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "normalizr":
/*!****************************!*\
  !*** external "normalizr" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"normalizr\");\n\n//# sourceURL=webpack:///external_%22normalizr%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux-starter-kit":
/*!************************************!*\
  !*** external "redux-starter-kit" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-starter-kit\");\n\n//# sourceURL=webpack:///external_%22redux-starter-kit%22?");

/***/ }),

/***/ "transliteration":
/*!**********************************!*\
  !*** external "transliteration" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"transliteration\");\n\n//# sourceURL=webpack:///external_%22transliteration%22?");

/***/ }),

/***/ "url-join":
/*!***************************!*\
  !*** external "url-join" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url-join\");\n\n//# sourceURL=webpack:///external_%22url-join%22?");

/***/ })

/******/ });