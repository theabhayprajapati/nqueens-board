/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"turnAllBoxesAsRed\": () => (/* binding */ turnAllBoxesAsRed),\n/* harmony export */   \"updateColorsOfBoxes\": () => (/* binding */ updateColorsOfBoxes),\n/* harmony export */   \"vibrate\": () => (/* binding */ vibrate)\n/* harmony export */ });\n/* eslint-disable functional/no-loop-statement */\r\n/* eslint-disable functional/immutable-data */\r\n/* eslint-disable functional/no-expression-statement */\r\n/* eslint-disable functional/no-conditional-statement */\r\nconst RED_SHADE = '#FF7276';\r\n\r\nfunction vibrate(duration) {\r\n    return navigator.vibrate(duration);\r\n}\r\nconst makeBlackWhite = (box) => {\r\n    var current_row = Number(box.getAttribute('row'));\r\n    var current_col = Number(box.getAttribute('col'));\r\n    // if addtion of row and col is even then make the background black\r\n    if ((current_row + current_col) % 2 == 0) {\r\n        box.style.backgroundColor = \"#837E7E\";\r\n        // full opacity \r\n    } else {\r\n        box.style.backgroundColor = \"black\";\r\n        // full opacity \r\n    }\r\n}\r\n\r\n\r\nconst updateBoxValues = (row, col, selected_places, total_cols, total_rows) => {\r\n\r\n    for (var i = 0; i < total_rows; i++) {\r\n        selected_places[i][col] = true;\r\n    }\r\n    for (var i = 0; i < total_cols; i++) {\r\n        selected_places[row][i] = true;\r\n    }\r\n    // update all diagonals selected\r\n    var x = row;\r\n    var y = col;\r\n    while (x >= 0 && y >= 0) {\r\n        selected_places[x][y] = true;\r\n        x--;\r\n        y--;\r\n    }\r\n    x = row;\r\n    y = col;\r\n    while (x < total_rows && y >= 0) {\r\n        selected_places[x][y] = true;\r\n        x++;\r\n        y--;\r\n    }\r\n    x = row;\r\n    y = col;\r\n    while (x >= 0 && y < total_cols) {\r\n        selected_places[x][y] = true;\r\n        x--;\r\n        y++;\r\n    }\r\n    x = row;\r\n    y = col;\r\n    while (x < total_rows && y < total_cols) {\r\n        selected_places[x][y] = true;\r\n        x++;\r\n        y++;\r\n    }\r\n}\r\n\r\nconst turnAllBoxesAsRed = (boxes, selected_places) => {\r\n    boxes.forEach((box) => {\r\n        makeBlackWhite(box);\r\n    })\r\n    for (var i = 0; i < selected_places.length; i++) {\r\n        // console.log(selected_places[i])\r\n        for (var j = 0; j < selected_places[i].length; j++) {\r\n            if (selected_places[i][j]) {\r\n                boxes.forEach((box) => {\r\n                    if (box.getAttribute(\"row\") == i && box.getAttribute('col') == j) {\r\n                        box.style.backgroundColor = RED_SHADE;\r\n                    }\r\n                })\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nvar updateColorsOfBoxes = (selected_location, boxes, selected_places, total_cols, total_rows) => {\r\n    console.log(selected_places)\r\n    if (selected_location.length > 0) {\r\n        for (var i = 0; i < selected_location.length; i++) {\r\n            updateBoxValues(selected_location[i][0], selected_location[i][1], selected_places, total_cols, total_rows)\r\n        }\r\n    } else {\r\n        boxes.forEach((box) => {\r\n            makeBlackWhite(box);\r\n        })\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://8queens/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n/* eslint-disable functional/no-this-expression */\r\n/* eslint-disable functional/no-loop-statement */\r\n/* eslint-disable functional/functional-parameters */\r\n/* eslint-disable functional/no-conditional-statement */\r\n/* eslint-disable functional/immutable-data */\r\n/* eslint-disable functional/no-expression-statement */\r\n/* eslint-disable functional/no-let */\r\n\r\n\r\nvar board = document.getElementById(\"board\");\r\nvar boxes = [];\r\nvar rows = [];\r\nvar cols = [];\r\nvar matrix = [];\r\nvar total_cols = 8;\r\nvar total_rows = 8;\r\nvar selected_location = [];\r\nvar selected_places = [];\r\nvar total_boxes = total_cols * total_rows;\r\nfunction renderQueensOfTop(times) {\r\n    const queensDiv = document.getElementById('queens');\r\n    queensDiv.innerHTML = \"\";\r\n    for (var i = 0; i < (8 - times); i++) {\r\n        const textnode = document.createTextNode(\"👑\");\r\n        queensDiv.appendChild(textnode);\r\n    }\r\n    const makeATweetBTn = document.getElementById('makeATweetBTn');\r\n    if (times > 0) {\r\n        makeATweetBTn.style.visibility = \"visible\";\r\n    } else {\r\n        makeATweetBTn.style.visibility = \"hidden\";\r\n    }\r\n}\r\nfor (var i = 0; i < total_rows; i++) {\r\n    console.log('starting to create maze.');\r\n    for (var j = 0; j < total_cols; j++) {\r\n        var box = document.createElement(\"div\");\r\n        box.className = \"box\";\r\n        box.style.backgroundColor = \"black\";\r\n        // if the row and col addition is even then make the background black\r\n        if ((i + j) % 2 == 0) {\r\n            box.style.backgroundColor = \"#837E7E\";\r\n        }\r\n        box.style.gridColumn = j + 1;\r\n        box.style.gridRow = i + 1;\r\n        box.title = i + 1 + \",\" + Number(j + 1);\r\n        box.setAttribute(\r\n            \"selected\",\r\n            \"false\"\r\n        )\r\n        box.setAttribute('row', Number(i));\r\n        box.setAttribute('col', j);\r\n        board.appendChild(box);\r\n        boxes.push(box);\r\n    }\r\n    console.log('created maze.');\r\n}\r\n\r\nfunction making_all_taken_place_false(selected_places, total_rows, total_cols) {\r\n    console.log('making all taken / selected places false.');\r\n    for (var i = 0; i < total_rows; i++) {\r\n        selected_places[i] = [];\r\n        for (var j = 0; j < total_cols; j++) {\r\n            selected_places[i][j] = false;\r\n        }\r\n    }\r\n    console.log('made all taken / selected places false.');\r\n}\r\nmaking_all_taken_place_false(selected_places, total_rows, total_cols);\r\n\r\nconst initail_setup = () => {\r\n    console.log('getting data from local storage.');\r\n    var selected_location_ls = JSON.parse(localStorage.getItem('selected_location'));\r\n    // if the selected location is not null then update the selected location\r\n    if (selected_location_ls != null) {\r\n        selected_location = selected_location_ls;\r\n        selected_location.forEach((location) => {\r\n            // get boxes with this row col\r\n            boxes.forEach((box) => {\r\n                var row = Number(box.getAttribute('row'));\r\n                var col = Number(box.getAttribute('col'));\r\n                console.log(location[0] + \",\" + location[1]);\r\n                if (row == location[0] && col == location[1]) {\r\n                    box.setAttribute('selected', 'true');\r\n                    box.innerHTML = \"👑\";\r\n                }\r\n            })\r\n            renderQueensOfTop(selected_location.length)\r\n        })\r\n        ;(0,_helper__WEBPACK_IMPORTED_MODULE_0__.updateColorsOfBoxes)(selected_location, boxes, selected_places, total_cols, total_rows);\r\n        (0,_helper__WEBPACK_IMPORTED_MODULE_0__.turnAllBoxesAsRed)(boxes, selected_places);\r\n    }\r\n    console.log('got data from local storage.');\r\n}\r\ninitail_setup();\r\nboxes.forEach((box) => {\r\n    console.log('adding event listener to box.');\r\n    box.addEventListener(\"click\", async (e) => {\r\n        console.log('box clicked.');\r\n        var row = e.target.getAttribute(\"row\");\r\n        var col = e.target.getAttribute(\"col\");\r\n        if (e.target.getAttribute(\"selected\") == \"false\") {\r\n            if (selected_places[row][col]) {\r\n                e.target.classList.add(\"red-pulse-box\");\r\n                (0,_helper__WEBPACK_IMPORTED_MODULE_0__.vibrate)(400);\r\n                (0,_helper__WEBPACK_IMPORTED_MODULE_0__.updateColorsOfBoxes)(selected_location, boxes, selected_places, total_cols, total_rows);\r\n                (0,_helper__WEBPACK_IMPORTED_MODULE_0__.turnAllBoxesAsRed)(boxes, selected_places);\r\n            } else {\r\n                for (var i = 0; i < total_rows; i++) {\r\n                    selected_places[i] = [];\r\n                    for (var j = 0; j < total_cols; j++) {\r\n                        selected_places[i][j] = false;\r\n                    }\r\n                }\r\n                e.target.style.backgroundColor = \"black\";\r\n                e.target.setAttribute(\"selected\", \"true\");\r\n                selected_location.push([Number(row), Number(col)]);\r\n                e.target.innerHTML = \"👑\";\r\n                (0,_helper__WEBPACK_IMPORTED_MODULE_0__.updateColorsOfBoxes)(selected_location, boxes,\r\n                    selected_places, total_cols, total_rows);\r\n                (0,_helper__WEBPACK_IMPORTED_MODULE_0__.turnAllBoxesAsRed)(boxes, selected_places);\r\n                if (selected_location.length == 8) {\r\n                    localStorage.setItem('selected_location', JSON.stringify(selected_location));\r\n                    /* turn all boxes green */\r\n                    boxes.forEach((box) => {\r\n                        box.style.backgroundColor = \"#90ee90\";\r\n                    }\r\n                    )\r\n                    /* #win-msg */\r\n                    var win_msg = document.getElementById(\"win-msg\");\r\n                    win_msg.style.display = \"flex\";\r\n                    party.confetti(document.body);\r\n\r\n\r\n\r\n                }\r\n                (0,_helper__WEBPACK_IMPORTED_MODULE_0__.vibrate)(100);\r\n            }\r\n        }\r\n        else {\r\n            for (var i = 0; i < total_rows; i++) {\r\n                selected_places[i] = [];\r\n                for (var j = 0; j < total_cols; j++) {\r\n                    selected_places[i][j] = false;\r\n                }\r\n            }\r\n\r\n            e.target.setAttribute(\"selected\", \"false\");\r\n            e.target.innerHTML = \"\";\r\n            for (var i = 0; i < selected_location.length; i++) {\r\n                if (selected_location[i][0] == row && selected_location[i][1] == col) {\r\n                    selected_location.splice(i, 1);\r\n                }\r\n            }\r\n            (0,_helper__WEBPACK_IMPORTED_MODULE_0__.updateColorsOfBoxes)(\r\n                selected_location,\r\n                boxes,\r\n                selected_places,\r\n                total_cols,\r\n                total_rows\r\n            );\r\n            (0,_helper__WEBPACK_IMPORTED_MODULE_0__.turnAllBoxesAsRed)(boxes, selected_places);\r\n            (0,_helper__WEBPACK_IMPORTED_MODULE_0__.vibrate)(100);\r\n        }\r\n        localStorage.setItem(\"selected_location\", JSON.stringify(selected_location));\r\n        console.log(localStorage.getItem(\"selected_location\"));\r\n        renderQueensOfTop(selected_location.length);\r\n    })\r\n})\r\n\r\nconst resetBtn = document.getElementById(\"reset-btn\");\r\nresetBtn.addEventListener(\"click\", () => {\r\n    console.log('reset button clicked.');\r\n    localStorage.removeItem(\"selected_location\");\r\n    location.reload();\r\n}\r\n);\r\n\r\n/* \r\nhttps://twitter.com/intent/tweet?text=%E2%AD%95%EF%B8%8F%20My%20circle%20is%2066.0%25%20perfect%2C%20can%20you%20beat%20that%3F&url=https%3A%2F%2Fneal.fun%2Fperfect-circle%2F\r\n*/\r\nconst makeTweet = (score) => {\r\n    var tweet = \"I have placed \" + score + \"/ 8 queens perfectly on the maze, can you beat that?\";\r\n    var forUserSolveMoreThan8 = `\"Just solved the #BoardOfNQueens puzzle! Can you beat my time? #NQueens #Gaming #Challenge\"`\r\n    var url = \"https://maze.abhayprajapati.me\";\r\n    var tweetUrl = \"https://twitter.com/intent/tweet?text=\" + tweet + \"&url=\" + url;\r\n    window.open(tweetUrl, \"_blank\");\r\n}\r\nconst makeATweetBTn = document.getElementById(\"makeATweetBTn\");\r\nmakeATweetBTn.addEventListener(\"click\", () => {\r\n    makeTweet(selected_location.length);\r\n}\r\n);\n\n//# sourceURL=webpack://8queens/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;