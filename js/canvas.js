class Canvas {
  constructor(id){
    this.canvasElement = document.getElementById(id);
    this.ctx = this.canvasElement.getContext('2d');

    // this.axisPoint = [400, 325];
    this.axisPoint = [325, 325];
    this.symDirection = document.querySelector('.symmetry-selected').dataset.symmetry;
    this.radialOrder = parseInt(document.getElementById('radial-order').value);

    this.startCoordinates = [];
    this.nextCoordinates = [];
    this.drawing = false;
    this.lineWidth = parseInt(document.querySelector('.brush-size-selected').dataset.brushsize);
    this.strokeStyle = document.querySelector('.drawing-color-selected').dataset.color;

    this.determineDraw = this.determineDraw.bind(this);
    this.toggleBrushColors = this.toggleBrushColors.bind(this);
    this.toggleCanvasBackground = this.toggleCanvasBackground.bind(this);

    this.canvasElement.addEventListener('mousedown', (e) => this.setDrawingParameters('DOWN', e));
    this.canvasElement.addEventListener('mouseup', (e) => this.setDrawingParameters('UP', e));
    this.canvasElement.addEventListener('mousemove', this.determineDraw);

    this.setUserInputListeners();

  }

  setUserInputListeners(){
    const brushColors = document.querySelector('.brush-colors');
    brushColors.addEventListener("click", this.toggleBrushColors);

    const canvasBackgrounds = document.querySelector('.canvas-backgrounds');
    canvasBackgrounds.addEventListener("click", this.toggleCanvasBackground);
  }

  toggleBrushColors(e){
    const previousBrush = document.querySelector('.drawing-color-selected');
    previousBrush.className = "";
    e.target.className = 'drawing-color-selected';
    this.strokeStyle = e.target.dataset.color;
  }

  toggleCanvasBackground(e){
    const previousBackground = document.querySelector('.canvas-background-selected');
    previousBackground.className = "";
    e.target.className = 'canvas-background-selected';
    //finish here
  }



  determineDraw(e){
    console.log(`were at determine draw and this.drawing = ${this.drawing}`);
    if (this.drawing){
      console.log('were setting next coordinates');
      this.setCoordinates(e, 'NEXT');

      this.startCoordinates.forEach((coordPair, idx) => {
        console.log('now were drawing the line');
        // debugger
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
    // debugger
    console.log(`mouseclick was at ${e.clientX}, ${e.clientY}`);
    // console.log(`mouseclick was at ${e.clientX}, ${e.clientY}`);
    // this.ctx.rect(325,325,100,100);
    // this.ctx.stroke();
    switch (action) {
      case 'DOWN':
        this.drawing = true;
        console.log('drawing is now true');
        this.setCoordinates(e, 'START');
        // console.log(`starting coordinates are ${this.startingX}, ${this.startingY}`);
        return;
      case 'UP':
        this.drawing = false;
        console.log(`now drawing is ${this.drawing}`);
        return;
      }
    }

  setCoordinates(e, startOrNext){

    let firstPair = [e.clientX, e.clientY];
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
      console.log(`startCoordinates are ${this.startCoordinates}`);
    } else {
      this.nextCoordinates = [firstPair].concat(symmetricPairSet);
      console.log(`nextCoordinates are ${this.nextCoordinates}`);
    }
  }

  computeAxisSymPairs(e, axis){
    let symmetricPairX, symmetricPairY, symmetricPairSet;
    switch (axis) {
      case 'HORIZONTAL':
        symmetricPairX = e.clientX;
        symmetricPairY = ((this.axisPoint[1] - e.clientY) * 2) + e.clientY;
        symmetricPairSet = [[symmetricPairX, symmetricPairY]];
        return { symmetricPairSet };
      case 'VERTICAL':
        symmetricPairX = ((this.axisPoint[0] - e.clientX) * 2) + e.clientX;
        symmetricPairY = e.clientY;
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

    const xDistance = (e.clientX - this.axisPoint[0]);
    const yDistance = -(e.clientY - this.axisPoint[1]);
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
      const canvasX = (radius * Math.cos(angle)) + this.axisPoint[0];
      const canvasY = this.axisPoint[1] - (radius * Math.sin(angle));
      symmetricPairSet.push([canvasX, canvasY]);
    });
    return { symmetricPairSet };
  }


}

export default Canvas;
