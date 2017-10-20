var big = Array(25,50,75,100);
var small = Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10);
var nums = Array(0);
//these are the numbers we are given

var clicks = 0;
var bigclicks = 0;
var smallclicks = 0;
var targets = 0;
//creating click counters

var time = 60;

var i=0; var j=0;  		// basic counters
tools=new Array(6);		// the six numbers to use
fun=new Array(6);		// the function at each level
higher=new Array(6);		// one of the two numbers to combine
lower=new Array(6);		// the other to use at each level
k=new Array(6);		// to use for sorting
for (i=0; i<6;  i++) 		// set arrays to zero
	{tools[i]=0; fun[i]=0; higher[i]=0; lower[i]=0; k[i]=0; 
	} 
sorted=new Array(21);		// the numbers available used at various levels
formula=new Array(21);		// how these numbers were create
possib=new Array(21);		// possible choices for tools
for (j=0; j<21;  j++) 		// set arrays to zero;
	{sorted[j]=0; formula[j]=""; possib[i]=0;
	} 
symbol=new Array(4);		// the four functions		
symbol[0]="+"; symbol[1]="-"; symbol[2]="*"; symbol[3]="/";
var bestsofar=0;		// keep track of the best attempt
var target=0;			// the number aimed for
var level=0;			// how many combinations so far
var newform="";		// a new formula
var thiscalc=0;		// a trial calculation
var done=0;			// 0=not done, 1=done already
var domore=0;			// 0=go on looking, 1=calculate, 2=stop

function compcalc(x){return ((42 - ((6-x)*(7-x))) / 2);}

function calculate(nums) 
	{
	
	 for (i=0; i<6;  i++) 
		{tools[i]=eval(nums[i]);
		 sorted[i]=0; fun[i]=0; 
		} 
	 target=parseInt(document.getElementsByClassName("target")[1].innerHTML);
	 
	 //sort the numbers, highest first
	 for (i=0; i<6; i++)
		{k[i]=0;
		 for (j=0; j<6; j++)
			{if ((tools[i]) < tools[j] || (tools[i]==tools[j] && i<j)) 
		 		{k[i]++;
				}
			}
		 sorted[k[i]]=tools[i];
		 formula[k[i]]="" + sorted[k[i]];
		}
	
	 //initialise
	 level=0;
	 bestsofar=0;
	 higher[level] = compcalc(level);
	 lower[level] = higher[level]+1;
	 fun[level]=0;
	 domore=0;  //0 go on looking, 1 calculate, 2 stop 
	 
	 //go on until stop (could be some time)
	 while (domore<2)
	 	{if (5<=higher[0])
			{domore=2;
			}
		 else	{domore=1;
				
			 //check that the numbers being processed mean something
			 if (compcalc(level+1) <= lower[level])
				{higher[level]++;
				 lower[level]=higher[level]+1;
				 fun[level]=0;
				 domore=0;
				}
			 if ((compcalc(level+1) <= (higher[level]+1)) || (4<level))
				{if (5<=higher[0])
					{domore=2;
					}
				 else	{level--;
					 fun[level]++;
					 domore=0;
					}
				}
			}

		 if (domore==1) 
			{//check that the function being processed means something
			 if ((fun[level]==1 && sorted[higher[level]]<=sorted[lower[level]]) ||
			     (fun[level]==2 && sorted[lower[level]]<=1) ||
			     (fun[level]==3 && 
			      (0<sorted[higher[level]]%sorted[lower[level]] || 
			         sorted[lower[level]]<=1)))
				{fun[level]++;
				 domore=0;
				}
			 if (4<=fun[level])
				{lower[level]++;
				 fun[level]=0;
				 domore=0;
				}
			}

		 if (domore==1)
			{//do the calculation
			 newform = "(" + formula[higher[level]] + symbol[fun[level]];
			 newform = newform + formula[lower[level]] + ")";
			 thiscalc = eval("" + sorted[higher[level]] + symbol[fun[level]] 
			                 + sorted[lower[level]]);
			 
			 //see if a better estimate
			 if (Math.abs(eval(target) - thiscalc) < 
			     Math.abs(eval(target) - eval(bestsofar)))
				{bestsofar = thiscalc;
				 domore=1;
				 if (eval(bestsofar) == eval(target))
					{
					 domore=2;
					}
				}
	
			 //move on to next level down
			 if (domore<2)
				{i=compcalc(level);
				 done=0;
				 for (j=compcalc(level+1); j<compcalc(level+2); j++)
				 	{if (i==higher[level])
						{i++;
						}
					 if (i==lower[level])
						{i++;
						}
					 if (done==0 && 
					     (sorted[i]<=thiscalc || compcalc(level+1)<=i))
						{sorted[j]=thiscalc;
						 formula[j]=newform;
						 done=1;
						}
					 else	{sorted[j]=sorted[i];
						 formula[j]=formula[i];
						 i++;
						}
					}
				 level++;
				 fun[level]=0;
			 	 higher[level] = compcalc(level);
				 lower[level] = higher[level]+1;
				 domore=0;
				}	  	 
			}
		}
		return (newform + " = " + bestsofar);
	}

$(document).ready(function(){
	function timer() {
		time--;
		if (time < 0) {
			time = 0;
		}
		$('.timer').html("Time Left:" + time);
	};

	//picking big numbers
	$('#big').click(function() {
		clicks++;
		bigclicks++;

		if(bigclicks >= 4){
			$('#big').unbind('click'); //disable clicking big if all are dished out
		}

		if(clicks >= 6){
			$('#big').unbind('click'); //disable clicking big if all are dished out
			$('#small').unbind('click'); //disable clicking big if all are dished out
		}
		var pick = big[Math.floor(Math.random()*big.length)];
		big.splice(big.indexOf(pick),1)
		nums.push(pick)
		
		$('.numbers').append('<span class="bignum">' + pick + '</div>') //add number to the numbers div
		console.log(nums);
	});

	$('#small').click(function() {
		clicks++;

		if(clicks >= 6){
			$('#big').unbind('click'); //disable clicking big if all are dished out
			$('#small').unbind('click'); //disable clicking big if all are dished out
		}
		var pick = small[Math.floor(Math.random()*small.length)];
		small.splice(small.indexOf(pick),1)
		nums.push(pick);
		
		$('.numbers').append('<span class="smallnum">' + pick + '</spam>') //add number to the numbers div
		console.log(nums);
	});

	$('#target').click(function( ) {
		targets++
		if (targets >= 1) {
			$('.target').unbind('click');
		}
		var target = parseInt(Math.random()*900 + 100);
		$('.target').append('<span class="target">'+ target + '</span>')
		var clock = setInterval(timer,1000)
	});

	$('#reset').click(function(){
		window.location.href=window.location.href;
    }); 

    $('#get-answer').click(function () {
    	$("#answer").val((calculate(nums)));
    });
});
