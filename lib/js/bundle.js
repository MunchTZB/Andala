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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/js/app.js":
/*!***********************!*\
  !*** ./lib/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./lib/js/canvas.js");


document.addEventListener('DOMContentLoaded', () => {
  const canvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__["default"]('andala-canvas');
});


/***/ }),

/***/ "./lib/js/canvas.js":
/*!**************************!*\
  !*** ./lib/js/canvas.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
class Canvas {
  constructor(id){
    this.canvasElement = document.getElementById(id);
    this.canvasElement.width = CANVAS_WIDTH * window.devicePixelRatio;
    this.canvasElement.height = CANVAS_HEIGHT * window.devicePixelRatio;
    this.canvasElement.style.transformOrigin = '0 0';
    this.canvasElement.style.transform = `scale(${1 / window.devicePixelRatio})`
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasLeftSide = () => this.getCanvasCoords()[0];
    this.canvasTop = () => this.getCanvasCoords()[1];

    this.axisPoint = [(this.canvasElement.width) / 2, (this.canvasElement.height) / 2];
    this.symDirection = document.querySelector('.symmetry-selected').dataset.symmetry;
    this.radialOrder = parseInt(document.getElementById('radial-order').value);

    this.startCoordinates = [];
    this.nextCoordinates = [];
    this.drawing = false;
    this.lineWidth = parseInt(document.querySelector('.brush-size-selected').dataset.brushsize);
    this.strokeStyle = document.querySelector('.drawing-color-selected').dataset.color;

    this.determineDraw = this.determineDraw.bind(this);
    this.toggleBrushColor = this.toggleBrushColor.bind(this);
    this.toggleCanvasBackground = this.toggleCanvasBackground.bind(this);
    this.toggleBrushSize = this.toggleBrushSize.bind(this);
    this.toggleSymmetryChoice = this.toggleSymmetryChoice.bind(this);
    this.changeRadialOrder = this.changeRadialOrder.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.canvasElement.addEventListener('mousedown', (e) => this.setDrawingParameters('DOWN', e));
    this.canvasElement.addEventListener('mouseup', (e) => this.setDrawingParameters('UP', e));
    this.canvasElement.addEventListener('mouseleave', (e) => this.setDrawingParameters('OUT', e));
    this.canvasElement.addEventListener('mousemove', this.determineDraw);
    this.canvasElement.addEventListener('touchstart', (e) => this.setDrawingParameters('DOWN', e));
    this.canvasElement.addEventListener('touchend', (e) => this.setDrawingParameters('UP', e));
    this.canvasElement.addEventListener('touchcancel', (e) => this.setDrawingParameters('OUT', e));
    this.canvasElement.addEventListener('touchmove', this.determineDraw);

    this.setUserInputListeners();

  }

  getCanvasCoords(){
    const canvasPosition = this.canvasElement.getBoundingClientRect();
    const canvasLeft = canvasPosition.left + window.scrollX;
    const canvasTop = canvasPosition.top + window.scrollY;
    return [canvasLeft, canvasTop];
  }

  getEventCoord(e) {
    if (e instanceof TouchEvent) {
      e = e.touches[0]
    }
    return [
      (e.pageX - this.canvasLeftSide()) * window.devicePixelRatio,
      (e.pageY - this.canvasTop()) * window.devicePixelRatio
    ]
  }

  setUserInputListeners(){
    const brushColors = document.querySelector('.brush-colors');
    brushColors.addEventListener("click", this.toggleBrushColor);

    const canvasBackgrounds = document.querySelector('.canvas-backgrounds');
    canvasBackgrounds.addEventListener("click", this.toggleCanvasBackground);

    const brushSizes = document.querySelector('.brush-sizes');
    brushSizes.addEventListener("click", this.toggleBrushSize);

    const symmetryChoices = document.querySelector('.symmetry-choices');
    symmetryChoices.addEventListener("click", this.toggleSymmetryChoice);

    const radialOrder = document.getElementById('radial-order');
    radialOrder.addEventListener("input", this.changeRadialOrder);

    const clearCanvasButton = document.getElementById('canvas-reset-button');
    clearCanvasButton.addEventListener("click", this.clearCanvas);

  }

  toggleBrushColor(e){
    const previousBrush = document.querySelector('.drawing-color-selected');
    previousBrush.className = "";
    e.target.className = 'drawing-color-selected';
    this.strokeStyle = e.target.dataset.color;
  }

  toggleCanvasBackground(e){
    const previousBackground = document.querySelector('.canvas-background-selected');
    previousBackground.className = "";
    e.target.className = 'canvas-background-selected';
    this.canvasElement.setAttribute('style',
      `background-color:${e.target.dataset.background};`)
  }

  toggleBrushSize(e){
    const previousBrushSize = document.querySelector('.brush-size-selected');
    previousBrushSize.className = "";
    e.target.className = 'brush-size-selected';
    this.lineWidth = parseInt(e.target.dataset.brushsize);
  }

  toggleSymmetryChoice(e){
    if (e.target.id === 'radial-order') {return;}
    const previousSymmetry = document.querySelector('.symmetry-selected');
    previousSymmetry.className = "";
    e.target.className = 'symmetry-selected';
    this.symDirection = e.target.dataset.symmetry;
  }

  changeRadialOrder(e){
    this.radialOrder = parseInt(e.target.value);
    const previousSymmetry = document.querySelector('.symmetry-selected');
    previousSymmetry.className = "";
    const radialSym = document.getElementById('radial-symmetry');
    radialSym.className = 'symmetry-selected';
    this.symDirection = 'RADIAL';
  }

  clearCanvas(e){
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }


  determineDraw(e){
    if (this.drawing){
      this.setCoordinates(e, 'NEXT');

      this.startCoordinates.forEach((coordPair, idx) => {
        this.ctx.beginPath();
        this.ctx.moveTo(coordPair[0], coordPair[1]);
        this.ctx.lineTo(this.nextCoordinates[idx][0], this.nextCoordinates[idx][1]);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.stroke();

        this.startCoordinates[idx] = this.nextCoordinates[idx];
      });
      }
    }

  setDrawingParameters(action, e){
    switch (action) {
      case 'DOWN':
        this.drawing = true;
        this.setCoordinates(e, 'START');
        break;
      case 'UP':
      case 'OUT':
        this.drawing = false;
        break;
      }
    }

  setCoordinates(e, startOrNext){
    let firstPair = this.getEventCoord(e);
    let symmetricPairSet;
    switch(this.symDirection){
      case 'HORIZONTAL':
        ({ symmetricPairSet } = this.computeAxisSymPairs(e, 'HORIZONTAL'));
        break;
      case 'VERTICAL':
        ({ symmetricPairSet } = this.computeAxisSymPairs(e, 'VERTICAL'));
        break;
      case 'RADIAL':
        ({ symmetricPairSet } = this.computeRadialSymPairs(e));
        break;
    }
    if (startOrNext === 'START'){
      this.startCoordinates = [firstPair].concat(symmetricPairSet);
    } else {
      this.nextCoordinates = [firstPair].concat(symmetricPairSet);
    }
  }

  computeAxisSymPairs(e, axis){
    let symmetricPairX, symmetricPairY, symmetricPairSet;
    const coord = this.getEventCoord(e);
    switch (axis) {
      case 'HORIZONTAL':
        symmetricPairX = coord[0];
        symmetricPairY = ((this.axisPoint[1] - coord[1]) * 2) + coord[1];
        symmetricPairSet = [[symmetricPairX, symmetricPairY]];
        return { symmetricPairSet };
      case 'VERTICAL':
        symmetricPairX = ((this.axisPoint[0] - coord[0]) * 2) + coord[0];
        symmetricPairY = coord[1];
        symmetricPairSet = [[symmetricPairX, symmetricPairY]];
        return { symmetricPairSet };
      case 'DIAGONAL-RIGHT':
        return;
      case 'DIAGONAL-LEFT':
        return;
    }
  }

  computeRadialSymPairs(e){
    const symmetricPairSet = [];
    const coord = this.getEventCoord(e);
    const xDistance = (coord[0] - this.axisPoint[0]);
    const yDistance = -(coord[1] - this.axisPoint[1]);
    const pythagoreanSum = Math.pow(xDistance, 2) + Math.pow(yDistance, 2);
    const radius =  Math.sqrt(pythagoreanSum);

    let theta;
    if (xDistance >= 0 && yDistance >= 0){
      theta = Math.atan(yDistance / xDistance);
    } else if (xDistance <= 0 && yDistance >= 0){
      theta = Math.PI - Math.asin(yDistance / radius);
    } else if (xDistance <= 0 && yDistance <= 0){
      theta = Math.PI + Math.atan(yDistance / xDistance);
    } else if (xDistance >= 0 && yDistance <= 0){
      theta = (2 * Math.PI) - Math.acos(xDistance / radius);
    }

    const sliceSizeRadians = (2 * Math.PI) / this.radialOrder;

    const thetaPrimes = [];
    //note: thetaPrimes will not include theta since firstPair coordinates are
    //      already known from the user's click
    for (let i = 1; i <= this.radialOrder; i ++){
      thetaPrimes.push(theta + (sliceSizeRadians * i));
    }

    thetaPrimes.forEach(angle => {
      let canvasX = (radius * Math.cos(angle)) + this.axisPoint[0];
      let canvasY = this.axisPoint[1] - (radius * Math.sin(angle));
      symmetricPairSet.push([canvasX, canvasY]);
    });
    return { symmetricPairSet };
  }


}

/* harmony default export */ __webpack_exports__["default"] = (Canvas);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map