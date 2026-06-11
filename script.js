var questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling webpages?",
        options: [
            "Python",
            "Java",
            "CSS",
            "C++"
        ],
        answer: 2
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: [
            "int",
            "var",
            "string",
            "float"
        ],
        answer: 1
    },
    {
        question: "Which company developed Java?",
        options: [
            "Microsoft",
            "Google",
            "Sun Microsystems",
            "Apple"
        ],
        answer: 2
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "//",
            "#",
            "<!-- -->",
            "**"
        ],
        answer: 0
    }
];
var currentQuestion = 0;
var score = 0;
var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var progressElement = document.getElementById("progress");
var feedbackElement = document.getElementById("feedback");
var nextButton = document.getElementById("next-btn");
var quizBox = document.getElementById("quiz-box");
var resultBox = document.getElementById("result-box");
var finalScore = document.getElementById("final-score");
var highScoreText = document.getElementById("high-score");
loadQuestion();
function loadQuestion() {
    feedbackElement.textContent = "";
    optionsElement.innerHTML = "";
    var questionData = questions[currentQuestion];
    progressElement.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;
    questionElement.textContent = questionData.question;
    for(var i = 0; i < questionData.options.length; i++) {
        var button = document.createElement("button");
        button.textContent = questionData.options[i];
        button.classList.add("option-btn");
        button.dataset.index = i;
        button.addEventListener("click", checkAnswer);
        optionsElement.appendChild(button);
    }
    nextButton.style.display = "none";
}
function checkAnswer() {
    var selectedIndex = Number(this.dataset.index);
    var correctIndex = questions[currentQuestion].answer;
    var buttons = document.querySelectorAll(".option-btn");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if(i === correctIndex) {
            buttons[i].classList.add("correct");
        }
    }
    if(selectedIndex === correctIndex) {
        score++;
        feedbackElement.textContent = "Correct Answer!";
    } else {
        this.classList.add("wrong");
        feedbackElement.textContent = "Wrong Answer!";
    }
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", function() {
    currentQuestion++;
    if(currentQuestion < questions.length) {
        loadQuestion();
    }
    else {
        showResult();
    }
});
function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    var percentage =
        (score / questions.length) * 100;
    finalScore.textContent =
        "Score: " +
        score +
        " / " +
        questions.length +
        " (" +
        percentage.toFixed(0) +
        "%)";
    var highScore =
        localStorage.getItem("highScore") || 0;
    if(score > highScore) {
        localStorage.setItem(
            "highScore",
            score
        );
        highScore = score;
    }
    highScoreText.textContent =
        "Highest Score: " + highScore;
}
document
.getElementById("restart-btn")
.addEventListener("click", restartQuiz);
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
}