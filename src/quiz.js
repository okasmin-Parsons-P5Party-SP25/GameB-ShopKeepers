const quizButton = document.getElementById("quiz-button");
const quizDiv = document.getElementById("quiz");
const submitButton = document.getElementById("submit-quiz");

const handleSubmit = () => {
  console.log("clicked submit");
};

export const setupQuizUI = () => {
  // setup button to open quiz
  quizButton.addEventListener("click", function () {
    console.log("clicked quiz button");
    quizDiv.classList.toggle("hidden");
  });

  // setup submit quiz button
  submitButton.addEventListener("click", handleSubmit);
};
