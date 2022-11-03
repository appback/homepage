var selectGameIndex;
var selectFrameIndex;
var isCreating;

var hits = [];
var scorecards = [];
var scorecasrdHitScore = [];
var scorecasrdFrameScore = [];
var scores = [];
var frames = [];
var btn_frames = [];

window.onload = function () {
	create_buttons();

	scorecasrdHitScoreElement = [];
	scorecasrdFrameScoreElement = [];
	btn_frames = [];
	let tagArea = document.getElementById('tagArea');

	let scorecard = document.createElement('div');
	scorecard.setAttribute('class', 'row');
	tagArea.appendChild(scorecard);
	scorecards.push(scorecard);

	let col = document.createElement('div');
	col.setAttribute('class', 'col-md-9');
	scorecard.appendChild(col);

	let panel = document.createElement('div');
	panel.setAttribute('class', 'panel panel-body');
	col.appendChild(panel);

	for (let i = 0; i < 9; i++) {
		create_defalutFrame(panel, i);
	}
	create_lastFrame(panel);
	btn_frames[0].setAttribute('id', 'selected');
	selectGameIndex = 0;
	selectFrameIndex = 0;
	//scores = new Array(21).fill(0);
	scores = [];
	isCreating = false;
};

function create_game() {}

function create_lastFrame(panel) {
	let frameboxbody = document.createElement('button');
	frameboxbody.setAttribute('class', 'framebox-body last');
	frameboxbody.setAttribute('value', '9');
	frameboxbody.addEventListener('click', onclick_framebody);
	btn_frames.push(frameboxbody);
	panel.appendChild(frameboxbody);

	let framename = document.createElement('div');
	framename.setAttribute('class', 'framename frameFontSize');
	framename.innerHTML = '10';
	frameboxbody.appendChild(framename);

	let outerbox = document.createElement('div');
	outerbox.setAttribute('class', 'outerbox frameScoreFontSize');
	frameboxbody.appendChild(outerbox);

	let strikebox1 = document.createElement('div');
	strikebox1.setAttribute('class', 'strikebox last first frameScoreFontSize');
	outerbox.appendChild(strikebox1);
	scorecasrdHitScoreElement.push(strikebox1);
	let strikebox2 = document.createElement('div');
	strikebox2.setAttribute('class', 'strikebox last frameScoreFontSize');
	outerbox.appendChild(strikebox2);
	scorecasrdHitScoreElement.push(strikebox2);
	let strikebox3 = document.createElement('div');
	strikebox3.setAttribute('class', 'strikebox last frameScoreFontSize');
	outerbox.appendChild(strikebox3);
	scorecasrdHitScoreElement.push(strikebox3);

	let framescorebox = document.createElement('div');
	framescorebox.setAttribute('class', 'framescorebox frameScoreFontSize');
	frameboxbody.appendChild(framescorebox);
	scorecasrdFrameScoreElement.push(framescorebox);

	frameboxbody = document.createElement('button');
	frameboxbody.setAttribute('class', 'framebox-body');
	panel.appendChild(frameboxbody);

	framename = document.createElement('div');
	framename.setAttribute('class', 'framename frameFontSize');
	framename.innerHTML = 'Score';
	frameboxbody.appendChild(framename);

	framescorebox = document.createElement('div');
	framescorebox.setAttribute('class', 'framescorebox frameScoreFontSize');
	frameboxbody.appendChild(framescorebox);
	scorecasrdFrameScoreElement.push(framescorebox);
	frameboxbody = document.createElement('button');
	frameboxbody.setAttribute('class', 'framebox-body');
	panel.appendChild(frameboxbody);

	framename = document.createElement('div');
	framename.setAttribute('class', 'framename frameFontSize');
	framename.innerHTML = 'Max Score';
	frameboxbody.appendChild(framename);

	framescorebox = document.createElement('div');
	framescorebox.setAttribute('class', 'framescorebox frameScoreFontSizer');
	frameboxbody.appendChild(framescorebox);
	scorecasrdFrameScoreElement.push(framescorebox);
}

function create_defalutFrame(panel, i) {
	let frameboxbody = document.createElement('button');
	frameboxbody.setAttribute('class', 'framebox-body');
	frameboxbody.setAttribute('value', i.toString());
	frameboxbody.addEventListener('click', onclick_framebody);
	btn_frames.push(frameboxbody);
	panel.appendChild(frameboxbody);

	let framename = document.createElement('div');
	framename.setAttribute('class', 'framename frameFontSize');
	framename.innerHTML = (i + 1).toString();
	frameboxbody.appendChild(framename);

	let outerbox = document.createElement('div');
	outerbox.setAttribute('class', 'outerbox frameScoreFontSize');
	frameboxbody.appendChild(outerbox);

	let ball1box = document.createElement('div');
	ball1box.setAttribute('class', 'ball1box frameScoreFontSize');
	outerbox.appendChild(ball1box);
	scorecasrdHitScoreElement.push(ball1box);

	let strikebox = document.createElement('div');
	strikebox.setAttribute('class', 'strikebox frameScoreFontSize');
	outerbox.appendChild(strikebox);
	scorecasrdHitScoreElement.push(strikebox);

	let framescorebox = document.createElement('div');
	framescorebox.setAttribute('class', 'framescorebox frameScoreFontSize');
	frameboxbody.appendChild(framescorebox);
	scorecasrdFrameScoreElement.push(framescorebox);
}

function onclick_framebody(event) {
	if (!isNaN(event.target.parentElement.value)) {
		let index = Number(event.target.parentElement.value);
		if (isCreating) {
			alert('지금은 다른 프레임을 선택할 수 없습니다.');
		} else {
			if (index * 2 > scores.length) {
				alert('이전 프레임을 작성해 주세요.');
			} else {
				btn_frames[selectFrameIndex].setAttribute('id', '');
				selectFrameIndex = index;
				btn_frames[selectFrameIndex].setAttribute('id', 'selected');
			}
		}
	}
}

function create_buttons() {
	let tagArea = document.getElementById('buttons');

	for (let i = 0; i < 11; i++) {
		let new_element = document.createElement('button');
		new_element.setAttribute('class', 'btn btn-primary hitbutton');
		new_element.setAttribute('value', i.toString());
		new_element.addEventListener('click', function (event) {
			let index = Number(event.target.value);
			let figure = 0;

			if (selectFrameIndex > 8) {
				figure = 18 + (selectFrameIndex - 9);
				if (figure == scores.length) {
					scores.push(index);
				} else {
					scores[figure] = index;
				}
				// lastframe
				isCreating = true;
				if (index == 10) {
					scorecasrdHitScoreElement[figure].innerHTML = 'X';
				} else {
					scorecasrdHitScoreElement[figure].innerHTML = index.toString();
				}
				selectFrameIndex += 1;
				// alert("si:" + selectFrameIndex + " sc18:" + scores[18] + " sc19:" + scores[19])
				if (selectFrameIndex == 10 && scores[18] != 10) {
					for (let ii = 11 - index; ii < 11; ii++) {
						hits[ii].style.display = 'none';
					}
				} else if (selectFrameIndex == 11 && scores[18] + scores[19] == 10) {
					scorecasrdHitScoreElement[figure].innerHTML = '/';
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
						scorecasrdHitScoreElement[figure].innerHTML = '/';
					isCreating = false;
					for (let ii = 0; ii < 11; ii++) {
						hits[ii].style.display = 'inline';
					}
					btn_frames[9].setAttribute('id', '');
					selectFrameIndex = 0;
					btn_frames[selectFrameIndex].setAttribute('id', 'selected');
				}
			} else {
				figure = selectFrameIndex * 2;
				// alert(figure + ' ' + scores.length);
				if (!isCreating) {
					if (figure == scores.length) {
						scores.push(index);
					} else {
						scores[figure] = index;
					}
					//alert(figure + " " + scores.length);
					// 초구
					if (index == 10) {
						figure += 1;
						// alert(figure + ' ' + scores.length);
						if (figure == scores.length) {
							scores.push(0);
						}
						// strike
						scorecasrdHitScoreElement[figure].innerHTML = 'X';
						// scores[selectFrameIndex * 2] = 10;
						btn_frames[selectFrameIndex].setAttribute('id', '');
						selectFrameIndex += 1;
						isCreating = false;
					} else {
						// scores[figure] = index;
						scorecasrdHitScoreElement[figure].innerHTML = index.toString();
						scorecasrdHitScoreElement[figure + 1].innerHTML = '';
						isCreating = true;
						for (let ii = 11 - index; ii < 11; ii++) {
							hits[ii].style.display = 'none';
						}
					}
					// scores[figure + 1] = 0;
				} else {
					// 두 번째 샷
					figure += 1;
					if (figure == scores.length) {
						scores.push(index);
					} else {
						scores[figure] = index;
					}
					// scores[figure] = index;
					// alert(index + " " + scores[figure - 1]);
					if (index + scores[figure - 1] == 10) {
						scorecasrdHitScoreElement[figure].innerHTML = '/';
					} else {
						scorecasrdHitScoreElement[figure].innerHTML = index.toString();
					}
					isCreating = false;
					btn_frames[selectFrameIndex].setAttribute('id', '');
					selectFrameIndex += 1;
					for (let ii = 0; ii < 11; ii++) {
						hits[ii].style.display = 'inline';
					}
				}
				btn_frames[selectFrameIndex].setAttribute('id', 'selected');
			}
			// alert('scores:' + scores.join());
			sum_score(figure, scores);
		});
		new_element.innerHTML = i.toString();
		tagArea.appendChild(new_element);
		hits.push(new_element);
	}
}

function sum_score(figure, list) {
	let sum = 0;
	let max = 300;
	let framescore = [];
	for (let i = 0; i < scores.length; i++) {
		sum += list[i];
		if (i < 18) {
			if (i % 2 == 1) {
				// second hit
				if (list[i - 1] != 10) {
					// 현재 프레임이 스트라이크가 아닌 경우
					if (list[i] + list[i - 1] != 10) {
						// 현재 프레임이 스페어처리가 아닌경우
						if (i > 2 && list[i - 3] == 10) {
							framescore.push(sum);
							sum += list[i] + list[i - 1];
						}
						framescore.push(sum);
					} else if (i > 1 && list[i - 3] == 10) {
						// 현재 프레임을 스페어 처리 했을 경우
						framescore.push(sum);
						sum += list[i] + list[i - 1];
					}
				}
			} else {
				// first hit
				if (i > 1) {
					// alert(i + " " + list[i - 4] + " " + list[i - 2] + " " + list.join());
					if (i > 3 && list[i - 4] == 10 && list[i - 2] == 10) {
						// 더블 중
						// alert('더블 중')
						framescore.push(sum);
						sum += 10 + list[i];
					} else if (list[i - 2] != 10 && list[i - 2] + list[i - 1] == 10) {
						// 전 프레임이 스페어 중일 경우
						framescore.push(sum);
						sum += list[i];
					}
					//if (list[i] == 10) { //현재 프레임이 스트라이크이 경우
					// if (i > 2 && list[i - 3] + list[i - 2] == 10) { // 전 프레임이 스트라이크 중일 경우
					// 	framescore.push(sum);
					// 	sum += list[i] + list[i - 1];
					// }
					// framescore.push(sum);
					//}
				}
			}
		} else {
			if (i == 18 && list[14] == 10 && list[16] == 10) {
				// 더블 중
				framescore.push(sum);
				sum += 10 + list[i];
			} else if (i == 19 && list[16] == 10) {
				// 스트라이크 중
				framescore.push(sum);
				sum += list[i] + list[i - 1];
			} else if (i == 20) {
				framescore.push(sum);
			} else if (i == 18 && list[16] + list[17] == 10) {
				// 스페어 중
				framescore.push(sum);
			}
			if (i == 19 && list[18] + list[19] < 10) {
				framescore.push(sum);
			}
		}
	}
	//alert('selectFrameIndex:' + selectFrameIndex +  ' sum:' + sum + ' list:' + list.join() + ' fs:' + framescore.join());
	for (let i = 0; i < 10; i++) {
		scorecasrdFrameScoreElement[i].innerHTML = '';
	}
	for (let i = 0; i < framescore.length; i++) {
		scorecasrdFrameScoreElement[i].innerHTML = framescore[i].toString();
	}
	scorecasrdFrameScoreElement[10].innerHTML = sum;
	// alert('sum:' + sum + ' max' + max + " " + list.join() + " fs:" + framescore.join());
}