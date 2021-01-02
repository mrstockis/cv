;
;
// Try draw;
// Reference https://bearnithi.com/2019/12/12/understanding-canvas-draw-a-line-in-canvas-using-mouse-and-touch-events-in-javascript/;
;
/*;
const canvasEle = document.getElementById('drawContainer');;
const context = canvasEle.getContext('2d');;
;
// To draw a static line.;
context.beginPath();;
context.lineWidth = '5'; // width of the line;
context.strokeStyle = 'red'; // color of the line;
context.moveTo(50,50); // begins a new sub-path based on the given x and y values.;
context.lineTo(50, 100); // used to create a pointer based on x and y  ;
context.stroke(); // this is where the actual drawing happens.;
;
;
let startPosition = {x: 0, y: 0};;
let lineCoordinates = {x: 0, y: 0};;
let isDrawStart = false;;
;
const getClientOffset = (event) => {;
    const {pageX, pageY} = event.touches ? event.touches[0] : event;;
    const x = pageX - canvasEle.offsetLeft;;
    const y = pageY - canvasEle.offsetTop;;
;
    return {;
       x,;
       y;
    } ;
};
;
const drawLine = () => {;
   context.beginPath();;
   context.moveTo(startPosition.x, startPosition.y);;
   context.lineTo(lineCoordinates.x, lineCoordinates.y);;
   context.stroke();;
};
;
const mouseDownListener = (event) => {;
   startPosition = getClientOffset(event);;
   isDrawStart = true;;
};
;
const mouseMoveListener = (event) => {;
  if(!isDrawStart) return;;
  ;
  lineCoordinates = getClientOffset(event);;
  clearCanvas();;
  drawLine();;
};
;
const mouseupListener = (event) => {;
  isDrawStart = false;;
};
;
const clearCanvas = () => {;
   context.clearRect(0, 0, canvasEle.width, canvasEle.height);;
};
;
canvasEle.addEventListener('mousedown', mouseDownListener);;
canvasEle.addEventListener('mousemove', mouseMoveListener);;
canvasEle.addEventListener('mouseup', mouseupListener);;
;
canvasEle.addEventListener('touchstart', mouseDownListener);;
canvasEle.addEventListener('touchmove', mouseMoveListener);;
canvasEle.addEventListener('touchend', mouseupListener);;
;
*/;
;
;

;
;
/* Two rectangles //;
c.fillRect(20,40,100,100);
c.fillStyle= 'rgba(20,30,50,.5)';
c.fillRect(400,80,10,20);
//*/;
;
;
;
// Line;
/*;
c.strokeStyle = "rgb(100,90,50)";
;
c.beginPath();
c.moveTo(10, canvas.height / 2);
c.lineTo(canvas.width-10, canvas.height / 2);
c.stroke();
;
c.beginPath();
c.moveTo(canvas.width-10, canvas.height / 2);
c.lineTo(canvas.width / 2, canvas.height / 2 - 50);
c.strokeStyle = "rgba(100,150,100,.5)";
c.stroke();
*/;
;
;
/*;
c.beginPath();
c.strokeStyle = 'rgb(0,0,0)';
c.moveTo(10, canvas.height / 2);
;
var amp = 10;
for (var i=0; i<canvas.width-20; i++);
{;
    //Log( Math.sin(i) );
    c.lineTo(10+i, (canvas.height / 2) - Math.sin(i/10) * amp  );
};
c.stroke();
*/


/*
var range = 100;
var r = 50;
var g = 100;
var b = 120;
;
// colorShiftScaling //;
var cSS = Math.min(r,g,b) / range;
var maxSize = 30;
;
for (i=0; i<range; i++);
{;
    var color = 'rgb('.concat(r-i*cSS,",", g-i*cSS,",", b-i*cSS,')');
    c.strokeStyle = color;
    var rx = Math.random()*canvas.width;
    var ry = Math.random()*canvas.height;
    var rs = Math.random()*maxSize;
    c.beginPath();
    c.arc(rx,ry,Math.random()*maxSize,0, TAU, false);;
    c.stroke();
};
*/



var TAU = Math.PI * 2;


function Log(thing)
{
    console.log(thing);
}


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.5;
canvas.height = 400;




canvas.addEventListener('mousemove',
    function(event)
    {
        let canvasPos = {
            left: canvas.getBoundingClientRect().left,
            top: canvas.getBoundingClientRect().top
        }
        mouse.x = event.x - canvasPos.left;
        mouse.y = event.y - canvasPos.top ;
    }
)

/*
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

//const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})
*/

var mouse = {
    x: undefined,
    y: undefined
}


var times=0;

function animate()
{
    
    //times < 100 ? requestAnimationFrame(Animate) : 0;
    
    if (times < 1000)
    {
        requestAnimationFrame(animate);
    }
    
    clear(canvas);
    draw(items);
    
    /*;
    ball_1.move(); ball_1.show();
    ball_2.move(); ball_2.show();
    ball_3.move(); ball_3.show();
    */
    
    times += 1;
}


function clear(patch)
{
    c.clearRect(0, 0, patch.width, patch.height);
}

function draw(things)
{
    things.forEach
    (
        function(thing) // 'thing' holds element within the list 'things';
        {
            thing.update();
            //Log(thing.color);
            //Log(thing);
        }
    )
    /*   // 'thing' just holds count //
    for (var thing in things)
    {
        things[thing].move();
        things[thing].show();
        Log(thing);
    }
    //*/
    
    //ball_1.move();
    //ball_1.show();
}


var array = new Array();

var ball_1 = new Ball(200,100,3,'blue',14,20);
var ball_2 = new Ball(50,210,8,'red',24,10);
var ball_3 = new Ball(20,100,12,'green',4,5);
var ball_4 = new Ball();

var items = [ball_1, ball_2, ball_3, ball_4];

var ball_5 = new Ball();
var ball_6 = new Ball();
var ball_7 = new Ball();
var extra = [ball_5, ball_6, ball_7];

items.concat(extra);    // alt: Array(any arr/arrObject).push.apply(base,addition)

for (let i=0; i<50; i++)
{
    items.push(new Ball())
}



function Ball(
        x=false, //size+Math.random()*200,
        y=false, //100+Math.random()*200,
        size=10, //*Math.random(),
        color=false,
        vx=false, //5*Math.random(),
        vy=false ) //*Math.random() )
{
    
    this.x = x ? x+size : size + (canvas.width-3*size)*Math.random();
    this.y = y ? y+size : size + (canvas.height-3*size)*Math.random();
    this.size = size;
    this.color = color ? color : 'rgb('+250*Math.random()+','+250*Math.random()+','+250*Math.random()+')';
    this.vx = vx ? vx : 10*(Math.random()-0.5) ;
    this.vy = vy ? vy : 10*(Math.random()-0.5) ;
    
    this.time = 0
    
    this.mtdx = mouse.x-this.x;
    this.mtdy = mouse.y-this.y;
    
    this.show = function()
    {
        c.moveTo(this.x+this.size,this.y);
        c.beginPath();
        c.arc(this.x,this.y,this.size,0,TAU,false);
        c.strokeStyle = this.color;
        //c.fillStyle = this.color;
        c.fill()
        c.stroke();
    }
   
    this.update = function()
    {
        this.time += 1
        if (this.time > 5 && Math.min(this.vx,this.vy) > 0 )
        {
            this.vx -= 1
            this.vy -= 1
            
            this.time = 0
        }
        
        //* Interactive //
        this.mtdx = mouse.x-this.x;
        this.mtdy = mouse.y-this.y;
        if (this.size < 50)
        {
            if (this.mtdx < 40 && this.mtdx > -40)
            {
                this.size += 1;
                this.vx += 1
            } else if (this.size > 5) {
                this.size -= 1;
            }
            if (this.mtdy < 40 && this.mtdy > -40) {
                this.size += 1;
                this.vy += 1
            } else if (this.size > 5) {
                this.size -= 1;
            }
        } else if (this.size > 5)
        {
            this.size -= 1;
        }
        //*/
                
        this.checkBounce();
        this.x += this.vx;
        this.y += this.vy;
        
        this.show();
    }
    
    this.checkBounce = function()
    {
        if (this.x + this.vx > canvas.width - this.size || this.x + this.vx < this.size)
        {
            this.vx *= -(1);
            //this.vx *= (this.vx*Math.random());
        }
        //this.vy *= this.y > canvas.height - this.size || this.y < this.size ? -1 : 1;

        if (this.y + this.vy > canvas.height - this.size || this.y + this.vy < this.size)
        {
            this.vy *= -(1);
        }
        // this.vx = this.x > canvas.width  ? this.vx*(-1) : this.vx;
        // this.vy = this.y > canvas.height ? this.vy*(-1) : this.vy;
    }
}


/*
for (let i=0; i<10; i++);
{;
    clear();
    ball_1.update()
    ball_2.update()  
    ball_3.update()
};
//*/

animate();

Log( canvas )











































