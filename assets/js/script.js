var start = document.getElementById("start-btn");
var countdown = document.getElementById("timer");
var quizQuestion = document.getElementById("code-question");
var instructions = document.getElementById("instructions");
var mainWindow = document.getElementById("main-window");
var currentIndex = 0;
var timeLeft = 60;

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

    if (timeLeft === 0 || currentIndex === questions.length) {
      clearInterval(timerInterval);
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
        quizQuestion.textContent = "Please Enter Your Initials";
        instructions.textContent = "Your time is " + timeLeft + " seconds.";
        yes.style.display = "none";
        no.style.display = "none";
        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("input");
        btnContainer.appendChild(input);
        localStorage.setItem(input, timeLeft);
      }
    });
  }
}

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
        currentIndex <= questions.length
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
      } else if (currentIndex === questions.length) {
        choice1.style.display = "none";
        choice2.style.display = "none";
        choice3.style.display = "none";
        choice4.style.display = "none";
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
