var selectGameIndex;
var selectFrameIndex;
var isCreating;

var hits = [];
var scorecards = [];
var scorecasrdFrameScore;
var btn_frames;
var scorecasrdHitScoreElement;
var scorecasrdFrameScoreElement;
var parameters = [];

window.onload = function () {
	isCreating = false;
	scorecasrdHitScoreElement = [];
	scorecasrdFrameScoreElement = create2DArray(0, 0);
	btn_frames = create2DArray(0, 0);
	scorecasrdFrameScore = create2DArray(0, 0);
	create_buttons();
	create_scorecard();
};

function addScoreCard() {
	btn_frames[selectGameIndex][selectFrameIndex].setAttribute('class', selectFrameIndex == 9 ? 'framebox last' : 'framebox');
	create_scorecard();
}

function onclick_pictureInput(event) {
	let myInput = document.getElementById(event.currentTarget.value);
	myInput.click();
}

function input_changed(event) {
	let index = event.target.id.replace('input_', '');
	parameters[index]['img'].src = URL.createObjectURL(event.target.files[0]);
}

function delScoreCard() {
	if (scorecards.length > 1) {
		if (selectGameIndex == scorecards.length - 1) {
			selectGameIndex -= 1;
			selectFrameIndex = 0;
			btn_frames[selectGameIndex][0].setAttribute('id', 'selected');
		}
		btn_frames.pop();
		scorecasrdFrameScore.pop();
		scorecasrdFrameScoreElement.pop();
		scorecasrdHitScoreElement.pop();
		let removeTarget = scorecards.pop();
		removeTarget.remove();
	}
}

function create_scorecard() {
	if (isCreating) {
		alert('작성중인 프레임을 완료해 주십시오.');
	} else {
		selectGameIndex = scorecards.length;
		parameters.push({});
		let tagArea = document.getElementById('tagArea');
		let scorecard = document.createElement('div');
		scorecard.setAttribute('class', 'scorecard  d-flex justify-content-center');
		tagArea.appendChild(scorecard);
		scorecards.push(scorecard);
		btn_frames.push(new Array(0));
		scorecasrdFrameScore.push(new Array(0));
		scorecasrdFrameScoreElement.push(new Array(0));
		scorecasrdHitScoreElement.push(new Array(0));

		// let value = 'input_' + selectGameIndex;
		// let body = createElement('button', 'framebox-body');
		// body.setAttribute('value', value);
		// body.addEventListener('click', onclick_pictureInput);
		// panel.appendChild(body);
		// let outerbox = createElement('div', 'outerbox', null, body);
		// let inputElement = create_input(value, 'file', 'image/*');
		// inputElement.addEventListener('change', input_changed);
		// outerbox.appendChild(inputElement);
		// let imageElement = document.createElement('img');
		// imageElement.setAttribute('class', 'otherBox');
		// imageElement.setAttribute('src', '');
		// parameters[selectGameIndex]['img'] = imageElement;
		// parameters[selectGameIndex]['input'] = inputElement;
		// body.appendChild(imageElement);

		for (let i = 0; i < 9; i++) {
			create_defalutFrame(scorecard, i);
		}
		create_lastFrame(scorecard);
		btn_frames[selectGameIndex][0].setAttribute('class','framebox selected');
		selectFrameIndex = 0;
		scorecasrdFrameScoreElement[selectGameIndex][10].innerHTML = 0;
		scorecasrdFrameScoreElement[selectGameIndex][11].innerHTML = 300;
	}
}

function create_framebase(panel, i, classname = 'framebox') {
	let body = create_body(panel, classname, (i + 1).toString());
	body.setAttribute('id', selectGameIndex + '_' + i);
	body.addEventListener('click', onclick_framebody);
	btn_frames[selectGameIndex].push(body);
	let content_body = createElement('div', 'content_body', null, body);
	return content_body;
}

function create_body(parentElement, classname, title) {
	let e = createElement('div', classname,  null, parentElement);
	createElement('div', 'framename', null, e, title);
	return e;
	
}

function create_lastFrame(panel) {
	let content_body = create_framebase(panel, 9, 'framebox last');
	let outerbox = createElement('div', 'outerbox', null, content_body);
	createElement_addtextElment(outerbox, 'strikebox last first', scorecasrdHitScoreElement[selectGameIndex]);
	createElement_addtextElment(outerbox, 'strikebox last second', scorecasrdHitScoreElement[selectGameIndex]);
	createElement_addtextElment(outerbox, 'strikebox last', scorecasrdHitScoreElement[selectGameIndex]);
	createElement_addtextElment(content_body, 'framescorebox', scorecasrdFrameScoreElement[selectGameIndex]);

	let scorebody = create_body(panel, 'framebox', 'Score');
	createElement_addtextElment(scorebody, 'content_body', scorecasrdFrameScoreElement[selectGameIndex]);
	let totalscorebox = create_body(panel, 'framebox', 'Max Score');
	createElement_addtextElment(totalscorebox, 'content_body', scorecasrdFrameScoreElement[selectGameIndex]);
}

function create_defalutFrame(panel, i) {
	let content_body = create_framebase(panel, i)
	let outerbox = createElement('div', 'outerbox', null, content_body);
	createElement_addtextElment(outerbox, 'ballbox', scorecasrdHitScoreElement[selectGameIndex]);
	createElement_addtextElment(outerbox, 'strikebox', scorecasrdHitScoreElement[selectGameIndex]);
	createElement_addtextElment(content_body, 'framescorebox', scorecasrdFrameScoreElement[selectGameIndex]);
}

function onclick_framebody(event) {
	if (!isEmpty(event.currentTarget.id)) {
		let words = event.currentTarget.id.split('_');
		let gameIndex = Number(words[0]);
		let frameIndex = Number(words[1]);
		if (isCreating) {
			alert('작성중인 프레임을 완료해 주십시오.');
		} else {
			if (frameIndex * 2 > scorecasrdFrameScore[gameIndex].length) {
				alert('이전 프레임을 작성해 주세요.');
			} else {
				try {
					btn_frames[selectGameIndex][selectFrameIndex].setAttribute('class', selectFrameIndex == 9 ? 'framebox last' : 'framebox');
				} catch {}
				selectGameIndex = gameIndex;
				selectFrameIndex = frameIndex;
				btn_frames[gameIndex][frameIndex].setAttribute('class', selectFrameIndex == 9 ? 'framebox last' : 'framebox' + ' selected');
			}
		}
	}
}

function onclick_scorehit(event) {
	let index = Number(event.target.value);
	let scores = scorecasrdFrameScore[selectGameIndex];
	let figure = 0;
	if (selectFrameIndex > 8) {
		figure = 18 + (selectFrameIndex - 9);
		if (figure == scores.length) {
			scores.push(index);
		} else {
			scores[figure] = index;
			if (figure == 18) {
				scorecasrdHitScoreElement[selectGameIndex][19].innerHTML = '';
				scorecasrdHitScoreElement[selectGameIndex][20].innerHTML = '';
				scores[19] = 0;
				scores[20] = 0;
			}
		}
		// lastframe
		isCreating = true;
		if (index == 10) {
			scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = 'X';
		} else {
			scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = index.toString();
		}
		selectFrameIndex += 1;
		// alert("si:" + selectFrameIndex + " sc18:" + scores[18] + " sc19:" + scores[19])
		if (selectFrameIndex == 10 && scores[18] != 10) {
			for (let ii = 11 - index; ii < 11; ii++) {
				hits[ii].style.display = 'none';
			}
		} else if (selectFrameIndex == 11 && scores[18] + scores[19] == 10) {
			scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = '/';
			for (let ii = 0; ii < 11; ii++) {
				hits[ii].style.display = 'inline';
			}
		} else if (selectFrameIndex == 11 && scores[18] == 10 && index != 10) {
			for (let ii = 11 - index; ii < 11; ii++) {
				hits[ii].style.display = 'none';
			}
		} else if (
			(selectFrameIndex == 11 && scores[18] + scores[19] < 10) ||
			selectFrameIndex == 12
		) {
			if (scores[19] != 10 && index != 10 && scores[19] + index == 10)
				scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = '/';
			isCreating = false;
			for (let ii = 0; ii < 11; ii++) {
				hits[ii].style.display = 'inline';
			}
			btn_frames[selectGameIndex][9].setAttribute('id', '');
			selectFrameIndex = 0;
			btn_frames[selectGameIndex][selectFrameIndex].setAttribute('id', 'selected');
		}
	} else {
		figure = selectFrameIndex * 2;
		if (!isCreating) {
			if (figure == scores.length) {
				scores.push(index);
			} else {
				scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = '';
				scorecasrdHitScoreElement[selectGameIndex][figure + 1].innerHTML = '';
				scores[figure] = index;
				scores[figure + 1] = 0;
			}
			// 초구
			if (index == 10) {
				figure += 1;
				if (figure == scores.length) {
					scores.push(0);
				}
				// strike
				scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = 'X';
				btn_frames[selectGameIndex][selectFrameIndex].setAttribute('class', 'framebox');
				selectFrameIndex += 1;
				isCreating = false;
			} else {
				scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = index.toString();
				scorecasrdHitScoreElement[selectGameIndex][figure + 1].innerHTML = '';
				isCreating = true;
				for (let ii = 11 - index; ii < 11; ii++) {
					hits[ii].style.display = 'none';
				}
			}
		} else {
			// 두 번째 샷
			figure += 1;
			if (figure == scores.length) {
				scores.push(index);
			} else {
				scores[figure] = index;
			}
			if (index + scores[figure - 1] == 10) {
				scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = '/';
			} else {
				scorecasrdHitScoreElement[selectGameIndex][figure].innerHTML = index.toString();
			}
			isCreating = false;
			btn_frames[selectGameIndex][selectFrameIndex].setAttribute('class', 'framebox');
			selectFrameIndex += 1;
			for (let ii = 0; ii < 11; ii++) {
				hits[ii].style.display = 'inline';
			}
		}
		btn_frames[selectGameIndex][selectFrameIndex].setAttribute('class', selectFrameIndex == 9 ? 'framebox last' : 'framebox' + ' selected');
	}
	let newscore = sum_score(scores, true);
	if (scores.length < 21) {
		let minscore = scores.slice();
		for (let i = minscore.length; i < 21; i++) {
			minscore.push(0);
		}
		scorecasrdFrameScoreElement[selectGameIndex][10].innerHTML = sum_score(minscore);
	} else {
		scorecasrdFrameScoreElement[selectGameIndex][10].innerHTML = newscore;
	}

	if (scores.length < 21) {
		let maxscore = scores.slice();
		if ((i) => 18 && maxscore.length % 2 == 1) {
			maxscore.push(10 - maxscore[maxscore.length - 1]);
		}
		for (let i = maxscore.length; i < 21; i++) {
			if (i >= 18 || (i < 18 && i % 2 == 0)) {
				maxscore.push(10);
			} else {
				maxscore.push(0);
			}
		}
		scorecasrdFrameScoreElement[selectGameIndex][11].innerHTML = sum_score(maxscore);
	} else {
		if (figure < 18) {
			if (figure % 2 == 0) {
				let maxscore = scores.slice();
				maxscore[figure + 1] = 10 - maxscore[figure];
				newscore = sum_score(maxscore);
			}
		} else if (figure == 18) {
			let maxscore = scores.slice();
			maxscore[19] = 10 - maxscore[18];
			maxscore[20] = 10;
			newscore = sum_score(maxscore);
		} else if (figure == 19) {
			let maxscore = scores.slice();
			if (maxscore[18] + maxscore[19] >= 10) {
				if (maxscore[19] != 10) {
					maxscore[20] = 10 - maxscore[19];
				} else {
					maxscore[20] = 10;
				}
			} else {
				maxscore[20] = 0;
			}
			newscore = sum_score(maxscore);
		}
		scorecasrdFrameScoreElement[selectGameIndex][11].innerHTML = newscore;
	}
}

function createElement_addtextElment(parentElement, classname, pushTarget) {
	let e = createElement('div', classname, null, parentElement);
	addTextElement(e, pushTarget);
}

function create_input(id, type, accept, ishidden = true) {
	let e = document.createElement('input');
	e.setAttribute('id', id);
	e.setAttribute('type', type);
	e.setAttribute('accept', accept);
	if (ishidden == true) {
		e.style.visibility = 'hidden';
	}
	return e;
}

function create_button(parentElement, classValue, value) {
	let e = createElement('button', classValue, null, parentElement);
	e.setAttribute('value', selectGameIndex + '_' + value);
	e.addEventListener('click', onclick_framebody);
	btn_frames[selectGameIndex].push(e);
	return e;
}

function createElement(type, classValue, value = null, parentElement = null, text = null, textClass = 'text') {
	let e = document.createElement(type);
	e.setAttribute('class', classValue);
	if (value != null) {
		e.setAttribute('value', value);
	}
	if (parentElement != null) {
		parentElement.appendChild(e);
	}
	if (text != null) {
		addTextElementText(e, text, textClass);
	}
	return e;
}

function addTextElement(parentElement, pushTarget = null, classname = 'text') {
	let e = createElement('p', classname);
	parentElement.appendChild(e);
	if (pushTarget != null) pushTarget.push(e);
}

function addTextElementText(parentElement, text, classname) {
	let e = createElement('p', classname);
	parentElement.appendChild(e);
	e.innerHTML = text;
}

function create_buttons() {
	let tagArea = document.getElementById('buttons');

	for (let i = 0; i < 11; i++) {
		let new_element = document.createElement('button');
		new_element.setAttribute('class', 'btn btn-primary hitbutton');
		new_element.setAttribute('value', i.toString());
		new_element.addEventListener('click', onclick_scorehit);
		new_element.innerHTML = i.toString();
		tagArea.appendChild(new_element);
		hits.push(new_element);
	}
}

function sum_score(list, isFrameScoreUpdate = false) {
	let sum = 0;
	let framescore = [];
	for (let i = 0; i < list.length; i++) {
		sum += list[i];
		if (i < 18) {
			if (i % 2 == 1) {
				// second hit
				if (list[i - 1] != 10) {
					// 현재 프레임이 스트라이크가 아닌 경우
					if (list[i] + list[i - 1] != 10) {
						// 현재 프레임이 스페어처리가 아닌경우
						if (i > 2 && list[i - 3] == 10) {
							if (isFrameScoreUpdate) framescore.push(sum);
							sum += list[i] + list[i - 1];
						}
						if (isFrameScoreUpdate) {
							framescore.push(sum);
						}
					} else if (i > 1 && list[i - 3] == 10) {
						// 현재 프레임을 스페어 처리 했을 경우
						if (isFrameScoreUpdate) framescore.push(sum);
						sum += list[i] + list[i - 1];
					}
				}
			} else {
				// first hit
				if (i > 1) {
					if (i > 3 && list[i - 4] == 10 && list[i - 2] == 10) {
						if (isFrameScoreUpdate) framescore.push(sum);
						sum += 10 + list[i];
					} else if (list[i - 2] != 10 && list[i - 2] + list[i - 1] == 10) {
						// 전 프레임이 스페어 중일 경우
						if (isFrameScoreUpdate) framescore.push(sum);
						sum += list[i];
					}
				}
			}
		} else {
			if (i == 18) {
				if (list[14] == 10 && list[16] == 10) {
					// 더블 중
					if (isFrameScoreUpdate) framescore.push(sum);
					sum += 10 + list[i];
				} else if (list[16] != 10 && list[16] + list[17] == 10) {
					// 스페어 중
					if (isFrameScoreUpdate) framescore.push(sum);
					sum += list[i];
				} else if (list[16] == 10 && list[i] != 10) {
				}
			} else if (i == 19) {
				if (list[16] == 10 && list[17] != 10) {
					// 스트라이크 중
					if (isFrameScoreUpdate) framescore.push(sum);
					sum += list[i] + list[i - 1];
				}
				if (list[18] + list[19] < 10) {
					if (isFrameScoreUpdate) framescore.push(sum);
				}
			} else {
				if (isFrameScoreUpdate) framescore.push(sum);
			}
		}
	}
	if (isFrameScoreUpdate) {
		for (let i = 0; i < 10; i++) {
			scorecasrdFrameScoreElement[selectGameIndex][i].innerHTML = '';
		}
		for (let i = 0; i < framescore.length; i++) {
			scorecasrdFrameScoreElement[selectGameIndex][i].innerHTML = framescore[i].toString();
		}
	}
	return sum;
}

function isEmpty(value) {
	if (
		value == '' ||
		value == null ||
		value == undefined ||
		(value != null && typeof value == 'object' && !Object.keys(value).length)
	) {
		return true;
	} else {
		return false;
	}
}

function create2DArray(rows, columns) {
	var arr = new Array(rows);
	for (var i = 0; i < rows; i++) {
		arr[i] = new Array(columns);
	}
	return arr;
}

async function init() {
	model = await tmImage.load(modelURL, metadataURL);
}