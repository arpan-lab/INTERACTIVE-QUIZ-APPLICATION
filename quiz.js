const quizData = [
    { 
        question: "Which ancient text is considered the primary scripture of Sanatan Dharma?", 
        options: ["Bible", "Vedas", "Quran", "Guru Granth Sahib"], 
        correct: 1 
    },
    { 
        question: "Who is known as the Father of Computers?", 
        options: ["Charles Babbage", "Alan Turing", "Thomas Edison", "Alexander Graham Bell"], 
        correct: 0 
    },
    { 
        question: "What is the largest ocean on Earth?", 
        options: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"], 
        correct: 3 
    },
    { 
        question: "Which programming language is primarily used for web development?", 
        options: ["Python", "JavaScript", "C++", "Java"], 
        correct: 1 
    },
    { 
        question: "What is the smallest prime number?", 
        options: ["1", "2", "3", "5"], 
        correct: 1 
    },
    { 
        question: "What is the chemical symbol for water?", 
        options: ["O2", "H2O", "CO2", "HO2"], 
        correct: 1 
    },
    { 
        question: "What is 5 squared?", 
        options: ["20", "10", "25", "30"], 
        correct: 2 
    },
    { 
        question: "Who painted the ceiling of the Sistine Chapel?", 
        options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"], 
        correct: 1 
    },
    { 
        question: "What is the speed of light?", 
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], 
        correct: 0 
    },
    { 
        question: "What is the capital of Japan?", 
        options: ["Shanghai", "Seoul", "Tokyo", "Beijing"], 
        correct: 2 
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 240;
let timerInterval; 

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submit-btn");
const submitSection = document.getElementById("submit-section");

function loadQuestion(index) {
    const quiz = quizData[index];
    questionEl.textContent = `${index + 1}. ${quiz.question}`;
    optionsEl.innerHTML = "";

    quiz.options.forEach((option, idx) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(idx, button);
        optionsEl.appendChild(button);
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === quizData.length - 1;
}

function checkAnswer(selected, button) {
    const quiz = quizData[currentQuestion];
    const buttons = optionsEl.querySelectorAll("button");

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === quiz.correct) btn.classList.add("correct-bg");
    });

    if (selected !== quiz.correct) {
        button.classList.add("incorrect-bg");
        document.body.style.backgroundColor = "#f8d7da";
    } else {
        score++;
        document.body.style.backgroundColor = "#d4edda";
    }

    setTimeout(() => (document.body.style.backgroundColor = "#f9f9f9"), 1000);
}
function showResult() {
    clearInterval(timerInterval); 
    document.getElementById("quiz").style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    submitSection.style.display = "none";
    resultEl.style.display = "block";
    resultEl.textContent = `You scored ${score} out of ${quizData.length}`;
}
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResult();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
            const seconds = (timeLeft % 60).toString().padStart(2, "0");
            timerEl.textContent = `Time Left: ${minutes}:${seconds}`;
        }
    }, 1000);
}
prevBtn.onclick = () => {
    currentQuestion--;
    loadQuestion(currentQuestion);
};
nextBtn.onclick = () => {
    currentQuestion++;
    loadQuestion(currentQuestion);
    if (currentQuestion === quizData.length - 1) {
        submitSection.style.display = "block";
        nextBtn.style.display = "none";
    }
};
submitBtn.onclick = () => {
    showResult();
};
loadQuestion(currentQuestion);
startTimer();

