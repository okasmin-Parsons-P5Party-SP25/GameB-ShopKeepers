// store quiz choices until submit button is clicked
// TODO update this to array once add multiplayer
let guessed = undefined;
let correctAnswer = undefined;

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

/**
 * attach event listeners
 */

const onSubmit = () => {
  if (!guessed || !correctAnswer) return;

  const correct = guessed === correctAnswer;
  // console.log(`correct: ${correct}`);

  questionsScreenDiv.classList.toggle("hidden");
  answerScreenDiv.classList.toggle("hidden");

  const lost = "better luck next time! ";
  const greatWork = "great work! ";
  const reveal = `the correct answer was: ${correctAnswer}`;

  revealedAnswerDiv.textContent = correct ? greatWork + reveal : lost + reveal;
};

const onClickQuiz = async () => {
  quizDiv.classList.toggle("hidden");

  if (quizDiv.classList.contains("hidden")) {
    clearQuiz();
  } else {
    questionsScreenDiv.classList.remove("hidden");
    answerScreenDiv.classList.add("hidden");

    await generateQuiz();
  }
};

const clearQuiz = () => {
  // console.log("clear quiz");
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

  // console.log(allAnswers);

  shuffle(allAnswers).forEach((answer) => {
    // console.log(answer);
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;

    answerButton.addEventListener("click", () => {
      // only allow 1 guess
      if (guessed) return;

      answerButton.classList.toggle("guessed-button");
      console.log(`clicked ${answer}`);
      guessed = answer;
    });

    answersDiv.appendChild(answerButton);
  });
};

export const setupQuizUI = () => {
  // button to open/close quiz
  quizButton.addEventListener("click", onClickQuiz);

  // submit quiz button
  submitButton.addEventListener("click", onSubmit);
};
