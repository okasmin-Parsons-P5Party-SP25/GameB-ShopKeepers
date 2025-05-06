import { closeAllPopups } from "./utilities.js";
import { questions } from "./data/questions.js";
import { changeScene, scenes } from "./main.js";

// store quiz choices until submit button is clicked
// TODO update this to array once add multiplayer
let guessed = undefined;
let correctAnswer = undefined;

/**
 * fetch data
 */

// const getQuestions = async () => {
//   try {
//     const res = await fetch("../data/questions.json");
//     const data = await res.json();
//     return data.results;
//   } catch (err) {
//     console.error(err);
//   }
// };

/**
 *  get relevant HTML elements
 */
const quizButton = document.getElementById("quiz-button");
const quizDiv = document.getElementById("quiz");
const submitButton = document.getElementById("submit-quiz");
const question = document.getElementById("question");
const answersDiv = document.getElementById("answers-container");

const questionsScreenDiv = document.getElementById("questions-screen");
const answerScreenDiv = document.getElementById("answers-screen");

const revealedAnswerDiv = document.getElementById("answer-revealed");
const closeButton = document.getElementById("close-quiz");
const nextButton = document.getElementById("next-exit-quiz-button");

const onSubmit = (me, shared) => {
  if (!guessed || !correctAnswer) return;

  const correct = guessed === correctAnswer;

  questionsScreenDiv.classList.toggle("hidden");
  answerScreenDiv.classList.toggle("hidden");

  const lost = "Better luck next time!";
  const greatWork = "Great work!";
  const reveal = `The correct answer was: ${correctAnswer}`;

  let message = correct ? `${greatWork} ${reveal}` : `${lost} ${reveal}`;
  if (correct) {
    me.coins += shared.quizCoins;
  } else {
    me.coins += shared.quizCoins / 10;
  }

  // Create styled answer buttons for the revealedAnswerDiv
  revealedAnswerDiv.innerHTML = ""; // clear previous content

  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.classList.add("answer-message");
  revealedAnswerDiv.appendChild(messageDiv);

  // Render all answer choices again with correct/selected classes
//  const currentQuestion = question.textContent;
  const allAnswers = Array.from(answersDiv.children).map(btn => btn.textContent);

  allAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-button");
    if (answer === correctAnswer) {
      button.classList.add("correct-answer");
    } else {
      button.classList.add("wrong-answer");
    }
    if (answer === guessed) {
      button.classList.add(
        answer === correctAnswer ? "correct-select" : "incorrect-select"
      );
    }
    button.disabled = true;
    revealedAnswerDiv.appendChild(button);
  });
  shared.quizCoins *= 2; // Double for next round
};


/* 
const onSubmit = (me, shared) => {
  if (!guessed || !correctAnswer) return;

  const correct = guessed === correctAnswer;

  questionsScreenDiv.classList.toggle("hidden");
  answerScreenDiv.classList.toggle("hidden");

  const lost = "better luck next time! ";
  const greatWork = "great work! ";
  const reveal = `the correct answer was: ${correctAnswer}`;

  let text = "";

  if (correct) {
    me.coins += shared.quizCoins;
    text = greatWork + reveal;
  } else {
    me.coins += shared.quizCoins / 10;
    text = lost + reveal;
  }

  revealedAnswerDiv.textContent = text;

  // increase win amount each time quiz is played
  shared.quizCoins = shared.quizCoins * 2;
};
 */

// open
export const onOpenQuiz = async () => {
  closeAllPopups();
  if (quizDiv.classList.contains("hidden")) {
    clearQuiz();
    await generateQuiz();

    quizDiv.classList.remove("hidden");

    questionsScreenDiv.classList.remove("hidden");
    answerScreenDiv.classList.add("hidden");
  }
};

// close
const onClickClose = () => {
  clearQuiz();
  quizDiv.classList.add("hidden");
};

// next button to change scene
const onClickNext = () => {
  onClickClose();
  changeScene(scenes.play);
};

const clearQuiz = () => {
  guessed = undefined;
  correctAnswer = undefined;
  answersDiv.innerHTML = "";
};

const generateQuiz = async () => {
  // TODO keep track of which questions asked
  const currentQuestion = random(questions);

  question.textContent = currentQuestion["question"];

  const correct = currentQuestion["correct_answer"];
  correctAnswer = correct;
  console.log({ correctAnswer });

  const incorrect = currentQuestion["incorrect_answers"];
  const allAnswers = [correct, ...incorrect];

  shuffle(allAnswers).forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;

    answerButton.classList.add("answer-button");

    answerButton.addEventListener("click", () => {
      // only allow 1 guess
      if (guessed) return;

      answerButton.classList.toggle("selected-button");
      guessed = answer;
    });

    answersDiv.appendChild(answerButton);
  });
};

/**
 * attach event listeners
 */

export const setupQuizUI = (me, shared) => {
  quizButton.addEventListener("click", () => changeScene(scenes.quiz));
  closeButton.addEventListener("click", onClickClose);
  nextButton.addEventListener("click", onClickNext);

  // submit quiz button
  submitButton.addEventListener("click", () => onSubmit(me, shared));
};
