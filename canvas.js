
// Try draw;
// Reference https://bearnithi.com/2019/12/12/understanding-canvas-draw-a-line-in-canvas-using-mouse-and-touch-events-in-javascript/;


/*;
const canvasEle = document.getElementById('drawContainer');;
const context = canvasEle.getContext('2d');;


let startPosition = {x: 0, y: 0};;
let lineCoordinates = {x: 0, y: 0};;
let isDrawStart = false;;


const getClientOffset = (event) => {;
    const {pageX, pageY} = event.touches ? event.touches[0] : event;;
    const x = pageX - canvasEle.offsetLeft;;
    const y = pageY - canvasEle.offsetTop;;

    return {;
       x,;
       y;
    } ;
}


const drawLine = () => {;
   context.beginPath();;
   context.moveTo(startPosition.x, startPosition.y);;
   context.lineTo(lineCoordinates.x, lineCoordinates.y);;
   context.stroke();;
}

const mouseDownListener = (event) => {;
   startPosition = getClientOffset(event);;
   isDrawStart = true;;
}

const mouseMoveListener = (event) => {;
  if(!isDrawStart) return;;
  ;
  lineCoordinates = getClientOffset(event);;
  clearCanvas();;
  drawLine();;
}

const mouseupListener = (event) => {;
  isDrawStart = false;;
};
;
const clearCanvas = () => {;
   context.clearRect(0, 0, canvasEle.width, canvasEle.height);;
}

canvasEle.addEventListener('mousedown', mouseDownListener);;
canvasEle.addEventListener('mousemove', mouseMoveListener);;
canvasEle.addEventListener('mouseup', mouseupListener);;

canvasEle.addEventListener('touchstart', mouseDownListener);;
canvasEle.addEventListener('touchmove', mouseMoveListener);;
canvasEle.addEventListener('touchend', mouseupListener);;

*/




// DECLARATIONS & ASSIGNEMENTS //


var TAU = Math.PI * 2;
var R = 100;  //  DFT resolution %


var shape = [];  // [e] where e = [ color, size, [(x0,y0),(x1,y1),..] ]  ????


var canvasMode = 'modeDFT';

var mouse = {
    x: undefined,
    y: undefined
}

keyPressed = {
    ctrl: false
}

var pen = {
    size:1,
    color:"white",
    isPainting: false
}





var canvas = document.getElementById('myCanvas');
canvas.width = 880;
canvas.height = canvas.width * 9/16;
var c = canvas.getContext('2d');

let backg = new Image();
backg.onload = function() {
    c.drawImage(backg,0,0,canvas.width,canvas.height);
}
backg.src = "resources/pics/fourier.jpeg"



// EVENTS //

/*
var templateLoaded = false
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.getElementById('imgTemp');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            
            var background = new Image(100,100);
            background.src = img.src
            background.onload = function() {
                //c.drawImage(background,0,0);
                templateLoaded = true;
            }
        }
    });
});
*/


// TOUCH

var canvasPhone = document.getElementById('myCanvas');

canvasPhone.addEventListener('touchstart',
    function (e) {
        e.preventDefault();
    }
)
canvasPhone.addEventListener('touchmove',
    function (e) {
        e.preventDefault();
    }
)
canvasPhone.addEventListener('touchend',
    function (e) {
        e.preventDefault();
    }
)


canvas.addEventListener('touchmove',
    function(event)
    {
        //Log(event)
        //Log( event.touches[0] )
    
        let canvasPos = {
            left: canvas.getBoundingClientRect().left,
            top: canvas.getBoundingClientRect().top
        }
        mouse.x = event.touches[0].clientX - canvasPos.left;
        mouse.y = event.touches[0].clientY - canvasPos.top ;
        
    }, false
)


canvas.addEventListener('touchstart',paintStart,false);
function paintStart(event)
{
    let canvasPos = {
        left: canvas.getBoundingClientRect().left,
        top: canvas.getBoundingClientRect().top
    }
    
    if ( canvasMode == "modeDFT" ) {
        clear(canvas) ; drawn = []
    }
    
    pen.isPainting = true;
    pen.color = document.getElementById('colorPick').value;    
    c.strokeStyle = pen.color;
    c.lineWidth = pen.size;
    let currentPen = {size:pen.size, color:pen.color};
    shape = [currentPen];
    
    if (!keyPressed.ctrl) c.beginPath();
    c.lineTo(mouse.x,mouse.y);
    //shape.push( [mouse.x,mouse.y] )
}


canvas.addEventListener('touchend',paintEnd,false);
function paintEnd(event)
{
    let canvasPos = {
        left: canvas.getBoundingClientRect().left,
        top: canvas.getBoundingClientRect().top
    }
    
    mouse.x = event.touches[0].screenX - 0*canvasPos.left;
    mouse.y = event.touches[0].screenY - 0*canvasPos.top;
    
    c.stroke();

    
    
    //*
    if (canvasMode == "modeDFT") {
        //shape = removeNaN(shape);
        //let tshape = shape;  // truncate() ?
        DFT_2d( shape );
        //clear(canvas)
        
        let doPlay = document.getElementById('alwaysPlayRes').checked;
        if (doPlay) {
            playResolutions();
        } else {
            repaint(drawn)
        }
    }
    //*/
}



// KEYS

window.addEventListener('keydown',
    function(event)
    {
        //Log(event.key)
        if(event.key == 'Control') {
            keyPressed.ctrl = true;
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

window.addEventListener('keyup',
    function(event)
    {
        //Log(event)
        if(event.key == 'Control') {
            keyPressed.ctrl = false;
        }
    }
)



// MOUSE

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


canvas.addEventListener('mousedown',paintStart);
function paintStart(event)
{
    let canvasPos = {
        left: canvas.getBoundingClientRect().left,
        top: canvas.getBoundingClientRect().top
    }
    mouse.x = event.x - canvasPos.left;
    mouse.y = event.y - canvasPos.top;
    
    
    if ( canvasMode == "modeDFT" ) { clear(canvas); drawn = []}
    
    pen.isPainting = true;
    pen.color = document.getElementById('colorPick').value;    
    c.strokeStyle = pen.color;
    c.lineWidth = pen.size;
    let currentPen = {size:pen.size, color:pen.color};
    shape = [currentPen];
    
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
        //isPainting = false;
        pen.isPainting = false;
        //drawn.push(shape);
        drawn.push( shape );  // truncate() ?
    }
    
    //*
    if (canvasMode == "modeDFT") {
        //let tshape = truncate(shape);
        clear(canvas)
        DFT_2d( shape );
        
        
        let doPlay = document.getElementById('alwaysPlayRes').checked;
        if (doPlay) {
            playResolutions();
        } else {
            repaint(drawn);
        }
    }
    //*/
}


var initialShape;
function updateShape(justUpdate=true) {
    clear(canvas);
    if (drawn.length == 0) {
        makeDFT();
        return;
    }
    DFT_2d( drawn[0], justUpdate );
    repaint(drawn);
}


var background
function DFT_2d(shape, justUpdate=false) {  // formerShape=false

    if (!justUpdate)
    {
        shape = truncate( removeNaN(shape) );
        
        /*
        if (!formerShape) {
            initialShape = shape;  // for future reference
        }
        */
        
        var xs = [];
        var ys = [];

        for (let i=1; i<shape.length; i++ ) {  // initalShape.length
            xs.push(shape[i][0]);   // initialShape[i][0]
            ys.push(shape[i][1]);   // initialShape[i][1]    
        }
        
        //let doShow = document.getElementById("showInitial").checked;
        //let doAlign = document.getElementById("doAlign").checked;
        //let align = doShow && doAlign ? {x:xDFT.a0,y:yDFT.a0} : {x:0,y:0};
        
        // Zero  average xs -> for n in xs ; n - average
        /*let mx = average(xs); //doAlign ? 0 : average(xs) ;
        let my = average(ys); //doAlign ? 0 : average(ys) ;
        
        if (document.getElementById("doAlign").checked){
            mx *= 0.5;
            my *= 0.5;
        }
        for (let n=0 ; n < xs.length ; n++) {
            xs[n] = xs[n]// - mx;
            ys[n] = ys[n]// - my;
        }
        */
        xDFT.data = xs;
        yDFT.data = ys;
        //Log("mx: "+ mx+"\n"+ "my: "+my)
    }
    
    let res = document.getElementById('resolutionPick').value;
    
    xDFT.setFilter(res); xDFT.build(justUpdate)
    yDFT.setFilter(res); yDFT.build(justUpdate)
    
    xDFT.show(0,doClear=false);
    yDFT.show(0,doClear=false);

    if ( document.getElementById("checkFreqTable").checked )
    {
        document.getElementById("freqTable1").getElementsByTagName('thead')[0].style="color: rgba(100,100,200,.9);"  // change cosine header to blue
        toggle_display('freqTable2','block');
    }


    var dftShape = [ {color:"white"} ];
    /* pen = { size:1, color:"white", isPainting: false }*/
    for (let p = 0; p < xDFT.wave.length; p++){
    
        if ( document.getElementById("doAlign").checked ) {
            dftShape.push( [
              xDFT.wave[p][1] - xDFT.a0 ,
              yDFT.wave[p][1] - yDFT.a0]
            );
        } else {
            dftShape.push( [
              xDFT.wave[p][1] - 2*xDFT.a0 + posH(1/2),
              yDFT.wave[p][1] - 2*yDFT.a0 + posV(4/9) ]
            );
        }
    }
    
    drawn[1] = dftShape;

}





var animateTimes = 0;
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
    
    
    //*
    if (canvasMode == 'modeDFT') {
        //modeDFT();
        paint();
    }
    //*/
        
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





function draw(things)
{
    things.forEach
    (
        function(thing) // 'thing' holds element within the list 'things';
        {
            thing.update();
        }
    )
}


function paint()
{
    if (pen.isPainting)
    {
        if ( !isNaN(mouse.x) ) {
            c.lineTo(mouse.x,mouse.y);
            shape.push( [mouse.x,mouse.y] );
            //Log( [mouse.x,mouse.y] );
            c.stroke();
        }
    }
}

async function repaint(drw, sleep=0){
    let doShow = document.getElementById("showInitial").checked;
    //let doAlign = document.getElementById("doAlign").checked;
    //let align = doShow && doAlign ? {x:xDFT.a0,y:yDFT.a0} : {x:0,y:0};
    let start = doShow ? 0 : 1 ;
    for (var shp=start; shp<drw.length; shp++) {
        c.beginPath();
        c.strokeStyle = drw[shp][0].color;
        c.lineWidth = 1;//drw[shp][0].size;
        c.moveTo( drw[shp][1][0], drw[shp][1][1] )
        for (var pos=1; pos<drw[shp].length; pos++) {
            //if (shp > 0) { await delay(sleep); }
            var xy = drw[shp][pos] ;
            c.lineTo( xy[0], xy[1]);
            c.stroke();
        }
    }
}




async function playResolutions()
{
    let oldRes = 0;
    let res = document.getElementById("playRes").value;
    //let rounder = document.getElementById("playSpeed").value ? mRound : Math.round ;
    //Log(res)
    res = ( res ) ? res : 0 ;
    
    for ( let i=1; i<= 100*10**res; i++ )
    {
        //i = i/decimals; //i / (10**decimals);

        if (pen.isPainting){
            return 
        }
        let newRes = mRound( 1/(10**res) + 100*(1-1/i) , res );
        
        
        //let newRes =  i/(10**res)
        
        if (newRes > oldRes) {
            oldRes = newRes;
            document.getElementById('resolutionPick').value = newRes;
            document.getElementById('showResolution').innerHTML = newRes;
            resolutionPicked();
            //if( xDFT.new_weights || yDFT.new_weights ) {
            updateShape();
            //}
            
            await delay(); // milliseconds
        }
    }
}


function getPixels(imgdata, mode="avg")
{
    //pixs = [{ vmax: _ , vmin: _ }]
    return
    /*
    if ( mode == "avg" ) {
        let ws = [];
        
        for ( let i = 0, n = imgdata.length ; i<n ; i+=4 ) 
        {
            ws.push( average( [ pixs[i],pixs[i+1],pixs[i+2] ] ) );
        }
        
        let wdft = DFT( ws );
        
        pixs.[0].vmax = Math.max(ws);
        pixs.[0].vmin = Math.min(ws);
        // scale
            
    } else if ( mode == "rgb" ) {
        let 
            rs = [];
            gs = [];
            bs = [];
            
        for ( let i = 0, n = imgdata.length ; i<n ; i+=4 ) 
        {
            rs.push( pixs[i  ] );
            gs.push( pixs[i+1] );
            bs.push( pixs[i+2] );
        }
        
        let 
            rdft = DFT( rs );
            gdft = DFT( gs );
            bdft = DFT( bs );
            
    } else if ( mode == "rgba" ) {
    
        let 
            rs = [];
            gs = [];
            bs = [];
            as = [];
            
        for ( let i = 0, n = imgdata.length ; i<n ; i+=4 ) 
        {
            rs.push( pixs[i  ] );
            gs.push( pixs[i+1] );
            bs.push( pixs[i+2] );
            as.push( pixs[i+3] );
        }
        
        let 
            rdft = DFT( rs );
            gdft = DFT( gs );
            bdft = DFT( bs );
            adft = DFT( as );
    }
    
    */
}


function dftOfCanvas()
{
    let 
        cantext = document.getElementById("myCanvas").getContext('2d');
        imgd = cantext.getImageData(0,0,canvas.width,canvas.height);
        pixs = imgd.data;
        ws = []; //rs = [], gs = [], bs = []
    
    Log(pixs)
    //Log(w_dft.wave);
}





// TOOLS //

function Log(thing)
{
    console.log(thing);
}


function clear(patch)
{
    c.clearRect(0, 0, patch.width, patch.height);
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function table(headers,data) {
    //toggle_visibility('dft_formula','hidden');
    var fullTable = headers.concat(data);
    var newTable = "<table><thead><tr>";
    for (let c=0 ; c<headers.length ; c++) {
        newTable += "<td style='text-align:center'>";
        newTable += fullTable[c];
        newTable += "</td>";
    }
    newTable += "</tr></thead>";
    for (let r=1 ; r<(1 + data.length/headers.length) && r<17 ; r++)
    {
        newTable += "<tr style='text-align:center'>";
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


function removeNaN(_shape)
{
    var filteredShape = [ _shape[0] ];
    for (let i=1; i<_shape.length; i++)
    {
        if ( !isNaN( _shape[i][0] ) ) {
            filteredShape.push(_shape[i])
        }
    }
    return filteredShape;
}


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



function sumList(a) {
    var s = 0;
    for (var i=0 ; i<a.length ; i++) {
        s += a[i][1] ;
    }
    return s;
}


function sumLists(a,b) {
    var s = [];
    for (var i=0 ; i<a.length ; i++) {
        s.push( [ i, a[i][1]+b[i][1] ] );
    }
    return s;
}


function mRound(n,decimals=1) {
    if ( typeof(n) != 'number' ) return;
    return Math.round( n * 10**decimals ) / 10**decimals
    //return Math.round(n) == n.toFixed(2) ? Math.round(n) : n.toFixed(1);
}


function average (nums) {
    var total = 0;
    for ( let i=0 ; i<nums.length ; i++ ) {
        total += Number(nums[i]);
    }
    return (total/nums.length);
}


function stringToNumbers(str) {
    var list = [];
    list = str.split(' ');
    list.forEach( n => Number(n) );

    return list   
}


function posH(part) {  // horizontal position
    return part*canvas.width;
}


function posV(part) {  // vertical position
    return part*canvas.height;
}



// OBJECTS //

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
            c.lineTo( t, - this.wave[t][1] + posV(1/2) );
        }
        c.stroke();
    }
}


function DFT(data=false,filter=100,axis=false)
{
    this.filter = 100-filter;
    this.filteredKI = [];
    this.filteredKJ = [];
    this.maxWeight = 0;
    this.axis = axis;
    this.a0 = 0;
    //this.new_weights = false;
    this.isDrawing = false;
    this.drawRequest = false;
    this.data = data;
    this.example = [ 10, -2.9, 0, 2.9, -10, -17.1, 0, 17.1 ];  // 10cos(1hz) + 10sin(2hz)

    this.res = 10*TAU**2 //31*TAU;
        
    this.zoom = 10;
    this.xStretch = TAU *this.zoom
    this.yStretch = 1 *this.zoom
    this.xPos = posH(1/10);
    this.yPos = posV(1/2);
    
    this.k_i = [];
    this.k_j = [];
    var ki;
    var kj;

    //this.a0 = average(this.data);
    
    this.build = function (justUpdate=false) {

        if (!this.data) {return};
        
        
        // Don't rebuild weights, when dealing with the same data
        if (!justUpdate)
        {
            this.N = this.data.length;
            
            this.a0 = average(this.data);  // either the average or just k_i[0]
            //Log( " a0@build " + this.a0 );
            //Log( "set " + this.data )
            
            this.k_i = [];
            this.k_j = [];
            
            // Do all weights
            for (var n = 0; n< this.N/2; n++) {
                ki = 0;
                kj = 0;
                for (var k = 0; k<this.N; k++) {
                    ki += this.data[k] * Math.cos( (n * k) * TAU/this.N );
                    kj += this.data[k] * Math.sin( (n * k) * TAU/this.N );
                }
                this.k_i.push( ki*(2/this.N) );
                this.k_j.push( kj*(2/this.N) );
            }
            
            // Figure max weight to properly scale filter later
            // Slice() removes a0, so that the dominant y-shift is not included
            let maxI = Math.max( ...this.k_i.slice(1).map(Math.abs) );
            let maxJ = Math.max( ...this.k_j.map(Math.abs) );
            this.maxWeight = ( maxI > maxJ ) ? maxI : maxJ ;
        }

        var scaledFilter = this.maxWeight * (this.filter/100) ;

        /*
        let oldAverageKI = average(this.filteredKI);
        let oldAverageKJ = average(this.filteredKJ);
        */
        this.filteredKI = [];
        this.filteredKJ = [];
        /*let oldKI,
            oldKJ,
            equal = 1;*/
            
        // Create new filtered weights
        for ( let k=0 ; k < this.N/2 ; k++ ){
            /*oldKI = this.filteredKI[k];
            oldKJ = this.filteredKJ[k];*/
            this.filteredKI[k] = ( Math.abs(this.k_i[k]) > scaledFilter ) ? this.k_i[k] : 0 ;
            this.filteredKJ[k] = ( Math.abs(this.k_j[k]) > scaledFilter ) ? this.k_j[k] : 0 ;
            /*
            Log( this.filteredKI[k] - oldKI );
            Log( this.filteredKJ[k] - oldKJ );
            oldKI = ( oldKI == this.filteredKI[k] )? 1 : 0;
            oldKJ = ( oldKJ == this.filteredKJ[k] )? 1 : 0;
            equal = equal * oldKI * oldKJ;*/
        }

        // Don't rebuild the wave, if no change was made to the weights
        /* But is this even slower ?
        if ( oldAverageKI == average(this.filteredKI) && oldAverageKJ == average(this.filteredKJ) ) {
          //Log("No change in weights");
          //this.new_weights = false;
          return;  
        }
        
        Log("Change in weights");
        this.new_weights = true;
        */
        
        this.wave = [];
        
        
        var FX = 0;
        var FY = 0;
        var cH = canvas.height;
        var cW = canvas.width;
        
        
        var correct = (this.axis) ? 0 : this.k_i[0];
        
        // Try flip the Y sinusoid correctly
        let flipper = (this.axis == 'y') ? (-1) : 1;
        
        /*
        if (this.axis=="x") { correct = posV(3/4) }
        if (this.axis=="y") { correct = posV(1/4) }
        */
        for (var x=0 ; x<this.res ; x++) {
            FY = 0;
            for (var n=0 ; n<this.N/2 ; n++) { 
                FY += (
                    this.filteredKI[n] * Math.cos( n * x / this.xStretch ) +
                    this.filteredKJ[n] * Math.sin( n * x / this.xStretch )
                    /* Former
                    this.k_i[n] * Math.cos( n * x / this.xStretch ) +
                    this.k_j[n] * Math.sin( n * x / this.xStretch )
                    */
                );
            }
             this.wave.push( [ x , FY -correct ] );
        }
    }
    this.build()
    
    
    this.setFilter = function(filter)
    {
        this.filter = 100-filter;
    }
    
    
    this.show = async function(sleep=0,doClear=true) {
        if (this.drawRequest == true) { return }
        if (this.isDrawing) { this.drawRequest = true }
        
        /*
        while (this.isDrawing) {
            await delay( 100*(sleep) );
        }
        */

        this.drawRequest = false
        this.isDrawing = true;
        
        if(doClear) { clear(canvas); }
        this.frequencplot_yPos();
        
        if(!axis) { await this.trace(sleep); }
                
        this.isDrawing = false;
    }
    
    
    this.frequencplot_yPos = function() {
    
        //if ( ! document.getElementById("checkFreqTable").checked ) { return; }
        
        c.font = '12px Times';
        c.fillStyle = 'white';
        c.textAlign = 'center';
        c.lineWidth = 2;
        
        let doAlternate = document.getElementById("doAlternate").checked;
        
        let dec = document.getElementById("playRes").value;
        dec = (dec) ? dec : 1;
        
        
        var
            plot_xPos = doAlternate ? posH(7/10) : posH(6/10);
            plot_yPos = posV(1/2)
        ;
        
        if (this.axis == "x") {
            plot_xPos = doAlternate ? posH(2/7) : posH(1/10);
            plot_yPos = posV(9/10);
            
        } else if (this.axis == "y") {
            plot_xPos = doAlternate ? posH(5/7) : posH(11/20);
            plot_yPos = posV(9/10);
        }
        
        var fWidth = 70*(10 / this.N) * (doAlternate ? 0.5 : 1) ;
        
        /*
        if (!this.axis) {
            if ( fWidth > 30 )
            {
                c.fillText(' HZ ', plot_xPos - 30, plot_yPos + 20 );
                c.fillText(' COS ', plot_xPos - 30, plot_yPos + 2*20 );
                c.fillText(' SIN ', plot_xPos - 30, plot_yPos + 3*20 );
            }
        }
        */
        
        
        

        var tHead = ( document.getElementById("checkFreqTable").checked ) ? [' Hz ','cos','sin'] : [];
        var tData = [];
        //var freqTable = document.getElementById('freqTable1');
        
        // Scale the freqplot to a specific measure  (small one grows, big ones shrinks)
        // by finding the largest freq coeff, and scale the rest relative to it.
        /* Already done at this.maxWeight ?
        let maxI = Math.max( ...this.k_i.map(Math.abs) );
        let maxJ = Math.max( ...this.k_j.map(Math.abs) );
        let maxFreq = ( maxI > maxJ ) ? maxI : maxJ ;
        */
        let maxPlotHeight = 110;
        let relativeFreq; // maxPlotHeight * ( freq_n / maxFreq ) 
        
        // Try flip the Y sinusoid correctly
        let flipper = (this.axis == 'y') ? (-1) : 1;
        
        for (var f=1 ; f<this.N ; f++) {   // count from 1 to dodge dominant a0
            
            //var row = freqTable.insertRow(f);
            
            fWidth *= (doAlternate) ? (-1) : 1;
            
            ki = flipper* mRound( this.filteredKI[f], dec ) ;
            kj = flipper* mRound( this.filteredKJ[f], dec ) ;
            
            /*
            var ki = flipper* mRound(this.k_i[f]);
            var kj = flipper* mRound(this.k_j[f]);
            */
            

            //if ( Math.abs( this.k_i[f] ) + Math.abs( this.k_j[f] ) > 0.1 )  // ?
            
            if ( document.getElementById("checkFreqTable").checked )
            {
                if ( Math.abs(ki) + Math.abs(kj) > 0 )  //Math.abs( this.filteredKI[f] ) + Math.abs( this.filteredKJ[f] ) > 0 )  // 0.1 ?
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
                    
                    
                    if ( Math.abs(fWidth) > 20 )
                    {
                        c.fillText(  f, plot_xPos + f*fWidth, plot_yPos +  20 );
                        c.fillText( ki, plot_xPos + f*fWidth, plot_yPos + 2*20 );
                        c.fillText( kj, plot_xPos + f*fWidth, plot_yPos + 3*20 );
                    }
                    
                }
            }
            
            c.beginPath();
            c.moveTo( plot_xPos + f*fWidth -2, plot_yPos );
            c.lineTo( plot_xPos + f*fWidth -2, plot_yPos - /*Math.log(*/ maxPlotHeight * ( ( Math.abs(ki) ) / this.maxWeight ) );
            c.strokeStyle= (ki > 0) ? '#008080' : '#5c168e';
            c.stroke();
            
            c.beginPath();
            c.moveTo( plot_xPos + f*fWidth +2, plot_yPos );
            c.lineTo( plot_xPos + f*fWidth +2, plot_yPos - /*Math.log(*/ maxPlotHeight * ( ( Math.abs(kj) ) / this.maxWeight ) );
            c.strokeStyle= (kj > 0) ? '#52acb7' : '#861667';
            c.stroke();
            
        }
        
        //var tbl = document.createElement('table');
        
        var freqTable = table(tHead,tData);
        tableID = (this.axis == 'y') ? 'freqTable2' : 'freqTable1';
        document.getElementById(tableID).innerHTML = freqTable;
    
        //document.createElement('table');
        //var tbl = document.createTextNode
        //Log(tData);
        //Log(freqTable);
    }
    
    this.trace = async function (sleep=false) {
        
        // Scale the sinusoid to a specific measure to deal with change of canvas width
        // by checking the current width of designated space
        let space = posH(3/7) - posH(1/10)
        let spaceScale = space / this.wave.length

        let relativeFreq; // maxPlotHeight * ( freq_n / maxFreq ) 
        
        
        sleep = sleep ? sleep : 0;
        
        var flatten = (this.axis) ? 10 : 1;
        let flipper = (this.axis == 'y') ? (-1) : 1;
        
        c.beginPath();
        c.strokeStyle = (this.axis) ? (this.axis == 'y' ? 'rgba(150,20,20,.5)' : 'rgba(0,80,200,1)' ) : 'white';
        c.lineWidth = 1;
        c.moveTo( this.xPos, flipper*(-this.wave[0][1]/flatten) * this.yStretch + this.yPos );
        
        
        for ( var t=0 ; t<(this.wave.length) ; t++ ) {
            await delay(sleep);
            c.lineTo( this.xPos +(t*spaceScale), flipper*(-this.wave[t][1]/flatten) * this.yStretch + this.yPos);
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


// INTERACT // 

function makeDFT() {

    var dataString = document.getElementById('dftData').value;
    //Log( 'dataString: ' + dataString );
    var data = stringToNumbers(dataString);
    //var user_dft = new DFT(data);
    //user_dft.data = data;
    var res = document.getElementById('resolutionPick').value;
    //user_dft.R = res;
    //user_dft.build();
    var user_dft = new DFT(data,res);
    drawn=[];
    user_dft.show(0);

}


function sizePicked() {
    //activeSize = document.getElementById('sizePick').value;
    pen.size = document.getElementById('sizePick').value;
}

function colorPicked() {
    pen.color = document.getElementById('colorPick').value;
}


function resolutionPicked() {
    R = document.getElementById('resolutionPick').value;
}


function select_canvas() {
    canvasMode = document.getElementById("canvasMode").value;
    if ( canvasMode == 'modeDFT' )
    {
        showDFT();
    }
    else if ( canvasMode == 'modeAnimate' )
    {
        showAnimate();
    }
    else if ( canvasMode == 'modePaint' )
    {
        showPaint();
    }
}


function showDFT() {
    document.getElementById('dftMode').hidden = false;
    document.getElementById('freqTable1').hidden=false;
    document.getElementById('freqTable2').hidden=false;
    
    document.getElementById('paintMode').hidden = true;
    
    clear(canvas);
}
function showAnimate() {
    document.getElementById('dftMode').hidden = true;
    document.getElementById('freqTable1').hidden=true
    document.getElementById('freqTable2').hidden=false;
    
    document.getElementById('paintMode').hidden = true;
    
    animate();
}
function showPaint() {
    document.getElementById('dftMode').hidden = true;
    document.getElementById('freqTable1').hidden=true
    document.getElementById('freqTable2').hidden=false;
    
    document.getElementById('paintMode').hidden = false;
    
    clear(canvas);
    //paint();
}




// MAIN //


/*
var ball_1 = new Ball(200,100,3,'blue',14,20);
var ball_2 = new Ball(50,210,8,'red',24,10);
var ball_3 = new Ball(20,100,12,'green',4,5);

var items = [ball_1, ball_2, ball_3];

var ball_4 = new Ball();
var ball_5 = new Ball();
var ball_6 = new Ball();

var extra = [ball_4, ball_5, ball_6];

items.concat(extra);

for (let i=0; i<50; i++)
{
    items.push(new Ball());
}
//*/



var drawn = [];

var tDFT = new DFT( [], 100 );
var xDFT = new DFT( [], 100, "x" );
var yDFT = new DFT( [], 100, "y" );

animate();



/*
var s1 = new Sine(1);
var s2 = new Sine(2);
var s3 = new Sine(1)
s3.wave = sumLists( s1.wave , s2.wave )
*/

//var user_dft = new DFT();





































