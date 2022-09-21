const quizData = [
    {
        question: "How Old is Syahrul ?",
        a: '12',
        b: '19',
        c: '22',
        d: '17',
        correct: 'b'
    },
    {
        question: "What is most most used programming languange in 2019 ?",
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'Javascript',
        correct: 'd'
    },
    {
        question: "1+1 is ?",
        a: '1',
        b: '-1',
        c: '2',
        d: '20',
        correct: 'c'
    },
    {
        question: "What is HTML stand for ?",
        a: 'Hypertext Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Jason Object Natation',
        d: 'Helicopters Paracopter',
        correct: 'a'
    },
    {
        question: "What year was Javascript Launched ?",
        a: '1993',
        b: '1994',
        c: '1995',
        d: '1996',
        correct: 'a'
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();


function loadQuiz() {
    deselectAnswer();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    
    return answer;
}

function deselectAnswer() {
    answerEls.forEach((answerEl) =>     {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    console.log(answer);
    
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        } 
        
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2 style="text-align: center; padding: 20px 0;">Correct ${score}/${quizData.length} question.</h2>`;
            quiz.innerHTML += `<button style="padding: 5px 0;" id="submit" onclick="return location.reload()">Restart</button>`;
        }
    }
});