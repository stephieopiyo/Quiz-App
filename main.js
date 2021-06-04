'use strict';
const startbtn = document.querySelector('.start');
const nextbtn = document.querySelector('.next');
let timer = document.querySelector('.timer');
let displayQuiz = document.querySelector('.hide');
let quizSection = document.querySelector('.quiz-section');
let mainContainer = document.querySelector('.main-container');

function startQuiz(){
    startbtn.addEventListener('click', function() {
        mainContainer = mainContainer.classList.add("hide");
        displayQuiz = displayQuiz.classList.remove("hide");
         
    });
}
startQuiz();

function getQuestions(){
    let api = "https://opentdb.com/api.php?amount=15&category=18&type=multiple";

    fetch(api) 
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){ 
      displayQuestions(data);
    })
    .catch(error => console.log(error));
}
getQuestions();
const startTimer = (time) => {

}

//work in progress
function displayQuestions(data){
    console.log(data);
    /*quizSection.innerHTML += `
    <div class="question">${question}</div>
      <div class="choices">
        <ol type="A">
          <li>${correct_answer}</li>
          <li>${incorrect_answers[0]}</li>
          <li>${incorrect_answers[1]}</li>
          <li>${incorrect_answers[2]}</li>
        </ol>
        <button class="btn next">Next Question</button>
      </div>
      `;*/ 
}
