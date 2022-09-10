/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("/* eslint-disable functional/no-conditional-statement */\r\n/* eslint-disable functional/immutable-data */\r\n/* eslint-disable functional/no-expression-statement */\r\n/* eslint-disable functional/no-let */\r\n/* eslint-disable functional/no-loop-statement */\r\nconst CHESS_BOARD = document.getElementById('board');\r\nconsole.log(CHESS_BOARD);\r\nconst RED_SHADE = '#EA3C52';\r\nconst SELECTED_BOXES = 8;\r\nconst TOTAL_BOXES = SELECTED_BOXES * SELECTED_BOXES;\r\n\r\n/* create a board on html */\r\nconst createBoard = (SELECTED_BOXES) => {\r\n    for (let i = 0; i < SELECTED_BOXES; i++) {\r\n        for (let j = 0; j < SELECTED_BOXES; j++) {\r\n            const BOX = document.createElement('div');\r\n            BOX.className = 'box';\r\n            BOX.style.backgroundColor = 'black';\r\n            /* if the row and col addition is even then make the background black */\r\n            if ((i + j) % 2 === 0) {\r\n                BOX.style.backgroundColor = 'white';\r\n            }\r\n            BOX.style.gridColumn = j + 1;\r\n            BOX.style.gridRow = i + 1;\r\n            BOX.title = i + 1 + ',' + Number(j + 1);\r\n            BOX.setAttribute('selected', 'false');\r\n            BOX.setAttribute('row', Number(i));\r\n            BOX.setAttribute('col', j);\r\n            CHESS_BOARD.appendChild(BOX);\r\n        }\r\n    }\r\n}\r\ncreateBoard(SELECTED_BOXES);\r\n\n\n//# sourceURL=webpack://8queens/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;