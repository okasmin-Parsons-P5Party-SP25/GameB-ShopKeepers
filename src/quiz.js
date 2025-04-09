import { me } from "./playScene";

// store quiz choices until submit button is clicked
// TODO update this to array once add multiplayer
let guessed = undefined;
let correctAnswer = undefined;

// TODO update this depending on tbd factors
let winAmount = 5;

/**
 * fetch data
 */

const getQuestions = async () => {
  try {
    const res = await fetch("../data/questions.json");
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(err);
  }
};

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

const onSubmit = () => {
  if (!guessed || !correctAnswer) return;

  const correct = guessed === correctAnswer;

  questionsScreenDiv.classList.toggle("hidden");
  answerScreenDiv.classList.toggle("hidden");

  const lost = "better luck next time! ";
  const greatWork = "great work! ";
  const reveal = `the correct answer was: ${correctAnswer}`;

  let text = "";

  if (correct) {
    handleWin();
    text = greatWork + reveal;
  } else {
    text = lost + reveal;
  }

  revealedAnswerDiv.textContent = text;
};

const onClickQuiz = async () => {
  if (quizDiv.classList.contains("hidden")) {
    clearQuiz();
    await generateQuiz();

    quizDiv.classList.remove("hidden");

    questionsScreenDiv.classList.remove("hidden");
    answerScreenDiv.classList.add("hidden");
  }
};

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
  // console.log("generate quiz");
  const questions = await getQuestions();
  console.log(questions);

  // TODO keep track of which questions asked
  const currentQuestion = random(questions);
  // console.log(currentQuestion);

  question.textContent = currentQuestion["question"];

  const correct = currentQuestion["correct_answer"];
  correctAnswer = correct;

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
      console.log(`clicked ${answer}`);
      guessed = answer;
    });

    answersDiv.appendChild(answerButton);
  });
};

const handleWin = () => {
  me.inventory += winAmount;
};

export const setupQuizUI = () => {
  quizButton.addEventListener("click", onClickQuiz);
  closeButton.addEventListener("click", onClickClose);

  // submit quiz button
  submitButton.addEventListener("click", onSubmit);
};
