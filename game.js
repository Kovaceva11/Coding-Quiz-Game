const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const countdownTimer = document.querySelector(".timercount");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Who Invented Javascript?",
    choice1: "Kid Cudi",
    choice2: "Brendan Eich",
    choice3: "Chuck Yeager",
    choice4: "Bill Gates",
    answer: 2,
  },
  {
    question: "When did Javascript first appear?",
    choice1: "January 1, 1983",
    choice2: "1993",
    choice3: "December 4, 1995",
    choice4: "January 31, 1989",
    answer: 3,
  },
  {
    question:
      "IF javascript Objects are a collection of Properties, The Properties are made up of what? ",
    choice1: "Boolean",
    choice2: "Object, Property",
    choice3: "Spaghetti and Meatballs",
    choice4: "Key-value Pairs",
    answer: 4,
  },
  {
    question: "What does HTML stand-for?",
    choice1: "Hot Tacos Mini Llamas",
    choice2: "Hyper Tigers Making Love",
    choice3: "Hyper Text Markup Language",
    choice4: "Hyper Train Musk Loop",
    answer: 3,
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<javascript>",
    choice2: "<js>",
    choice3: "<link>",
    choice4: "<script>",
    answer: 4,
  },
];

var timer = 60;
var timerCount = 60;

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

function timeLeft() {
  timer = setInterval(function () {
    timerCount--;
    countdownTimer.textContent = timerCount;

    if (timerCount <= 0) {
      clearInterval(timer);
      return window.location.assign("./end.html");
    }
  }, 1000);
}

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  timeLeft();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    if (classToApply === "incorrect") {
      timerCount -= 5;
      // window.alert("-5 points from Gryffindor");
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
