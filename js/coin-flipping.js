var flipTime = 2500;
var coin = document.getElementById('coin');

var heads = 'is-heads';
var tails = 'is-tails';
var flipping = 'is-flipping';
var waitTime = 10000;

var isFipping = false;

window.onload = function () {
	coin = document.getElementById('coin');
};

//Function that simulates the coin flip
function flip() {
	if (isFipping == true) {
		alert('아직 준비중이에요.');
	} else {
		isFipping = true;
		// Increment the total count of flips
		coin.setAttribute('class', flipping);
		//Display message while coin is flipping
		document.getElementsByClassName('msg')[0].innerHTML =
			'저도 <span>고민</span>이 되는 문제네요...';
		setTimeout(result, flipTime);
		setTimeout(endDelay, waitTime);
	}
}

function result() {
	coin.removeAttribute('class', flipping);
	previewImage();
	//Randomising result for heads and tails
	var res = Math.random();
	//1 for heads 4 for tails
	if (res > 0.505) {
		coin.setAttribute('class', heads);
		//Display that the coin landed on heads
		document.getElementsByClassName('msg')[0].innerHTML = '<span>진행</span>하세요!';
	} else if (res > 0.01) {
		coin.setAttribute('class', tails);
		//Increment the total tails count
		document.getElementsByClassName('msg')[0].innerHTML = '<span>보류</span>해야 할듯 하네요.';
	} else if (res > 0.005) {
		coin.setAttribute('class', heads);
		//  Display the coin landed on tails
		document.getElementsByClassName('msg')[0].innerHTML =
			'<span>반드시 진행</span>하세요 꼭이요!';
	} else {
		coin.setAttribute('class', tails);
		//  Display the coin landed on tails
		document.getElementsByClassName('msg')[0].innerHTML =
			'<span>절대 안돼요</span> 다시 생각해 보세요.';
	}
}

function endDelay() {
	isFipping = false;
}