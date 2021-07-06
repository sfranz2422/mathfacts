let numberCorrect = 0;

let operationSelect = document.getElementById('operation-select');
operationSelect.addEventListener('change', () => {
	showQuestion(makeQuestion());
});

function makeQuestion() {
	console.log(operationSelect.value);
	document.getElementById('heading').innerHTML = operationSelect.value;
	let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	let num1 = Math.floor(Math.random() * 12 + 1);
	num1 *= plusOrMinus;
	let num2 = Math.floor(Math.random() * 12 + 1);

	let answer;
	let operator;
	if (operationSelect.value === 'Multiplication') {
		answer = num1 * num2;
		operator = 'x';
	} else if (operationSelect.value === 'Addition') {
		answer = num1 + num2;
		operator = '+';
	} else if (operationSelect.value === 'Subtraction') {
		answer = num1 - num2;
		operator = '-';
	} else if (operationSelect.value === 'Mixed') {
		let randomNumber = Math.floor(Math.random() * 4 + 1);
		if (randomNumber === 1) {
			answer = num1 - num2;
			operator = '-';
		} else if (randomNumber === 2) {
			answer = num1 * num2;
			operator = 'x';
		} else if (randomNumber === 3) {
			answer = num1 + num2;
			operator = '+';
		}
	}

	let a = answer + Math.floor(Math.random() * 3 + 1);
	let b = answer;
	let c = answer - Math.floor(Math.random() * 3 + 1);
	let d = Math.floor(answer / 2);
	let shuffle = Math.floor(Math.random() * 4 + 1);
	if (shuffle === 1) {
		return {
			title: `${num1} ${operator} ${num2}`,
			alternatives: [a, b, c, d],
			correctAnswer: answer,
		};
	}
	if (shuffle === 2) {
		return {
			title: `${num1} ${operator} ${num2}`,
			alternatives: [b, a, c, d],
			correctAnswer: answer,
		};
	}
	if (shuffle === 3) {
		return {
			title: `${num1} ${operator} ${num2}`,
			alternatives: [a, c, b, d],
			correctAnswer: answer,
		};
	}
	if (shuffle === 4) {
		return {
			title: `${num1} ${operator} ${num2}`,
			alternatives: [a, d, c, b],
			correctAnswer: answer,
		};
	}
}

showQuestion = (q) => {
	let titleDiv = document.getElementById('title');
	let feedback = document.getElementById('feedback');
	let correct = document.getElementById('correct');
	titleDiv.textContent = q.title;

	let buttons = document.querySelectorAll('.alternative');
	buttons.forEach((button, index) => {
		button.style.backgroundColor = 'lightgray';
		button.textContent = q.alternatives[index];
		button.addEventListener('click', (event) => {
			if (event.target.innerHTML === q.correctAnswer.toString()) {
				event.target.style.backgroundColor = 'green';
				numberCorrect++;
				correct.textContent = `Correct: ${numberCorrect}`;
				feedback.textContent = 'Great Job!';
				setTimeout(function () {
					feedback.textContent = '';
					console.log('Yay!! You win!');
					showQuestion(makeQuestion());
				}, 1000);
			} else {
				console.log('incorrect');
				event.target.style.backgroundColor = 'red';
				feedback.textContent = 'Try Again!';
				setTimeout(function () {
					feedback.textContent = '';
					event.target.style.backgroundColor = 'lightgray';
				}, 500);
			}
			console.log(event.target.innerHTML);
		});
	});
};

showQuestion(makeQuestion());
