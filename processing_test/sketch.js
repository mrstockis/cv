var shapes = []; // all saved shapes
var _shape = []; // current /unsaved shape

var dft2s = []; // contains the frequency weight values for each shape
var dftshapes = []; // contains the resulting shapes of the dft2s

var Xs = [];
var Ys = [];

var afterDft = false
var pressed = {'m':false,'s':false,'p':false}

const fps = 30;
const dim = 500;

var counter = 10 * fps    // for animation
var maxcount = 10 * fps

var freqPerc = 100;

var showOriginal = true;

function LOG(title,content){
  console.log( "\n"+str(title))
  console.log(content)
}

function keyPressed() {
  //console.log("Pressed: ", key);
}
function keyReleased() {
  //console.log("Released: ", key);
  switch (key) {
    case "m":
      pressed.m = false;
      break;
    case "s":
      pressed.s = false;
      break;
    case "p":
      pressed.p = false;
      break;
    case "r":
      pressed.r = false;
      break;
    case "c":
      pressed.c = false;
      break;
    case "o":
      pressed.o = false;
      break;
  }
  key = "";
}

function mousePressed() {
  //console.log("Pressed: ", mouseButton);
}
function mouseReleased() {
  //console.log("Released: ", mouseButton);
}

function sum(arr) {
  s = 0;
  arr.forEach((v) => (s += v));
  return s;
}
function mean(arr) {
  let avg = sum(arr) / arr.length;
  return avg;
}

function trunc(arr) {
  let tmpArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (
      tmpArr[tmpArr.length - 1][0] == arr[i][0] &&
      tmpArr[tmpArr.length - 1][1] == arr[i][1]
    ) {
      continue;
    } else {
      tmpArr.push(arr[i]);
    }
  }
  return tmpArr;
}

function formatForDFT(arr2d){
  let xs = []
  let ys = []
  for (let i = 0; i<arr2d.length; i++) {
    xs.push(arr2d[i][0])
    ys.push(arr2d[i][1])
  }
  return {
    xs: xs,
    ys: ys
  }
}

function formatForDraw(arrX,arrY){
  let ps = []
  for (let i = 0; i < arrX.length; i++) {
    ps.push( [ arrX[i], arrY[i] ] )
  }
  return {
    ps: ps
  }
}


function drawShapes(arr2d,col) {
  let _shapes = arr2d;
  let shape = []
  //stroke(100, 200, 180);
  stroke(col)
  strokeWeight(1)

  let p0 = [];
  let p1 = [];

  for (s = 0; s < _shapes.length + 1; s++) {
    //Select shape
    if (s == _shapes.length) {
      stroke('teal'); // the active shape is drawn last with differenct color, as appended action
      shape = _shape;
    } else {
      shape = _shapes[s];
    }
    // Draw shape
    for (let point = 0; point < shape.length; point++) {
      let pos = shape[point];

      if (point == 0) {
        p0 = pos;
      } else if (point == 1) {
        p1 = pos;
      } else {
        p0 = p1;
        p1 = pos;
      }
      if (point > 0) {
        line(p0[0], p0[1], p1[0], p1[1]);
      }
    }
  }
}

function keyHandler() {
  switch (key) {
    case "d":
      _shape.push([mouseX, mouseY]);
      break;

    case "s":
      if (!pressed.s) {
        if (_shape.length > 0) {
          shapes.push(trunc(_shape));
          _shape = [];
        }
        //LOG('shapes',shapes);
        pressed.s = true;
      }
      break;

    case "p":
      if (!pressed.p) {
        counter = 1
        buildDFTshapes(shapes,'orange')
        //LOG('shapes',shapes)
        //LOG('dftShapes',dftshapes)
        pressed.p = true;
      }
      break;

    case "m":
      if (!pressed.m) {
        pressed.m = true;
      }
      break;

    case "r":
      if (!pressed.r) {
        _shape = []
        pressed.r = true;
      }
      break;
      
    case "c":
      if (!pressed.c) {
        shapes = []
        dftshapes = []
        pressed.c = true;
      }
      break;
      
    case "o":
      if (!pressed.o) {
        showOriginal = !showOriginal
        pressed.o = true;
      }
      break;
  }
}

function wi(f, arr) {
  let w = 0;
  arr.forEach((v, i) => (w += v * cos((f * i * TAU) / arr.length)));
  return w;
}
function wj(f, arr) {
  let w = 0;
  arr.forEach((v, j) => (w += v * sin((f * j * TAU) / arr.length)));
  return w;
}

function updateFreqPerc(){
  freqPerc = Number(document.getElementById("freqPercSlider").value);
}

// Returns {a0: mean, wis:cos-weights, wjs:sine-weights} for an array
function dft(arr) {
  let a0 = mean(arr);
  let is = [];
  let js = [];
  for (let f = 1; f < Math.ceil( (freqPerc/100) * (counter/maxcount) * arr.length / 2 ); f++) {
    is.push(wi(f, arr));
    js.push(wj(f, arr));
  }
  return {
    a0: a0,
    is: is.map( n => n * (2/arr.length) ),
    js: js.map( n => n * (2/arr.length) )
  };
}

// Same as dft but for each dim {waijxs: {a0,wis,wjs}, waijys: {a0,wis,wjs}}
function dft2(arr1, arr2) {
  
  return {
    xaijs: dft(arr1),
    yaijs: dft(arr2)
  }
}

function backtrace(arr) {
  let barr = [];
  for (i = 0; i < arr.length ; i++) {
    barr.push(arr[i])
  }
  for (i = 0; i < arr.length ; i++) {
    barr.push( arr[arr.length-(i+1)] )
  }
  return barr
}

function buildDFTshapes(_shapes) {
  if (_shapes.length == 0){ return }
  
  // Grab xs and ys for each shape as continous arrays rather than partial elements of a sub array
  // [ [x0,y0], [x1,y1] ... ] -> [x0,x1 ... ]  [y0,y1 ... ]
  var Xs = [];
  var Ys = [];
  for (var s = 0; s < _shapes.length; s++) {
    let _s = formatForDFT(_shapes[s])
  
    // Backtrace to beginning (doubling their length)
    let bxs = backtrace( _s.xs )
    let bys = backtrace( _s.ys )
  
    Xs.push(bxs);
    Ys.push(bys);
  }

  // Store weights
  dft2s = []
  for (s = 0; s < _shapes.length; s++) {
    dft2s.push( dft2(Xs[s],Ys[s]) )
  }
    
  dftshapes = []
  dft2s.forEach( dftshape => (
    waveX = createWave(dftshape.xaijs),
    waveY = createWave(dftshape.yaijs),
    newShape = formatForDraw(waveX,waveY).ps,
    newTruncShape = trunc( newShape ),
    dftshapes.push(newTruncShape)
    )
  )
  
}

function createWave(data) {
  //let res = counter;
  let a0 = data.a0;
  let is = data.is;
  let js = data.js;
  let res = 10*is.length;

  FreqRange = js.length
  
  let wave_sum = [...Array(res).keys()].map(n => n * 0 )
  for (let f = 0; f < FreqRange; f++) {
    let wave = []
    for (let x = 0; x < res; x++) {  // Maps x to frequency wave
      wave.push( a0/FreqRange + is[f] * Math.cos( (f+1) * TAU * (x/res) ) + js[f] * Math.sin( (f+1) * TAU * (x/res) ) )
    }
    for (let x = 0; x < res; x++) {  // Adds y for each x to calculate the sum of the total waves
      wave_sum[x] += wave[x]
    }
  }
  
  return wave_sum.map(n => Math.round(n) );
}

function sinusoid(F, A, type, res) {
  let X = [...Array(res).keys()];
  let Y = [];
  let curve;

  switch (type) {
    case "sin":
      curve = Math.sin;
      break;
    case "cos":
      curve = Math.cos;
      break;
  }

  mid = {
    x: dim / 2 - X.length / 2,
    y: dim / 2,
  };

  X.forEach((x) => Y.push(A * curve((F * TAU * x) / X.length)));

  stroke(150);
  X.forEach((x) =>
    line(x + mid.x, Y[x] + mid.y, x + 1 + mid.x, Y[x + 1] + mid.y)
  );
  noStroke();
  return [X, Y];
}



function setup() {
  createCanvas(dim, dim);
  noStroke();
  frameRate(fps);
  background(50);
}

function draw() {
  background(50);
  ellipse(mouseX, mouseY, 2, 2);
  strokeWeight(1);
  //drawShapes(shapes,250)
  
  if (counter < maxcount) {
    
    buildDFTshapes(shapes)
    let tealToWhite = [250*(counter/maxcount),125+120*(counter/maxcount),125+120*(counter/maxcount)]
    drawShapes(dftshapes, tealToWhite )
    counter++
    //if (counter == maxcount) { showOriginal = true }
  } else {
    if (showOriginal) {
      drawShapes(shapes,250)
    }
  }
  if (freqPerc<=100){
    //buildDFTshapes(shapes)
    let tealToWhite = [250*(counter/maxcount),125+120*(counter/maxcount),125+120*(counter/maxcount)]
    drawShapes(dftshapes, tealToWhite )
  }
  

  if (keyPressed) keyHandler();
}
