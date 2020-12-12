

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

function pf(name)
{
    var num = document.getElementById(name).textContent; Log(num)
    var nums = num.match(/[0-9]/g); Log(nums)
    num = Number( nums.join("") ); Log(num)
   
    var res = ""
    var cnt = 0
    
    for (var i=2; i<=num; i++)
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
            Log(i)
        }
    }
    
    Log(res)
    document.getElementById(name).textContent = res    
}




function echo(id)
{
    Log(document.getElementById(id).value)
}



