var first = [
	'Święty',
	'Pijany',
	'Upalony',
	'Opasły'
];

var second = [
	'Borsuk',
	'Świnia'
	'Jeż'
];


$(document).ready(function() {
	$("#randomize").on('click', getRandomNickname)
});

var getRandomNickname = function() {
	var firstRandom = $.randomBetween(0, first.length);
	var secondRandom = $.randomBetween(0, second.length);
	var firstRandomWord = first[firstRandom];
	var secondRandomWord = second[secondRandom];
	
	$("#nick").append(firstRandomWord + ' ' + secondRandomWord);
};