$(document).ready(function(){}
	var big = Array(25,50,75,100);
	var small = Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10);
	//these are the numbers we are given

	//picking big numbers
	$('#big').click(function()) {
		var pick = big[Math.floor(Math.random()*big.length)];
		$('#big').unbind('click'); //disable clicking big if all are dished out
		$('.numbers-bar').append('<span class="big">' + pick + '</div>')
	}


)