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


var isPainting = false;

keyPressed = {
    ctrl: false
}


window.addEventListener('keydown',
    function(event)
    {
        //Log(event.key)
        if(event.key == 'Control') {
            keyPressed.ctrl = true;
        }
        
        if (event.key == 'c')
        {
            status(drawn);
        }
        
        if (event.key == 'C')
        {
            clear(canvas);
        }
        
        if (event.key == 'd')
        {
            repaint(drawn);
        }
    }
)

/*
d
    s1
        c1 [ x1,y2 ]
        c2 [ x2,y2 ]
        c3 ...
        
    s2  c1 [ x1,y2 ]
        c2 [ x2,y2 ]
        c3 ...
*/

async function repaint(drw){
    for (var shp=0; shp<drw.length; shp++) {
        c.beginPath();
        c.strokeStyle = drw[shp][0];
        c.moveTo( drw[shp][1][0], drw[shp][1][1] )
        //Log( [ drwn[shp][0][0], drwn[shp][0][1] ] )
        for (var pos=1; pos<drw[shp].length; pos++) {
            await sleep(2);
            var xy = drw[shp][pos] ;
            Log(xy);
            c.lineTo( xy[0], xy[1] );
            c.stroke();
        }
        
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');

  // Sleep in loop
  for (let i = 0; i < 5; i++) {
    if (i === 3)
      await sleep(2000);
    console.log(i);
  }
}
*/


window.addEventListener('keyup',
    function(event)
    {
        //Log(event)
        if(event.key == 'Control') {
            keyPressed.ctrl = false;
        }
    }
)


function status(stuff) {
    stuff = new Array(stuff);
    stuff.forEach(Log);
}


var activeColor;
var shape = [];
canvas.addEventListener('mousedown',paintStart);
function paintStart(event)
{
    let canvasPos = {
        left: canvas.getBoundingClientRect().left,
        top: canvas.getBoundingClientRect().top
    }
    mouse.x = event.x - canvasPos.left;
    mouse.y = event.y - canvasPos.top;
    
    isPainting = true;
    activeColor = document.getElementById('colorPick').value;
    c.strokeStyle = activeColor;
    shape = [activeColor];
    if (!keyPressed.ctrl) c.beginPath();
    c.lineTo(mouse.x,mouse.y);
    shape.push( [mouse.x,mouse.y] ) 
}


canvas.addEventListener('mouseup',paintEnd);
function paintEnd(event)
{
    let canvasPos = {
        left: canvas.getBoundingClientRect().left,
        top: canvas.getBoundingClientRect().top
    }
    mouse.x = event.x - canvasPos.left;
    mouse.y = event.y - canvasPos.top;

    c.stroke();

    if (!keyPressed.ctrl) {
        isPainting = false;
        //drawn.push(shape);
        drawn.push(truncate(shape));
    }
}



var mouse = {
    x: undefined,
    y: undefined
}



var animateTimes = 000;
var animateCount = 0;
function animate()
{
    //times < 100 ? requestAnimationFrame(Animate) : 0;
    
    if ( animateTimes )
    {
        if (animateCount < animateTimes) {
            animateCount += 1;
            requestAnimationFrame(animate);
        }
    } else {
        requestAnimationFrame(animate);
    }
    
    
    var canvasMode = document.getElementById("canvasMode").value;
    ;
    if (canvasMode == 'paint') {
        paint();
    }
    ;
    if (canvasMode == 'animation') {
        clear(canvas);
        draw(items);
    }
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
            //Log(thing);
        }
    )
}

function paint()
{
    if (isPainting)
    {
        c.lineTo(mouse.x,mouse.y);
        shape.push( [mouse.x,mouse.y] );
        c.stroke();
    }
}


//var array = new Array();


//* Add some balls //
var ball_1 = new Ball(200,100,3,'blue',14,20);
var ball_2 = new Ball(50,210,8,'red',24,10);
var ball_3 = new Ball(20,100,12,'green',4,5);

var items = [ball_1, ball_2, ball_3];

var ball_4 = new Ball();
var ball_5 = new Ball();
var ball_6 = new Ball();

var extra = [ball_4, ball_5, ball_6];

items.concat(extra);    // alt: Array(any arr/arrObject).push.apply(base,addition)

for (let i=0; i<50; i++)
{
    items.push(new Ball());
}
//*/




// Top level
var drawn = [];

animate();



function truncate(arr) {
    var tarr = [];
    for (var i=0; i<arr.length; i++) {
        if (i+1 < arr.length) {
            if ( (arr[i][0] != arr[i+1][0]) || (arr[i][1] != arr[i+1][1]) ) {
                tarr.push(arr[i])
            }
        } else if ( (arr[i][0] != arr[i-1][0]) || (arr[i][1] != arr[i-1][1]) ){
            tarr.push(arr[i])
        }
    }
    return tarr
}





// Objects //

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
    
    this.xDirection = 1;
    this.yDirection = 1;
    
    this.time = 0
    
    this.mtdx = this.x-mouse.x;
    this.mtdy = this.y-mouse.y;
    
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
        //*
        if (this.time > 20 && Math.min(this.vx,this.vy) > 1 )
        {
            this.vx -= 1
            this.vy -= 1
            
            this.time = 0
        }
        //*/
        
        //* Interactive //
        this.mtdx = this.x-mouse.x;
        this.mtdy = this.y-mouse.y;
        
        distance = Math.sqrt( Math.pow(this.mtdx,2)+Math.pow(this.mtdy,2) )
        
        if (this.size < 50)
        {
            if (distance < 40)
            {
                this.size += 1;
                this.vx += 1;
            } else if (this.size > 5) {
                this.size -= 1;
            }
            if (distance < 40) {
                this.size += 1;
                this.vy += 1;
            } else if (this.size > 5) {
                this.size -= 1;
            }
        } else if (this.size > 5)
        {
            this.size -= 1;
        }
        //*/
                
        this.checkBounce();
        this.x += this.vx * this.xDirection;
        this.y += this.vy * this.yDirection;
        
        this.show();
    }
    
    this.checkBounce = function()
    {
        if (this.x + this.vx > canvas.width - this.size || this.x + this.vx < this.size)
        {
            this.xDirection *= (-1);
        }
        
        if (this.y + this.vy > canvas.height - this.size || this.y + this.vy < this.size)
        {
            this.yDirection *= (-1);
        }
        
    }
}





/// Start ///

//main()











































