require('source-map-support/register');
module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-koa */ "apollo-server-koa");
/* harmony import */ var apollo_server_koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_koa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa_morgan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-morgan */ "koa-morgan");
/* harmony import */ var koa_morgan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_morgan__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);





dotenv__WEBPACK_IMPORTED_MODULE_3___default.a.config();
const PORT = process.env.PORT || 4000;
const typeDefs = apollo_server_koa__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(task: TaskInput): TaskReturn!
    deleteTask(id: ID): DeleteId
  }

  input TaskInput {
    name: String
  }

  type Task {
    id: String
    name: String
  }

  type TaskReturn {
    id: String
    name: String
  }
  type DeleteId {
    id: String
  }
`;
const resolvers = {
  Query: {
    getTasks: () => axios__WEBPACK_IMPORTED_MODULE_4___default.a.get('http://localhost:3000/tasks').then(res => {
      console.log('getTasks', res.data);
      return res.data;
    }).catch(err => {
      console.error(err);
      return err;
    })
  },
  Mutation: {
    addTask: async (_root, args, _context) => {
      console.log('addTask', args);
      const {
        task: {
          name
        }
      } = args;
      const endAdding = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('http://localhost:3000/tasks', {
        name
      }).then(res => {
        console.log(res.data);
        return res.data;
      }).catch(err => {
        console.error('Error', err);
        return err;
      });
      return endAdding;
    },
    deleteTask: async (_root, args, _context) => {
      console.log('deleteTask', args);
      const {
        id
      } = args;

      if (!id) {
        return;
      }

      const ansWithErrorOrNot = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.delete(`http://localhost:3000/tasks/${555}`).then(res => res.data).catch(err => {
        console.error(err);
        return err;
      });
      return Object.keys(ansWithErrorOrNot).length === 0 ? args : ansWithErrorOrNot;
    }
  }
};
const app = new koa__WEBPACK_IMPORTED_MODULE_1___default.a();
const server = new apollo_server_koa__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"]({
  typeDefs,
  resolvers
});
server.applyMiddleware({
  app
});
app.use(koa_morgan__WEBPACK_IMPORTED_MODULE_2___default()('tiny')).listen(PORT, () => {
  console.log(`🚀  Server ready at ${PORT}`);
});

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/nikita/js/tests/todo-webpack-server/src/index.js */"./src/index.js");


/***/ }),

/***/ "apollo-server-koa":
/*!************************************!*\
  !*** external "apollo-server-koa" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-koa");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-morgan":
/*!*****************************!*\
  !*** external "koa-morgan" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-morgan");

/***/ })

/******/ });
//# sourceMappingURL=main.map