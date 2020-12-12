

function Log(thing)
    {
        console.log(thing)
    }


function flip() {
    var normal = document.getElementById('phone').textContent;
    var range = normal.length;
    var flipped = "";
    for ( var i=0; i<range; i++ ) {
        flipped = flipped + normal[(range-1)-i];
        Log(flipped)
    }
    document.getElementById('phone').textContent = flipped;
}

/*
function formatNumber(n)
{
    for (var i in n)
    {
        if i in [0-9]
        {
            res += i
        } 
    }
}
*/

function pf(from,to)
{
    var num = document.getElementById(from).value; //Log(num)
    
    if (num == null || num < 2)
    {
        document.getElementById(to).textContent = ""
        return
    }
    
    var nums = num.match(/[0-9]/g); //Log(nums)
    num = Number( nums.join("") ); //Log(num)
   
    var res = ""
    var cnt = 0
    
    for (var i=2; i <= Math.sqrt(num); i++)
    {
        while (num%i == 0)
        {
            num = num/i
            cnt += 1
        }
        if (cnt>0)
        {
            if (cnt==1)
            {
                res = res + " " + String(i)
            } else {
                res = res + " " + String(i) + "'" + String(cnt)
            }
            cnt = 0
            //Log(i)
        }
    }
    if (num > 1)
    {
        res = res + " " + String(num)
    }
    //Log(res)
    document.getElementById(to).textContent = res    
}




function echo(id)
{
    Log(document.getElementById(id).value)
}








// JS code


// Definitions

var M = Math
var PI = M.PI
var toRad = PI/180

///




// Functions 


function peek(vs) {  // type foo -> qj -> byei["Êea",]ÊPq >>> foo Ê -> @j -> ["foo",foo]
	var res = ""
	for (var i=0; i < vs.length; i++) {
		res += vs[i][0] + ": " + vs[i][1] + "\n"
	}
	alert( res )
}


function sail() {
	var bs = Number(document.getElementById("bs_in").value)
	var rs = Number(document.getElementById("rs_in").value)
	var ra = Number(document.getElementById("ra_in").value)*toRad
	var de = Number(document.getElementById("de_in").value)*toRad

//	peek([ ["bs",bs], ["rs",rs], ["ra",ra], ["de",de] ])

	var nomin = bs * M.sin(ra)
	var denom = M.sqrt( bs**2 + rs**2 - 2*bs*rs*M.cos(ra) )
	var twa = ra + M.asin( nomin/denom )

	var res = bs*M.cos(twa) / M.cos(twa+de)

	document.getElementById("sail_out").value = res.toFixed(1) + " kts"
	

}


function hi() {
	var name = document.getElementById("name_in").value;
	alert("Hi, " + name + "!");
}






// Try draw
// Reference https://bearnithi.com/2019/12/12/understanding-canvas-draw-a-line-in-canvas-using-mouse-and-touch-events-in-javascript/

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



















