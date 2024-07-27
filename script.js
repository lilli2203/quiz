const startButton = document.querySelector('.start-btn');
const quizContainer = document.querySelector('.quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizHeading = document.querySelector('.quiz-heading');
const progressBar = document.getElementById('progress-bar');

const questions = [{
    question: 'What is the capital of Japan?',
    answers: [{text: 'Beijing', correct: false}, {text: 'Seoul', correct: false}, {
        text: 'Tokyo', correct: true
    }, {text: 'Bangkok', correct: false},],
}, {
    question: 'Who painted the Mona Lisa?',
    answers: [{text: 'Vincent van Gogh', correct: false}, {text: 'Leonardo da Vinci', correct: true}, {
        text: 'Pablo Picasso', correct: false
    }, {text: 'Claude Monet', correct: false},],
}, {
    question: 'Which planet is known as the Red Planet?',
    answers: [{text: 'Venus', correct: false}, {text: 'Mars', correct: true}, {
        text: 'Mercury', correct: false
    }, {text: 'Neptune', correct: false},],
}, {
    question: 'What is the speed of light?',
    answers: [{text: '300,000 km/s', correct: true}, {text: '150,000 km/s', correct: false}, {
        text: '450,000 km/s', correct: false
    }, {text: '600,000 km/s', correct: false},],
}, {
    question: 'Who is the author of "Pride and Prejudice"?',
    answers: [{text: 'Jane Austen', correct: true}, {text: 'Emily Brontë', correct: false}, {
        text: 'Charles Dickens', correct: false
    }, {text: 'Mary Shelley', correct: false},],
},];

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hidden');
    quizHeading.classList.add('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    progressBar.classList.remove('hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

        const optionNumber = document.createElement('div');
        optionNumber.innerText = `Option ${index + 1}`;
        optionNumber.classList.add('option-number');

        const optionText = document.createElement('div');
        optionText.innerText = answer.text;
        optionText.classList.add('option-text');

        button.appendChild(optionNumber);
        button.appendChild(optionText);

        answerButtonsElement.appendChild(button);
    });

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function resetState() {
    questionElement.classList.remove('result');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    progressBar.style.width = '0%';
}

function selectAnswer(e) {
    const selectedButton = e.target.closest('button');
    const correct = selectedButton.dataset.correct;
    if (correct === 'true') {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `Quiz Finished! Your score is ${score} out of ${questions.length}.`;
    startButton.innerText = 'Restart Quiz';
    startButton.classList.remove('hidden');
    questionElement.classList.add('result');
    progressBar.classList.add('hidden');
}
