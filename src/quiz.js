import { closeAllPopups } from "./utilities.js";
import { questions } from "./data/questions.js";

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

/**
 * attach event listeners
 */

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

// open
const onClickQuiz = async () => {
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

export const setupQuizUI = (me, shared) => {
  quizButton.addEventListener("click", onClickQuiz);
  closeButton.addEventListener("click", onClickClose);

  // submit quiz button
  submitButton.addEventListener("click", () => onSubmit(me, shared));
};
