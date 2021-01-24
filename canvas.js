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
            await delay(2);
            var xy = drw[shp][pos] ;
            //Log(xy);
            c.lineTo( xy[0], xy[1] );
            c.stroke();
        }
    }
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
async function demo() {
  console.log('Taking a break...');
  await delay(2000);
  console.log('Two seconds later, showing sleep in a loop...');

  // Sleep in loop
  for (let i = 0; i < 5; i++) {
    if (i === 3)
      await delay(2000);
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


function pen() {
    this.test = "hi";
    this.size = 1;
    this.color = 'blue';
}


var activeSize;
function sizePicked() {
    activeSize = document.getElementById('sizePick').value;
}

///////////////////   TRY MAKE PEN OBJECT ||  ADD SIZE AS ELEMENT to eiterh pen or shape


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
    c.lineWidth = activeSize;
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
        drawn.push( truncate(shape) );
    }
}



var mouse = {
    x: undefined,
    y: undefined
}



var canvasMode = 'modeDFT';
//document.getElementById('dftMode');
function modePicked() {
    canvasMode = document.getElementById("canvasMode").value;
    if ( canvasMode == 'modeDFT' )
    {
        modeDFT();
    }
    else if ( canvasMode == 'modeAnimate' )
    {
        modeAnimate();
    }
    else if ( canvasMode == 'modePaint' )
    {
        modePaint();
    }
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
    
    
    /*
    if (activeMode == 'dft') {
        //modeDFT();
    }
    ;*/
    if (canvasMode == 'modePaint') {
        paint();
    }
    ;
    if (canvasMode == 'modeAnimate') {
        //modeAnimate();
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


function Sine(hz) {
    this.hz = hz;
    
    this.wave = [];
    this.res = 100;
    for (var x=0 ; x<this.res ; x++) {
        this.wave.push( [x, 10* Math.sin( this.hz * x /10 ) ] );
    }
    this.trace = function () {
        c.beginPath();
        c.moveTo(0,canvas.height/2);
        for ( var t=0 ; t<this.wave.length ; t++ ) {
            c.lineTo( t, - this.wave[t][1] + posH(1/2) );
        }
        c.stroke();
    }
}

function sumLists(a,b) {
    var s = [];
    for (var i=0 ; i<a.length ; i++) {
        s.push( [ i, a[i][1]+b[i][1] ] );
    }
    return s;
}


var s1 = new Sine(1);
var s2 = new Sine(2);
var s3 = new Sine(1)
s3.wave = sumLists( s1.wave , s2.wave )



function posW(part) {  // width
    return part*canvas.width
}

function posH(part) {  // height
    return part*canvas.height
}



function mRound(n) {
    //Log( "n@mRound: " + n )
    if ( typeof(n) != 'number' ) return;
    return Math.round(n) == n.toFixed(2) ? Math.round(n) : n.toFixed(1);
}


function modeDFT() {
    document.getElementById('dftMode').hidden = false;
    document.getElementById('freqTable').hidden=false;
    
    document.getElementById('paintMode').hidden = true;
    
    clear(canvas);
}
function modeAnimate() {
    document.getElementById('dftMode').hidden = true;
    document.getElementById('freqTable').hidden=true
    
    document.getElementById('paintMode').hidden = true;
    
    animate();
}
function modePaint() {
    document.getElementById('dftMode').hidden = true;
    document.getElementById('freqTable').hidden=true
    
    document.getElementById('paintMode').hidden = false;
    
    clear(canvas);
    //paint();
}

function makeDFT() {
    var dataString = document.getElementById('dftData').value;
    //Log( 'dataString: ' + dataString );
    var data = stringToNumbers(dataString);
    var user_dft = new DFT(data);
    user_dft.show(0);
}

function average (nums) {
        //var nlist = new Array(nums);
        //return nums.reduce((a, b) => (a + b) / nums.length);
        var total = 0;
        for ( let i=0 ; i<nums.length ; i++ ) {
            total += Number(nums[i]);
        }
        Log( "nums length " + nums.length )
        return (total/nums.length)
    }

function stringToNumbers(str) {
    var list = [];
    list = str.split(' ');
    list.forEach( n => Number(n) );
    Log( "list@strToNum: " + list );
    return list   
}


function table(headers,data) {
    var fullTable = headers.concat(data);
    var newTable = "<table>";
    for (let r=0 ; r<(1 + data.length/headers.length) ; r++)
    {
        newTable += "<tr>";
        for (let c=0 ; c<headers.length ; c++) {
            newTable += "<td>";
            newTable += fullTable[c+3*r];
            newTable += "</td>";
        }
        newTable += "</tr>";
    }
    newTable += "</table>";
    
    return newTable;
}



function DFT(set=[0,0])
{
    this.isDrawing = false;
    
    this.example = [ 10, -2.9, 0, 2.9, -10, -17.1, 0, 17.1 ];  // 10cos(1hz) + 10sin(2hz)

    this.k_i = [];
    this.k_j = [];
    var ki;
    var kj;

    //this.a0 = average(this.set);
    
    this.build = function () {

        this.set = set;
        this.N = this.set.length;
        
        this.a0 = average(this.set);
        Log( " a0@build " + this.a0 );
        //Log( "set " + this.set )
        
        k_i = k_j = [];
        for (var n = 0; n<this.N/2; n++) {
            ki = kj = 0;
            for (var k = 0; k<this.N; k++) {
                ki += this.set[k] * Math.cos( (n * k) * TAU/this.N );
                kj += this.set[k] * Math.sin( (n * k) * TAU/this.N );
            }
            this.k_i.push( ki * (2/this.N) );
            this.k_j.push( kj * (2/this.N) );
        }
        
        this.wave = [];
        this.res = 30*TAU;
        
        this.zoom = 10;
        this.widen = TAU/2; //Math.round(TAU);
        this.lift = 1;
        this.xStretch = this.widen * this.zoom
        this.yStretch = this.lift * this.zoom
        
        var FX = 0;
        var FY = 0;
        var cH = canvas.height;
        var cW = canvas.width;
        
        this.xPos = posW(1/8);
        this.yPos = posH(1/2);
        
        for (var x=0 ; x<this.res ; x++) {
            FY = 0;
            for (var n=0 ; n<this.N/2 ; n++) { 
                FY += (
                    this.k_i[n] * Math.cos( n * x / this.xStretch ) +
                    this.k_j[n] * Math.sin( n * x / this.xStretch )
                );
            }
            this.wave.push( [ x , FY * this.lift - this.k_i[0] ] );
        }
    }
    this.build()
    
    
    
    this.show = async function(sleep=0) {
        if (this.isDrawing) {
            return;
        }
        this.isDrawing = true;
        clear(canvas);
        
        await this.trace(sleep);
        this.freq();
        
        this.isDrawing = false;
    }
    
    
    this.freq = function() {
        c.font = '12px Times';
        c.fillStyle = 'white';
        c.textAlign = 'center';
        c.lineWidth = 2;
        
        var fWidth = 30*(10 / this.N);
        
        if ( fWidth > 20 )
        {
            c.fillText(' HZ ', posW(3/5) - 30, posH(1/2) + 20 );
            c.fillText(' COS ', posW(3/5) - 30, posH(1/2) + 2*20 );
            c.fillText(' SIN ', posW(3/5) - 30, posH(1/2) + 3*20 );
        }
        
        var tHead = [' Hz ','cos','sin'];
        var tData = [];
        //var freqTable = document.getElementById('freqTable');
        
        for (var f=0 ; f<this.N ; f++) {
            
            //var row = freqTable.insertRow(f);
            
            var ki = mRound(this.k_i[f]);
            var kj = mRound(this.k_j[f]);
            

            if ( Math.abs( this.k_i[f] ) + Math.abs( this.k_j[f] ) > 0.1 )
            {
                tData.push( f, ki, kj );
                //tData.push( f, ki, kj );
                //tData.push( f, mRound(this.k_i[f]), mRound(this.k_j[f]) );
                //Log(tData)
                /*var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                
                cell0.innerHTML = f;
                cell1.innerHTML = this.k_i[f];
                cell2.innerHTML = this.k_j[f];*/
                
                if ( fWidth > 20 )
                {
                    c.fillText(  f, posW(3/5) + f*fWidth, posH(1/2) + 20 );
                    c.fillText( ki, posW(3/5) + f*fWidth, posH(1/2)+ 2*20 );
                    c.fillText( kj, posW(3/5) + f*fWidth, posH(1/2)+ 3*20 );
                }
            }
            
            
            c.beginPath();
            c.moveTo( posW(3/5) + f*fWidth -2, posH(1/2) );
            c.lineTo( posW(3/5) + f*fWidth -2, posH(1/2) - Math.abs( ki )*10 );
            c.strokeStyle='#008080';
            c.stroke();
            
            c.beginPath();
            c.moveTo( posW(3/5) + f*fWidth +2, posH(1/2) );
            c.lineTo( posW(3/5) + f*fWidth +2, posH(1/2) - Math.abs( kj )*10 );
            c.strokeStyle='#52acb7';
            c.stroke();
        }
        
        //var tbl = document.createElement('table');
        var freqTable = table(tHead,tData);
        document.getElementById('freqTable').innerHTML = freqTable;
        
        //document.createElement('table');
        //var tbl = document.createTextNode
        //Log(tData);
        //Log(freqTable);
    }
    
    this.trace = async function (sleep=false) {
        sleep = sleep ? sleep : 0;
        
        c.beginPath();
        c.strokeStyle = 'white';
        c.lineWidth = 1;
        c.moveTo( this.xPos, -this.wave[0][1] * this.yStretch + this.yPos );
        
        for ( var t=0 ; t<(this.wave.length) ; t++ ) {
            sleep ? await delay(sleep) : 0;
            c.lineTo( this.xPos +t, -this.wave[t][1] * this.yStretch + this.yPos );
            //Log( this.wave[t] );
            c.stroke()
        }
    }
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











































