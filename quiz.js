<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      margin: 0;
      padding: 0;
    }
    #quiz-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-size: 28px;
      margin-bottom: 20px;
      color: #333;
    }
    .question-container {
      margin-bottom: 20px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
    button {
      background-color: #4caf50;
      color: #fff;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #45a049;
    }
    .result {
      font-size: 18px;
      margin-top: 10px;
    }
    #progress-bar {
      width: 100%;
      background-color: #ddd;
      border-radius: 5px;
      margin-top: 20px;
      overflow: hidden;
      height: 20px;
    }
    #progress {
      width: 0;
      height: 100%;
      background-color: #4caf50;
      transition: width 0.5s ease;
    }
  </style>
</head>
<body>
  <div id="quiz-container">
    <h1>Quiz</h1>
    <div id="question" class="question-container fade-in"></div>
    <div id="answers" class="question-container fade-in"></div>
    <button id="submit-btn">Submit Answer</button>
    <div id="result" class="result"></div>
    <div id="score" class="result">Score: <span id="score-value">0</span></div>
    <div id="progress-bar">
      <div id="progress"></div>
    </div>
  </div>

  <script>
    // Quiz Data
    const quizQuestions = [
      {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        correctAnswer: "Tokyo"
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
      },
      {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["Japan", "China", "India", "Italy"],
        correctAnswer: "Japan"
      },
      {
        question: "What is the largest mammal in the world?",
        options: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Jane Austen", "Mark Twain", "Charles Dickens"],
        correctAnswer: "William Shakespeare"
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

      // Fade in animation
      setTimeout(() => {
        questionElement.classList.add("fade-in");
        answersElement.classList.add("fade-in");
      }, 100);
      
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

      // Fade out animation
      document.getElementById("question").classList.remove("fade-in");
      document.getElementById("answers").classList.remove("fade-in");

      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length) {
          displayQuestion();
        } else {
          // Quiz finished
          resultElement.textContent = `Quiz finished! Final score: ${score} out of ${quizQuestions.length}`;
          document.getElementById("submit-btn").style.display = "none";
        }
      }, 500); // Delay for transition
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
