var flipTime = 2500;
var coin = document.getElementById('coin');

var heads = 'is-heads';
var tails = 'is-tails';
var flipping = 'is-flipping';

window.onload = function () {
	coin = document.getElementById('coin');
};

//Function that simulates the coin flip
function flip() {
	// Increment the total count of flips
	coin.setAttribute('class', flipping);
	//Display message while coin is flipping
	document.getElementsByClassName('msg')[0].innerHTML = 'Coin Flipping...';
	setTimeout(result, flipTime);
}

function result() {
	coin.removeAttribute('class', flipping);

	//Randomising result for heads and tails
	var res = Math.random();
	//1 for heads 4 for tails
	if (res > 0.505) {
		coin.setAttribute('class', heads);
		//Display that the coin landed on heads
		document.getElementsByClassName('msg')[0].innerHTML = 'Coin landed on <span>heads</span>';
	} else if (res > 0.01) {
		coin.setAttribute('class', tails);
		//Increment the total tails count
		document.getElementsByClassName('msg')[0].innerHTML = 'Coin landed on <span>tails</span>';
	} else if (res > 0.05) {
		coin.setAttribute('class', heads);
		//  Display the coin landed on tails
		document.getElementsByClassName('msg')[0].innerHTML = 'Coin landed on <span>heads</span>';
	} else {
		coin.setAttribute('class', tails);
		//  Display the coin landed on tails
		document.getElementsByClassName('msg')[0].innerHTML = 'Coin landed on <span>tails</span>';
	}
}