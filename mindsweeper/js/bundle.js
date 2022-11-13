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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // JavaScript source code


var _table = __webpack_require__(1);

var _table2 = _interopRequireDefault(_table);

var _panel = __webpack_require__(3);

var _panel2 = _interopRequireDefault(_panel);

var _values = __webpack_require__(4);

var Values = _interopRequireWildcard(_values);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MindSweeper = function () {
    function MindSweeper() {
        var _this = this;

        _classCallCheck(this, MindSweeper);

        var canvas = document.querySelector("#canvas");
        var message = document.querySelector("#message");
        var resetButton = document.querySelector("#reset");
        this.panel = new _panel2.default(canvas);
        this.table = null;
        this.panel.setCanvasSize(Values.PANEL_WIDTH, Values.PANEL_HEIGHT);
        this.panel.setActionListener(function (status, data) {
            if (status == "clicked") {
                var _data = _slicedToArray(data, 2),
                    c = _data[0],
                    r = _data[1];

                if (c != null && r != null) {
                    _this.table.turnAt(c, r);
                    _this.panel.paint();
                    if (_this.table.isGameclear()) {
                        message.innerHTML = "Game Clear!";
                        _this.panel.stopInputListeners();
                    } else if (_this.table.isGameover()) {
                        message.innerHTML = "Game Over!";
                        _this.panel.stopInputListeners();
                    }
                }
            } else if (status == "rightClicked") {
                var _data2 = _slicedToArray(data, 2),
                    _c = _data2[0],
                    _r = _data2[1];

                _this.table.flagAt(_c, _r);
                _this.panel.paint();
            }
        });
        resetButton.addEventListener("click", function () {
            message.innerHTML = "";
            _this.initGame();
        }, false);
    }

    _createClass(MindSweeper, [{
        key: "initGame",
        value: function initGame() {
            this.table = new _table2.default(Values.TABLE_COLS, Values.TABLE_ROWS);
            this.table.setRandomBombs(Values.NUM_BOMBS);
            this.panel.setTable(this.table);
            this.panel.paint();
            if (!this.panel.isListening) {
                this.panel.startInputListeners();
            }
        }
    }]);

    return MindSweeper;
}();

var mindSweeper = new MindSweeper();
mindSweeper.initGame();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // JavaScript source code


var _cell2 = __webpack_require__(2);

var _cell3 = _interopRequireDefault(_cell2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(cols, rows) {
        _classCallCheck(this, _class);

        this.cols = cols;
        this.rows = rows;
        this.clear();
    }

    _createClass(_class, [{
        key: "clear",
        value: function clear() {
            this.array = [];
            for (var r = 0; r < this.rows; r++) {
                for (var c = 0; c < this.cols; c++) {
                    this.array[r * this.cols + c] = new _cell3.default(false, false, false);
                }
            }
        }
    }, {
        key: "getAt",
        value: function getAt(c, r) {
            return this.array[r * this.cols + c];
        }
    }, {
        key: "setRandomBombs",
        value: function setRandomBombs(n) {
            var i = 0;
            while (i < n) {
                var c = Math.floor(Math.random() * this.cols);
                var r = Math.floor(Math.random() * this.rows);
                var cell = this.getAt(c, r);
                if (!cell.isBomb) {
                    cell.isBomb = true;
                    i++;
                }
            }
        }
    }, {
        key: "countNeighborBombs",
        value: function countNeighborBombs(c, r) {
            var positions = this.neighborPositions(c, r);
            var num = 0;
            for (var i = 0; i < positions.length; i++) {
                var position = positions[i];
                var cell = this.getAt(position.c, position.r);
                if (cell.isBomb) {
                    num++;
                }
            }
            return num;
        }
    }, {
        key: "neighborPositions",
        value: function neighborPositions(c, r) {
            var min_c = Math.max(c - 1, 0);
            var max_c = Math.min(c + 1, this.cols - 1);
            var min_r = Math.max(r - 1, 0);
            var max_r = Math.min(r + 1, this.rows - 1);
            var list = [];
            for (var rr = min_r; rr <= max_r; rr++) {
                for (var cc = min_c; cc <= max_c; cc++) {
                    if (c != cc || r != rr) {
                        list.push({ c: cc, r: rr });
                    }
                }
            }
            return list;
        }
    }, {
        key: "turnAt",
        value: function turnAt(c, r) {
            var cell = this.getAt(c, r);
            if (!cell.isOpen) {
                cell.isFlagged = false;
                cell.isOpen = true;
                if (cell.isBomb) {
                    return; // �Q�[���I�[�o�[
                }
                var countNeighborBombs = this.countNeighborBombs(c, r);
                if (countNeighborBombs == 0) {
                    var positions = this.neighborPositions(c, r);
                    for (var i = 0; i < positions.length; i++) {
                        var position = positions[i];
                        var _cell = this.getAt(position.c, position.r);
                        if (!_cell.isOpen) {
                            var _countNeighborBombs = this.countNeighborBombs(position.c, position.r);
                            if (_countNeighborBombs == 0) {
                                this.turnAt(position.c, position.r);
                            } else {
                                _cell.isOpen = true;
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: "flagAt",
        value: function flagAt(c, r) {
            var cell = this.getAt(c, r);
            if (!cell.isOpen) {
                cell.isFlagged = !cell.isFlagged;
            }
        }
    }, {
        key: "isGameclear",
        value: function isGameclear() {
            var n = this.reduce(function (n, cell) {
                if (cell.isBomb || cell.isOpen) {
                    return n + 1;
                }
                return n;
            }, 0);
            return n == this.rows * this.cols;
        }
    }, {
        key: "isGameover",
        value: function isGameover() {
            var f = this.reduce(function (f, cell) {
                if (!f && cell.isBomb && cell.isOpen) {
                    return true;
                }
                return f;
            }, false);
            return f;
        }
    }, {
        key: "reduce",
        value: function reduce(callback, initialValue) {
            var result = initialValue;
            for (var r = 0; r < this.rows; r++) {
                for (var c = 0; c < this.cols; c++) {
                    var cell = this.getAt(c, r);
                    result = callback(result, cell);
                }
            }
            return result;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// JavaScript source code
var _class = function _class(isBomb, isOpen, isFlagged) {
    _classCallCheck(this, _class);

    this.isBomb = isBomb;
    this.isOpen = isOpen;
    this.isFlagged = isFlagged;
};

exports.default = _class;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// JavaScript source code
var _class = function () {
    function _class(canvas) {
        _classCallCheck(this, _class);

        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.defineInputListeners();
        this.startInputListeners();
    }

    _createClass(_class, [{
        key: "setCanvasSize",
        value: function setCanvasSize(width, height) {
            this.width = width;
            this.height = height;
            this.canvas.style.width = width + "px";
            this.canvas.style.height = height + "px";
            this.canvas.width = width;
            this.canvas.height = height;
        }
    }, {
        key: "setTable",
        value: function setTable(table) {
            this.table = table;
        }
    }, {
        key: "setActionListener",
        value: function setActionListener(callback) {
            this.actionListener = callback;
        }
    }, {
        key: "defineInputListeners",
        value: function defineInputListeners() {
            var _this = this;

            this.clicked = function (e) {
                var _getPosition = _this.getPosition(e.layerX, e.layerY),
                    _getPosition2 = _slicedToArray(_getPosition, 2),
                    c = _getPosition2[0],
                    r = _getPosition2[1];

                if (c != null && r != null) {
                    _this.actionListener("clicked", [c, r]);
                }
            };
            this.contextmenu = function (e) {
                e.preventDefault();

                var _getPosition3 = _this.getPosition(e.layerX, e.layerY),
                    _getPosition4 = _slicedToArray(_getPosition3, 2),
                    c = _getPosition4[0],
                    r = _getPosition4[1];

                if (c != null && r != null) {
                    _this.actionListener("rightClicked", [c, r]);
                }
            };
        }
    }, {
        key: "startInputListeners",
        value: function startInputListeners() {
            this.isListening = true;
            canvas.addEventListener('click', this.clicked, false);
            canvas.addEventListener('contextmenu', this.contextmenu, false);
        }
    }, {
        key: "stopInputListeners",
        value: function stopInputListeners() {
            canvas.removeEventListener('click', this.clicked, false);
            canvas.removeEventListener('contextmenu', this.contextmenu, false);
            this.isListening = false;
        }
    }, {
        key: "getPosition",
        value: function getPosition(x, y) {
            var cc = null;
            var rr = null;
            var table = this.table;
            var cols = table.cols;
            var rows = table.rows;
            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < cols; c++) {
                    if (this.width / cols * c <= x && this.height / rows * r <= y && x < this.width / cols * (c + 1) && y < this.height / rows * (r + 1)) {
                        cc = c;
                        rr = r;
                        break;
                    }
                }
            }
            return [cc, rr];
        }
    }, {
        key: "paint",
        value: function paint() {
            if (this.table != null) {
                for (var r = 0; r < this.table.rows; r++) {
                    for (var c = 0; c < this.table.cols; c++) {
                        var cell = this.table.getAt(c, r);
                        this.paintCell(cell, c, r);
                    }
                }
            }
        }
    }, {
        key: "paintCell",
        value: function paintCell(cell, c, r) {
            var ctx = this.context;
            var width = this.width / this.table.cols;
            var height = this.height / this.table.rows;
            var left = width * c;
            var top = height * r;
            var fontSize = Math.ceil(Math.min(width, height) * 0.8);
            var fill = void 0,
                stroke = void 0,
                text = void 0;
            if (cell.isOpen) {
                fill = "rgb(255,200,200)";
                stroke = "rgb(0,0,255)";
                if (cell.isBomb) {
                    text = "\u2620";
                } else {
                    var n = this.table.countNeighborBombs(c, r);
                    if (n > 0) {
                        text = n;
                    }
                }
            } else {
                fill = "rgb(255,255,255)";
                stroke = "rgb(0,0,255)";
                if (cell.isFlagged) {
                    text = "\u2713";
                }
            }
            ctx.fillStyle = fill;
            ctx.fillRect(left, top, width, height);
            ctx.strokeStyle = stroke;
            ctx.strokeRect(left, top, width, height);
            if (text) {
                ctx.fillStyle = 'rgb(50,50,50)';
                ctx.font = fontSize + "px 'Times New Roman'";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, left + width / 2, top + height / 2);
            }
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// JavaScript source code
var PANEL_WIDTH = exports.PANEL_WIDTH = 360;
var PANEL_HEIGHT = exports.PANEL_HEIGHT = 300;
var TABLE_COLS = exports.TABLE_COLS = 12;
var TABLE_ROWS = exports.TABLE_ROWS = 10;
var NUM_BOMBS = exports.NUM_BOMBS = 16;

/***/ })
/******/ ]);