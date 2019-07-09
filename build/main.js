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
const typeDefs = apollo_server_koa__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type TodoItem {
    name: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]

    hello: String

    todo: [TodoItem]
  }

  type Mutation {
    replaceTasks(tasks: [TaskInput!]!): [Task!]!
    addTask(task: TaskInput): TaskReturn!
    deleteTask(id: ID): DeleteId
  }

  input TaskInput {
    name: String
  }

  type Task {
    name: String
  }
  type TaskReturn {
    id: ID
    name: String
  }
  type DeleteId {
    id: String
  }
`;
const books = [{
  title: 'Harry Potter and the Chamber of Secrets',
  author: 'J.K. Rowling'
}, {
  title: 'Jurassic Park',
  author: 'Michael Crichton'
}];
const PORT = process.env.PORT || 4000;
const resolvers = {
  Query: {
    books: () => books,
    hello: () => 'hello',
    todo: () => axios__WEBPACK_IMPORTED_MODULE_4___default.a.get('http://localhost:3000/todo').then(res => res.data).catch(err => {
      console.error(err);
      return 'error';
    })
  },
  Mutation: {
    addTask: async (root, args, context) => {
      console.log('data', args);
      const {
        task: {
          name
        }
      } = args;
      console.log('addTask ', name);
      const endAdding = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('http://localhost:3000/todo', {
        name
      }).then(res => {
        console.log(res.data);
        return res.data;
      }).catch(err => console.error('Error', err));
      console.log('endAdding', endAdding);
      return endAdding;
    },
    replaceTasks: async (root, args, context) => {
      console.log('root', root);
      console.log('args', args);
      console.log('context', context);
      const tasks = args.tasks;

      if (!tasks) {
        return;
      }

      const endDeleting = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get('http://localhost:3000/todo').then(res => {
        console.log(res.data);
        const tasks = res.data;
        tasks.map(({
          id
        }) => {
          console.log(`delete by id ${id}`);
          axios__WEBPACK_IMPORTED_MODULE_4___default.a.delete(`http://localhost:3000/todo/${id}`);
        });
        return 'end deleting';
      }).catch(err => console.error('endDeleting error', err));
      console.log('endDeleting', endDeleting);
      const putTodo = await Promise.all(args.tasks.map(task => axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('http://localhost:3000/todo', task).then(res => {
        console.log('new tasks', res.data);
        return res.data;
      }).catch(err => {
        console.error('putTodo error', err);
        return 'error';
      })));
      console.log('putTodo', putTodo);
      return tasks;
    },
    deleteTask: async (root, args, context) => {
      // console.log('root', root);
      console.log('args', args); // console.log('context', context);

      const {
        id
      } = args;

      if (!id) {
        return;
      }

      const endDeleting = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.delete(`http://localhost:3000/todo/${id}`).then(res => {
        console.log('deleted res', res);
        return res.data;
      }).catch(err => console.error(err));
      console.log('endDeleting', endDeleting);
      return args;
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