
interface Question {
  question: string;
  options: (string | number)[];
  correctAnswer: string | number;
}

const questions: Question[] = [
  { question: "What is your name?", 
    options: ["Hanzala", "Zaman", "Hamza", "Ali"], correctAnswer: "Hanzala" },
  { question: "What is your age?", 
    options: [16, 17, 18, 19], correctAnswer: 18 },
  { question: "What is your nationality?", 
    options: ["Afghanistan", "Pakistan", "China", "America"], correctAnswer: "Pakistan" },
  { question: "What is your qualification?", 
    options: ["Middle", "Matric", "Inter", "Graduate"], correctAnswer: "Matric" },
  { question: "Who is the founder of Pakistan?", 
    options: ["Allama Iqbal", "Liaquat Ali Khan", "Quaid-e-Azam", "Sir Syed Ahmed Khan"], correctAnswer: "Quaid-e-Azam" },
  { question: "What is the national language of Pakistan?", 
    options: ["Urdu", "Punjabi", "Pashto", "English"], correctAnswer: "Urdu" },
  { question: "Which city is the capital of Pakistan?", 
    options: ["Karachi", "Lahore", "Islamabad", "Rawalpindi"], correctAnswer: "Islamabad" },
  { question: "In which year did Pakistan become independent?", 
    options: ["1945", "1947", "1950", "1930"], correctAnswer: "1947" },
  { question: "What is the currency of Pakistan?", 
    options: ["Rupee", "Dollar", "Dirham", "Taka"], correctAnswer: "Rupee" },
  { question: "Which is the largest province of Pakistan by area?", 
    options: ["Punjab", "Sindh", "Balochistan", "KPK"], correctAnswer: "Balochistan" }
];
 
let currentQuestion: number = 0;
let score: number = 0;
let userAnswer: string | number | null = null;


const questionElem: HTMLElement | null = document.getElementById("questions");
const optionsElem: HTMLElement | null = document.getElementById("options");
const scoreElem: HTMLElement | null = document.getElementById("score");
const restartBtn: HTMLElement | null = document.getElementById("restart-btn");
const nextBtn: HTMLElement | null = document.getElementById("next-btn");

function showQuestion(): void {
  if (!questionElem || !optionsElem) return;

  questionElem.textContent = questions[currentQuestion].question;
  optionsElem.innerHTML = "";

  questions[currentQuestion].options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option.toString();
    optionElement.onclick = (event) => SaveAnswer(event);
    optionsElem.appendChild(optionElement);
  });
}

function SaveAnswer(event: Event): void {
  if (!event.target || !(event.target instanceof HTMLElement)) return;

  const options = document.getElementsByClassName("option");
  for (let i = 0; i < options.length; i++) {
    (options[i] as HTMLElement).classList.remove("selected");
  }

  event.target.classList.add("selected");
  userAnswer = event.target.textContent;
}

function NextQuestion(): void {
  if (userAnswer === null) {
    alert("Please select an answer before moving to the next question.");
    return;
  }

  if (userAnswer == questions[currentQuestion].correctAnswer) {
    score += 10;
  }

  currentQuestion++;
  userAnswer = null;

  if (currentQuestion >= questions.length) {
    if (questionElem && optionsElem && scoreElem) {
      questionElem.textContent = "🎉 Quiz Completed!";
      optionsElem.innerHTML = "";
      nextBtn!.style.display = "none";
      restartBtn!.style.display = "inline-block";
      scoreElem.textContent = "Final Score: " + score;
    }
    return;
  }

  if (scoreElem) {
    scoreElem.textContent = "Score: " + score;
  }
  showQuestion();
}

function RestartQuiz(): void {
  currentQuestion = 0;
  score = 0;
  userAnswer = null;
  
  if (scoreElem) {
    scoreElem.textContent = "";
  }
  if (nextBtn && restartBtn) {
    nextBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
  }
  showQuestion();
}

showQuestion();