const questions = [
    {
        question: "Which is the highest mountain peak in the world?",
        options: ["Nanga Parbat", "Kanchenjunga", "Mount Everest", "K2"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Question 2: Which planet is closest to the Sun?",
        options: ["Mars", "Venus", "Earth", "Jupiter"],
        correctAnswer: "Venus"
    },
    {
        question: "Question 3: What is the capital of India?",
        options: ["Hyderabad", "Indore", "Mumbai", "Delhi"],
        correctAnswer: "Delhi"
    },
    {
        question: "Question 4: Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "Tell us the normal boiling point of water?",
        options: ["90°C", "100°C", "125°C", "150°C"],
        correctAnswer: "100°C"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizCompleted = false;
let timer; 

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-button");
const resultElement = document.getElementById("result");
const timeRemainingElement = document.getElementById("time-remaining");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="option" value="${option}">${option}`;
        optionsElement.appendChild(label);
    });

    startTimer(15); // Start the timer with 15 seconds 
}

function startTimer(seconds) {
    let timeLeft = seconds;

    function updateTimer() {
        timeRemainingElement.textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer); 
            handleTimeUp();
        }
    }

    updateTimer(); 
    timer = setInterval(updateTimer, 1000); 
}

function stopTimer() {
    clearInterval(timer); 
    timeRemainingElement.textContent = ""; 
}

function handleTimeUp() {
   
    moveToNextQuestion();
    if (currentQuestionIndex === questions.length) {
        quizCompleted = true;
        displayResult(); 
    }
}
function displayResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    submitButton.style.display = "none";
    timeRemainingElement.style.display = "none"; 

    resultElement.textContent = `You scored ${score} out of ${questions.length} questions.`;
    resultElement.style.display = "block"; // Display the result
}



function moveToNextQuestion() {
    stopTimer(); 
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question and start its timer
    } else {
        quizCompleted = true;
        displayResult();
    }
}

submitButton.addEventListener("click", () => {
    if (quizCompleted) {
        return;
    }

    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }

    stopTimer(); 

    const userAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
        score++;
    }

    moveToNextQuestion(); // Move to the next question (or end the quiz)
});


loadQuestion(); 

// const restartButton = document.getElementById("restart-button");

// restartButton.addEventListener("click", () => {
    
//     clearInterval(timer);
//     timeRemainingElement.textContent = "";
    
  
//     currentQuestionIndex = 0;
//     score = 0;
//     quizCompleted = false;


//     resultElement.textContent = "";


//     loadQuestion();
//     startTimer();
// });

