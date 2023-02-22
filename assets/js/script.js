var start = document.getElementById("start-btn");
var countdown = document.getElementById("timer");
var quizQuestion = document.getElementById("code-question");
var instructions = document.getElementById("instructions");
var mainWindow = document.getElementById("main-window");
var highScores = document.getElementById("high-scores");
var currentIndex = 0;
var timeLeft = 60;

highScores.addEventListener("click", function () {
  instructions.style.display = "none";
  start.style.display = "none";
  var userInitialsAndTime = JSON.parse(localStorage.getItem("recentScore"));
  quizQuestion.textContent = userInitialsAndTime.initials;

  var goHome = document.createElement("button");
  goHome.innerHTML = "Go Home";
  mainWindow.appendChild(goHome);

  goHome.addEventListener("click", function () {
    location.reload();
  });
});

var questions = [
  {
    question:
      "Which of the following keywords is used to define a variable in JavaScript?",

    a: "var",

    b: "let",

    c: "Both A and B",

    d: "None of the above",

    correctAnswer: "Both A and B",
  },

  {
    question: "How can a datatype be declared to be a constant type?",

    a: "const",

    b: "var",

    c: "let",

    d: "constant",

    correctAnswer: "const",
  },

  {
    question:
      "Which function is used to serialize an object into a JSON string in JavaScript?",

    a: "stringify()",

    b: "parse()",

    c: "convert()",

    d: "None of the Above",

    correctAnswer: "stringify()",
  },

  {
    question: "How do you stop an interval timer in JavaScript?",

    a: "clearTimer",

    b: "clearInterval",

    c: "intervalOver",

    d: "None of the Above",

    correctAnswer: "clearInterval",
  },

  {
    question:
      "Which of the following methods can be used to display data in some form using JavaScript?",

    a: "document.write()",

    b: "console.log()",

    c: "window.alert()",

    d: "All of the Above",

    correctAnswer: "All of the Above",
  },
];

function setTime() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    countdown.textContent = "Timer: " + timeLeft;

    if (quizQuestion.textContent === "You won!") {
      clearInterval(timerInterval);
      timeLeft += 1;
    } else if (timeLeft <= 0) {
      clearInterval(timerInterval);
      quizQuestion.textContent = "You lose";
      instructions.style.display = "block";
      instructions.textContent = "Would you like to play again?";
      var elements = document.getElementsByClassName("btn");
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
      var btnContainer = document.createElement("div");
      mainWindow.appendChild(btnContainer);
      var tryAgainYes = document.createElement("button");
      tryAgainYes.innerHTML = "Yes";
      tryAgainYes.classList.add("yes-no-btn");
      btnContainer.appendChild(tryAgainYes);
      var tryAgainNo = document.createElement("button");
      tryAgainNo.innerHTML = "No";
      tryAgainNo.classList.add("yes-no-btn");
      btnContainer.appendChild(tryAgainNo);

      var yesNoTryAgain = document.querySelectorAll(".yes-no-btn");
      for (var j = 0; j < yesNoTryAgain.length; j++) {
        yesNoTryAgain[j].addEventListener("click", function (event) {
          if (event.target.innerHTML === "Yes") {
            location.reload();
          } else {
            quizQuestion.textContent = "Thanks for playing!";
            instructions.style.display = "none";
            btnContainer.style.display = "none";
          }
        });
      }
    }
  }, 1000);
}

function youWin() {
  quizQuestion.textContent = "You won!";
  instructions.style.display = "block";
  instructions.textContent =
    "Your time is " + timeLeft + " seconds. Would you like to save your score?";
  var btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  mainWindow.appendChild(btnContainer);
  var yes = document.createElement("button");
  yes.innerHTML = "Yes";
  yes.classList.add("yes-no-btn");
  var no = document.createElement("button");
  no.innerHTML = "No";
  no.classList.add("yes-no-btn");
  btnContainer.appendChild(yes);
  btnContainer.appendChild(no);
  var yesNoBtn = document.querySelectorAll(".yes-no-btn");
  for (var i = 0; i < yesNoBtn.length; i++) {
    yesNoBtn[i].addEventListener("click", function (event) {
      if (event.target.innerHTML === "Yes") {
        quizQuestion.textContent = "Please Enter Your Initials and Your Time";
        instructions.textContent = "Your time is " + timeLeft + " seconds.";
        yes.style.display = "none";
        no.style.display = "none";
        var userInput = document.createElement("input");
        userInput.type = "text";
        userInput.classList.add("input");
        btnContainer.appendChild(userInput);
        var submit = document.createElement("button");
        submit.innerHTML = "Submit";
        submit.classList.add("submit-btn");
        btnContainer.appendChild(submit);
        var submitBtn = document.querySelector(".submit-btn");
        submitBtn.addEventListener("click", function (event) {
          if (event.target.innerHTML === "Submit") {
            var recentScore = {
              initials: userInput.value,
            };
            localStorage.setItem("recentScore", JSON.stringify(recentScore));
            quizQuestion.textContent = "Would you like to play again?";
            userInput.style.display = "none";
            instructions.style.display = "none";
            submit.style.display = "none";
            var playAgainYes = document.createElement("button");
            playAgainYes.innerHTML = "Yes";
            playAgainYes.classList.add("yes-no-btn");
            playAgainYes.classList.add("play-again");
            btnContainer.appendChild(playAgainYes);
            var playAgainNo = document.createElement("button");
            playAgainNo.innerHTML = "No";
            playAgainNo.classList.add("yes-no-btn");
            playAgainNo.classList.add("play-again");
            btnContainer.appendChild(playAgainNo);
            var playAgainBtns = document.querySelectorAll(".play-again");
            for (var j = 0; j < playAgainBtns.length; j++) {
              playAgainBtns[j].addEventListener("click", function (event) {
                if (event.target.innerHTML === "Yes") {
                  location.reload();
                } else {
                  quizQuestion.textContent = "Thanks for playing!";
                  playAgainYes.style.display = "none";
                  playAgainNo.style.display = "none";
                }
              });
            }
          }
        });
      } else {
        quizQuestion.textContent = "Thanks for playing!";
        instructions.style.display = "none";
        yes.style.display = "none";
        no.style.display = "none";
      }
    });
  }
}

function startQuiz() {
  start.addEventListener("click", function () {
    quizQuestion.textContent = questions[currentIndex].question;
    instructions.style.display = "none";
    start.style.display = "none";
    var choice1 = document.createElement("button");
    var choice2 = document.createElement("button");
    var choice3 = document.createElement("button");
    var choice4 = document.createElement("button");

    choice1.innerHTML = questions[currentIndex].a;
    choice2.innerHTML = questions[currentIndex].b;
    choice3.innerHTML = questions[currentIndex].c;
    choice4.innerHTML = questions[currentIndex].d;

    mainWindow.appendChild(choice1);
    mainWindow.appendChild(choice2);
    mainWindow.appendChild(choice3);
    mainWindow.appendChild(choice4);

    choice1.classList.add("btn");
    choice2.classList.add("btn");
    choice3.classList.add("btn");
    choice4.classList.add("btn");

    setTime();

    var btn = document.querySelectorAll(".btn");
    for (var i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", function (event) {
        if (
          event.target.innerHTML === questions[currentIndex].correctAnswer &&
          currentIndex <= questions.length - 2
        ) {
          currentIndex++;
          quizQuestion.textContent = questions[currentIndex].question;
          choice1.innerHTML = questions[currentIndex].a;
          choice2.innerHTML = questions[currentIndex].b;
          choice3.innerHTML = questions[currentIndex].c;
          choice4.innerHTML = questions[currentIndex].d;
          var correctIncorrect = document.createElement("p");
          correctIncorrect.innerHTML = "Correct!";
          correctIncorrect.classList.add("correctIncorrect");
          mainWindow.appendChild(correctIncorrect);
          $(correctIncorrect).delay(1000).hide(0);
        } else if (
          currentIndex === questions.length - 1 &&
          event.target.innerHTML === questions[currentIndex].correctAnswer
        ) {
          choice1.style.display = "none";
          choice2.style.display = "none";
          choice3.style.display = "none";
          choice4.style.display = "none";
          countdown.style.display = "none";
          youWin();
        } else {
          var correctIncorrect = document.createElement("p");
          correctIncorrect.innerHTML = "Incorrect";
          correctIncorrect.classList.add("correctIncorrect");
          mainWindow.appendChild(correctIncorrect);
          $(correctIncorrect).delay(1000).hide(0);

          timeLeft -= 5;
        }
      });
    }
  });
}

startQuiz();
