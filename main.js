'use strict';
const startbtn = document.querySelector(".start");
const nextbtn = document.querySelector(".next");
const retry = document.querySelector(".try-again");
let qn = document.querySelector(".question");
let timeText = document.querySelector(".time-text");
let timeSec = document.querySelector(".time-sec");
let displayQuiz = document.querySelector(".quiz-container");
let quizSection = document.querySelector(".quiz-section");
let mainContainer = document.querySelector(".main-container");
let resultsContainer = document.querySelector(".results-container");
let totalQuestions = document.querySelector(".total-qns");
let scores = document.querySelector(".score");
let questionNumber = 0;
let questionCount = 0;
let userScore = 0;
let counter = 0;
let currentIndex = 0;
let questions = [];


const startQuiz = () => {
  startbtn.addEventListener("click", () => {
    mainContainer = mainContainer.classList.add("hide");
    displayQuiz = displayQuiz.classList.remove("hide");
    startTimer(30);
  });
}
startQuiz();

const getQuestions = () => {
  let api = "https://opentdb.com/api.php?amount=15&category=18&type=multiple";

  fetch(api)
    .then((response) => response.json())
    .then((loadedQuestions) => {
      questions = loadedQuestions.results.map(loadedQuestion => {
        const quiz = {
          question: loadedQuestion.question,
          correct_answer: loadedQuestion.correct_answer
        };

        const answers = [loadedQuestion.correct_answer, ...loadedQuestion.incorrect_answers];
        shuffleArray(answers);

        answers.forEach((option, index) => {
          quiz["option" + (index + 1)] = option;
        });

        return quiz;
      });
      displayQuestions(questions[currentIndex]);
      currentQuestion(questions);
      nextQuestion(questions);
    })
    .catch(error => console.log(error));
}

getQuestions();

const displayQuestions = (q) => {
  questionNumber =  currentIndex + 1;
  questionCount = questions.length;
  quizSection.innerHTML = `
  <div class="question">
    <span>${questionNumber}</span>. 
    ${q.question}
  </div>
  <div class="choices">
    <ul>
      <li>${q.option1}</li>
      <li>${q.option2}</li>
      <li>${q.option3}</li>
      <li>${q.option4}</li>
    </ul>
  </div>`;
  totalQuestions.innerHTML = `
  <span><p>${questionNumber} of ${questionCount} Questions</p></span>
  `;

  const options = document.querySelectorAll(".choices ul li");

  checkCorrectAnswer(options, q.correct_answer); 
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const currentQuestion = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    questionNumber = arr[i] + 1;
    return questionNumber;
  }
}

const disable = (arr) => {
  arr.forEach(item => {
    item.style.pointerEvents = "none";
  });
}

const checkCorrectAnswer = (arr, correct) => {
  const choices = document.querySelectorAll(".choices ul li");
  arr.forEach(item => {
    item.addEventListener("click", (e) => {
      clearInterval(counter);
      let selected = e.target;
      if(selected.textContent == correct) {
        selected.style.background = "rgb(99, 243, 99)";
        userScore += 1;
        disable(choices);
      } else {
        selected.style.background = "rgb(247, 54, 54)";
        for(let i=0; i<choices.length; i++){
          if(choices[i].textContent == correct){
            choices[i].style.background = "rgb(99, 243, 99)";
          }
          disable(choices);
        }
        
      }
    });
  });
}

const startTimer = (time) => {
  counter = setInterval(timer, 1000);
  function timer() {
    timeSec.textContent = time;
    time--;
    if (time < 0) {
      timeText.textContent = "Time Up";
      clearTimeout(counter);
      nextQuestion();
    }
  }
}

const nextQuestion = (questions) => {
  nextbtn.addEventListener("click", () => {
    if(currentIndex !== questionCount - 1) {
      currentIndex++;
    displayQuestions(questions[currentIndex]);
    startTimer(30);
    } else {
      showResult();
      
    }
   
  });
}

const showResult = () => {
  clearInterval(counter);
  quizSection = quizSection.classList.add("hide");  
  scores.innerHTML = "YOU SCORED" + " :" +  userScore + "POINTS";
  resultsContainer = resultsContainer.classList.remove("hide");
  tryAgain();
}

const tryAgain = () => {
   retry.addEventListener("click", () => {
     window.location.reload();
   });
}

