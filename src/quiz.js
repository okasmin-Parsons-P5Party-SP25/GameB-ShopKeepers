import { closeAllPopups } from "./utilities.js";
import { questions } from "./data/questions.js";
import { changeScene, scenes } from "./main.js";

// store quiz choices until submit button is clicked
// TODO update this to array once add multiplayer
let guessed = undefined;
let correctAnswer = undefined;

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

const onSubmit = (me) => {
  if (!guessed || !correctAnswer) return;

  const correct = guessed === correctAnswer;

  questionsScreenDiv.classList.toggle("hidden");
  answerScreenDiv.classList.toggle("hidden");

  const lost = "Incorrect...";
  const greatWork = "Correct!";

  if (correct) {
    me.coins += me.quizCoins;
  } else {
    me.coins += 15;
  }

  revealedAnswerDiv.innerHTML = ""; // Clear previous content

  // Add result header
  const resultHeading = document.createElement("h3");
  resultHeading.textContent = correct ? greatWork : lost;
  resultHeading.classList.add("answer-heading");
  revealedAnswerDiv.appendChild(resultHeading);

  // Add coin reward message if correct
  if (correct) {
    const coinMsg = document.createElement("div");
    coinMsg.classList.add("coin-message");

    const coinText = document.createElement("span");
    coinText.textContent = `+${me.quizCoins}`;

    const coinImgElement = document.createElement("img");
    coinImgElement.src = "assets/coin.png"; // ✅ Image source set
    coinImgElement.alt = "Coin";
    coinImgElement.classList.add("coin-icon");

    coinImgElement.width = 25; // width in pixels
    coinImgElement.height = 25; // height in pixels

    coinMsg.appendChild(coinImgElement);
    coinMsg.appendChild(coinText);
    revealedAnswerDiv.appendChild(coinMsg);
  }

  // Render all answer choices again with correct/selected classes
  const allAnswers = Array.from(answersDiv.children).map((btn) => btn.textContent);

  allAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-button");

    if (answer === correctAnswer) {
      button.classList.add("correct-answer");
    } else {
      button.classList.add("wrong-answer");
    }

    if (answer === guessed) {
      button.classList.add(answer === correctAnswer ? "correct-select" : "incorrect-select");
    }

    button.disabled = true;
    revealedAnswerDiv.appendChild(button);
  });

  me.quizCoins *= 2; // Double for next round
};

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

export const setupQuizUI = (me) => {
  quizButton.addEventListener("click", () => changeScene(scenes.quiz));
  closeButton.addEventListener("click", onClickClose);
  nextButton.addEventListener("click", onClickNext);

  // submit quiz button
  submitButton.addEventListener("click", () => onSubmit(me));
};
