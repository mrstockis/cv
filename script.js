

function Log(thing)
    {
        console.log(thing)
    }


function select_profession(profession=false)
{
    let professions = [
                        ".programming", ".maintenance", ".cleaning",
                        ".transport", ".construction", ".logistics",
                        ".basking", ".horticulture", ".misc"
                    ];
    
    profession = (profession) ? profession : document.getElementById("professionMode").value;
    
    if (profession == '.all')
    {
        document.getElementById("areas_list").display = "block";
        document.getElementById("out_profession").textContent = "";
        professions.forEach( p => { document.querySelectorAll( p ).forEach( e => { e.style="display: block" } ) } );
    } else {
        document.getElementById("areas_list").display = "none";
        document.getElementById("out_profession").innerHTML = profession.replace(".","") ;
        professions.forEach( p => { document.querySelectorAll( p ).forEach( e => { e.style="display: none" } ) } );
        document.querySelectorAll( profession ).forEach(e => { e.style="display: block" })
    }
}



function toggle_visibility(id,state=false)
{
    e = document.getElementById(id);
    
    if (state)
    {
        e.style.visibility = state;
    }
    else if (e.style.visibility == "hidden")
    {
        e.style.visibility = "visible";
    } else {
        e.style.visibility = "hidden";
    }
}


function toggle_display(id,state=false)
{
    e = document.getElementById(id);
    
    if (state)
    {
        e.style.display = state;
    }
    else if (e.style.display == "none")
    {
        e.style.display = "block";
    } else {
        e.style.display = "none";
    }
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















