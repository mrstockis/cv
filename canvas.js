

// Try draw
// Reference https://bearnithi.com/2019/12/12/understanding-canvas-draw-a-line-in-canvas-using-mouse-and-touch-events-in-javascript/

/*
const canvasEle = document.getElementById('drawContainer');
const context = canvasEle.getContext('2d');

// To draw a static line.
context.beginPath();
context.lineWidth = '5'; // width of the line
context.strokeStyle = 'red'; // color of the line
context.moveTo(50,50); // begins a new sub-path based on the given x and y values.
context.lineTo(50, 100); // used to create a pointer based on x and y  
context.stroke(); // this is where the actual drawing happens.


let startPosition = {x: 0, y: 0};
let lineCoordinates = {x: 0, y: 0};
let isDrawStart = false;

const getClientOffset = (event) => {
    const {pageX, pageY} = event.touches ? event.touches[0] : event;
    const x = pageX - canvasEle.offsetLeft;
    const y = pageY - canvasEle.offsetTop;

    return {
       x,
       y
    } 
}

const drawLine = () => {
   context.beginPath();
   context.moveTo(startPosition.x, startPosition.y);
   context.lineTo(lineCoordinates.x, lineCoordinates.y);
   context.stroke();
}

const mouseDownListener = (event) => {
   startPosition = getClientOffset(event);
   isDrawStart = true;
}

const mouseMoveListener = (event) => {
  if(!isDrawStart) return;
  
  lineCoordinates = getClientOffset(event);
  clearCanvas();
  drawLine();
}

const mouseupListener = (event) => {
  isDrawStart = false;
}

const clearCanvas = () => {
   context.clearRect(0, 0, canvasEle.width, canvasEle.height);
}

canvasEle.addEventListener('mousedown', mouseDownListener);
canvasEle.addEventListener('mousemove', mouseMoveListener);
canvasEle.addEventListener('mouseup', mouseupListener);

canvasEle.addEventListener('touchstart', mouseDownListener);
canvasEle.addEventListener('touchmove', mouseMoveListener);
canvasEle.addEventListener('touchend', mouseupListener);

*/


function Log(thing)
{
    console.log(thing)
}


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');


canvas.width = window.innerWidth * .5;
canvas.height = 400;


/* Two rectangles //
c.fillRect(20,40,100,100)
c.fillStyle= 'rgba(20,30,50,.5)'
c.fillRect(400,80,10,20)
//*/



// Line
/*
c.strokeStyle = "rgb(100,90,50)"

c.beginPath()
c.moveTo(10, canvas.height / 2)
c.lineTo(canvas.width-10, canvas.height / 2)
c.stroke()

c.beginPath()
c.moveTo(canvas.width-10, canvas.height / 2)
c.lineTo(canvas.width / 2, canvas.height / 2 - 50)
c.strokeStyle = "rgba(100,150,100,.5)"
c.stroke()
*/


/*
c.beginPath()
c.strokeStyle = 'rgb(0,0,0)'
c.moveTo(10, canvas.height / 2)

var amp = 10
for (var i=0; i<canvas.width-20; i++)
{
    //Log( Math.sin(i) )
    c.lineTo(10+i, (canvas.height / 2) - Math.sin(i/10) * amp  )
}
c.stroke()
*/

var TAU = Math.PI * 2

/*
var range = 100
var r = 50
var g = 100
var b = 120

// colorShiftScaling //
var cSS = Math.min(r,g,b) / range
var maxSize = 30

for (i=0; i<range; i++)
{
    var color = 'rgb('.concat(r-i*cSS,",", g-i*cSS,",", b-i*cSS,')')
    c.strokeStyle = color
    var rx = Math.random()*canvas.width
    var ry = Math.random()*canvas.height
    var rs = Math.random()*maxSize
    c.beginPath()
    c.arc(rx,ry,Math.random()*maxSize,0, TAU, false);
    c.stroke()
}
*/

var times=0
function Animate()
{
    if (times < 1000)
    {
        requestAnimationFrame(Animate)
    }
    
    Clear(canvas)
    Draw(items)
        
    times += 1
}

function Clear(sheet)
{
    c.clearRect(0, 0, sheet.width, sheet.height)
}


function Draw(things)
{
    for (var thing in things)
    {
        //thing.move();
        //thing.show();
    }
    
    ball_1.move()
    ball_1.show()
}


var ball_1 = new Ball(200,200,3,'blue',14,20)

var items = [ball_1];


function Ball(x,y,size,color='black',vx=0,vy=0)
{
    //this.pen = pen
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.vx = vx
    this.vy = vy
    ;
    this.show = function()
    {
        //c.beginPath
        c.arc(this.x,this.y,this.size,0,TAU,false)
        c.strokeStyle = this.color
        c.stroke()
        
        //Log("Hi")
        
        //this.x = this.x + 1   
    }
   ;
    this.move = function()
    {
        this.checkBounce()
        this.x = this.x + this.vx
        this.y += this.vy
        
    }
    ;
    this.checkBounce = function()
    {
        if (this.x > canvas.width - this.size || this.x < this.size)
        {
            this.vx *= (-1)
            //this.vx *= (this.vx*Math.random())
        }
        
        if (this.y > canvas.height - this.size || this.y < this.size) 
        {
            this.vy *= -(1)
            //this.vy *= (this.vy*Math.random())
        }
        
        // this.vx = this.x > canvas.width  ? this.vx*(-1) : this.vx
        // this.vy = this.y > canvas.height ? this.vy*(-1) : this.vy
    }
     
}


Animate();
































