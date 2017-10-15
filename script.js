$(document).ready(function(){
	var big = Array(25,50,75,100);
	var small = Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10);
	//these are the numbers we are given

	var clicks = 0;
	var bigclicks = 0;
	var smallclicks = 0;
	var targets = 0;
	//creating counters

	var time = 60;
	function timer() {
		time--;
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
		
		$('.numbers').append('<span class="big">' + pick + '</div>') //add number to the numbers div
		console.log(clicks)
	});

	$('#small').click(function() {
		clicks++;

		if(clicks >= 6){
			$('#big').unbind('click'); //disable clicking big if all are dished out
			$('#small').unbind('click'); //disable clicking big if all are dished out
		}
		var pick = small[Math.floor(Math.random()*small.length)];
		small.splice(small.indexOf(pick),1)
		
		$('.numbers').append('<span class="big">' + pick + '</spam>') //add number to the numbers div
		console.log(clicks)
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

});