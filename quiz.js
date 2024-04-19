<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz Website</title>
  <style>
    /* Add your CSS styles here */
    #quiz-container {
      max-width: 500px;
      margin: 0 auto;
      text-align: center;
    }
    #progress-bar {
      width: 100%;
      background-color: #ddd;
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;
    }
    #progress {
      width: 0;
      height: 20px;
      background-color: #4caf50;
      transition: width 0.5s ease;
    }
  </style>
</head>
<body>
  <div id="quiz-container">
    <h1>Quiz</h1>
    <div id="question"></div>
    <div id="answers"></div>
    <button id="submit-btn">Submit Answer</button>
    <div id="result"></div>
    <div id="score">Score: <span id="score-value">0</span></div>
    <div id="progress-bar">
      <div id="progress"></div>
    </div>
  </div>

  <script>
    // Quiz Data
    const quizQuestions = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: "Paris"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Saturn"],
        correctAnswer: "Mars"
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Charles Dickens", "Ernest Hemingway"],
        correctAnswer: "Harper Lee"
      },
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: "H2O"
      },
      {
        question: "Which is the largest ocean?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
      }
    ];

    // Global variables
    let currentQuestionIndex = 0;
    let score = 0;
    const questionTimeLimit = 15; // in seconds
    let timeLeft = questionTimeLimit;
    let timerInterval;

    // Functions
    function displayQuestion() {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      const questionElement = document.getElementById("question");
      const answersElement = document.getElementById("answers");

      questionElement.textContent = currentQuestion.question;
      answersElement.innerHTML = "";

      currentQuestion.options.forEach(option => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => checkAnswer(option));
        answersElement.appendChild(optionElement);
      });

      // Reset timer
      clearInterval(timerInterval);
      timeLeft = questionTimeLimit;
      updateProgressBar();
      timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          checkAnswer(null); // Time's up, check with null option
        }
        updateProgressBar();
      }, 1000);
    }

    function checkAnswer(selectedAnswer) {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      const resultElement = document.getElementById("result");
      const scoreElement = document.getElementById("score-value");

      clearInterval(timerInterval);

      if (selectedAnswer === currentQuestion.correctAnswer) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
        score++;
      } else if (selectedAnswer !== null) {
        resultElement.textContent = "Wrong!";
        resultElement.style.color = "red";
      } else {
        resultElement.textContent = "Time's up!";
        resultElement.style.color = "red";
      }

      scoreElement.textContent = score;
      currentQuestionIndex++;

      if (currentQuestionIndex < quizQuestions.length) {
        setTimeout(displayQuestion, 1000); // Delay for transition
      } else {
        // Quiz finished
        resultElement.textContent = `Quiz finished! Final score: ${score} out of ${quizQuestions.length}`;
        document.getElementById("submit-btn").style.display = "none";
      }
    }

    function updateProgressBar() {
      const progress = (timeLeft / questionTimeLimit) * 100;
      document.getElementById("progress").style.width = progress + "%";
    }

    // Initial setup
    displayQuestion();
  </script>
</body>
</html>
