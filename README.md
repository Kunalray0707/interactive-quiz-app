# interactive-quiz-app
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Interactive Quiz App with Auth and Scorecard</title>
  <style>
    /* ===== RESET & GLOBAL STYLES ===== */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

   body {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      overflow-x: hidden;
      color: #333;
    }

  /* ===== CONTAINER ===== */
    .quiz-container {
      width: 90%;
      max-width: 600px;
      min-height: 100vh;
      margin: 20px auto;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
      position: relative;
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      overflow-x: hidden;
    }
    /* ===== AUTH SCREENS ===== */
    .auth-screen {
      padding: 60px 40px;
      text-align: center;
      display: none;
      min-height: 85vh;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .auth-screen.active {
      display: flex;
    }
    .auth-title {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 24px;
      font-weight: 700;
    }
    .auth-form {
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 20px;
      position: relative;
    }
    .form-group input {
      width: 100%;
      padding: 16px 20px;
      border: 2px solid #e8e8e8;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
    }
    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    .auth-btn {
      width: 100%;
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      color: white;
      border: none;
      padding: 18px;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
      margin-bottom: 16px;
    }
    .auth-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px rgba(255, 107, 107, 0.6);
    }
    .toggle-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    .toggle-link:hover {
      text-decoration: underline;
    }
    /* ===== DASHBOARD ===== */
    .dashboard {
      padding: 60px 40px;
      text-align: center;
      display: none;
      min-height: 85vh;
    }
    .dashboard.active {
      display: block;
    }
    .user-info {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 20px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .score-history {
      background: white;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 32px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      max-height: 220px;
      overflow-y: auto;
    }
    .score-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
      font-weight: 600;
    }
    .score-item:last-child {
      border-bottom: none;
    }
    .start-quiz-btn {
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      color: white;
      border: none;
      padding: 18px 48px;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 10px 30px rgba(78, 205, 196, 0.4);
    }
    .start-quiz-btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(78, 205, 196, 0.6);
    }
    /* Logout button */
    #logoutBtn {
      background: #ff6b6b !important;
      margin-top: 16px;
      padding: 14px 40px;
      font-size: 1rem;
      border-radius: 20px;
      box-shadow: none !important;
      transition: background-color 0.3s ease;
    }
    #logoutBtn:hover {
      background: #ff4b4b !important;
    }
    /* ===== QUIZ SCREENS ===== */
    .start-screen,
    .quiz-screen,
    .results-screen {
      display: none;
      padding: 40px;
      min-height: 80vh;
    }
    .start-screen.active,
    .quiz-screen.active,
    .results-screen.active {
      display: block;
    }

    .start-title {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 24px;
      font-weight: 700;
      text-align: center;
    }

    .start-subtitle {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 48px;
      line-height: 1.6;
      text-align: center;
    }

    .start-btn {
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      color: white;
      border: none;
      padding: 18px 48px;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
      display: block;
      margin: 0 auto;
    }

    .start-btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(255, 107, 107, 0.6);
    }

    /* Progress bar */
    .progress-container {
      margin-bottom: 32px;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 10px;
      width: 0%;
      transition: width 0.6s ease;
      position: relative;
    }

    .progress-fill::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .progress-text {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      font-size: 0.95rem;
      font-weight: 500;
      color: #666;
    }

    /* Question container */
    .question-container {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      will-change: opacity, transform;
    }

    .question-container.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .question-card {
      background: white;
      padding: 32px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      margin-bottom: 32px;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }

    .question-number {
      font-size: 0.9rem;
      color: #667eea;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .question-text {
      font-size: 1.4rem;
      font-weight: 600;
      color: #333;
      line-height: 1.5;
      margin-bottom: 28px;
    }

    /* Options */
    .options-container {
      display: grid;
      gap: 16px;
    }

    .option-btn {
      padding: 20px;
      border: 2px solid #e8e8e8;
      background: white;
      border-radius: 16px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 500;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
      user-select: none;
    }

    .option-btn:hover:not(.correct):not(.wrong) {
      border-color: #667eea;
      transform: translateX(8px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
    }

    .option-btn.correct {
      background: linear-gradient(135deg, #4ecdc4, #44a08d) !important;
      color: white !important;
      border-color: #4ecdc4 !important;
      animation: correctAnim 0.6s ease;
    }

    .option-btn.wrong {
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e) !important;
      color: white !important;
      border-color: #ff6b6b !important;
      animation: wrongAnim 0.6s ease;
    }

    .option-btn.selected {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-color: #667eea;
    }

    @keyframes correctAnim {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes wrongAnim {
      0% {
        transform: scale(1);
      }
      25% {
        transform: scale(1.1) rotate(-2deg);
      }
      75% {
        transform: scale(1.1) rotate(2deg);
      }
      100% {
        transform: scale(1);
      }
    }

    /* Feedback message */
    .feedback-message {
      padding: 16px;
      border-radius: 12px;
      margin: 20px 0;
      font-weight: 600;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease;
      user-select: none;
    }

    .feedback-correct {
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      color: white;
    }

    .feedback-wrong {
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      color: white;
    }

    /* Navigation buttons */
    .nav-buttons {
      display: flex;
      gap: 16px;
      justify-content: space-between;
      margin-top: 32px;
    }

    .nav-btn {
      flex: 1;
      padding: 16px 24px;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      user-select: none;
    }

    .prev-btn {
      background: #e8e8e8;
      color: #666;
    }

    .prev-btn:hover {
      background: #d8d8d8;
    }

    .next-btn {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }

    .next-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
    }

    .next-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    /* Results Screen */
    .results-screen {
      text-align: center;
      padding: 40px;
      min-height: 80vh;
    }

    .score-circle {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      margin: 0 auto 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      position: relative;
      overflow: hidden;
      transition: all 1s ease;
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.5);
    }

    .final-score {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 24px;
    }

    .score-text {
      font-size: 1.3rem;
      color: #666;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .play-again-btn {
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      color: white;
      border: none;
      padding: 18px 48px;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 10px 30px rgba(78, 205, 196, 0.4);
      margin-top: 24px;
      user-select: none;
    }

    .play-again-btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(78, 205, 196, 0.6);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .quiz-container {
        width: 95%;
        margin: 10px;
      }
      .quiz-screen,
      .auth-screen,
      .dashboard,
      .results-screen,
      .start-screen {
        padding: 30px 24px;
      }
      .nav-buttons {
        flex-direction: column;
      }
      .nav-btn {
        width: 100%;
      }
      .score-history {
        max-height: 180px;
      }
    }
  </style>
</head>
<body>
  <div class="quiz-container">
    <!-- LOGIN SCREEN -->
    <div class="auth-screen active" id="loginScreen">
      <h1 class="auth-title">Welcome Back!</h1>
      <form class="auth-form" id="loginForm">
        <div class="form-group">
          <input type="email" id="loginEmail" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input type="password" id="loginPassword" placeholder="Password" required />
        </div>
        <button type="submit" class="auth-btn">Login</button>
        <p style="margin-top: 16px;">
          Don't have an account?
          <a href="#" class="toggle-link" id="toSignup">Sign Up</a>
        </p>
      </form>
    </div>

    <!-- SIGNUP SCREEN -->
    <div class="auth-screen" id="signupScreen">
      <h1 class="auth-title">Create Account</h1>
      <form class="auth-form" id="signupForm">
        <div class="form-group">
          <input type="text" id="signupName" placeholder="Full Name" required />
        </div>
        <div class="form-group">
          <input type="email" id="signupEmail" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input type="password" id="signupPassword" placeholder="Password" required />
        </div>
        <button type="submit" class="auth-btn">Sign Up</button>
        <p style="margin-top: 16px;">
          Already have an account?
          <a href="#" class="toggle-link" id="toLogin">Login</a>
        </p>
      </form>
    </div>

    <!-- DASHBOARD -->
    <div class="dashboard" id="dashboard">
      <div class="user-info">
        <h2 id="userName">Welcome, User!</h2>
        <p id="userEmail"></p>
      </div>
      <div class="score-history">
        <h3>📊 Your Score History</h3>
        <div id="scoreList">
          <p style="text-align: center; color: #666; font-style: italic;">
            No scores yet. Take a quiz!
          </p>
        </div>
      </div>
      <button class="start-quiz-btn" id="startQuizBtn">🚀 Start Quiz</button>
      <button class="auth-btn" id="logoutBtn" style="background: #ff6b6b; margin-top: 16px;">
        Logout
      </button>
    </div>

    <!-- QUIZ START SCREEN -->
    <div class="start-screen" id="startScreen">
      <h1 class="start-title">Ready for Quiz?</h1>
      <p class="start-subtitle">Good luck!</p>
      <button class="start-btn" id="startBtn">🎯 Begin Quiz</button>
    </div>

    <!-- QUIZ SCREEN -->
    <div class="quiz-screen" id="quizScreen">
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" id="progressFill"></div>
        </div>
        <div class="progress-text">
          <span id="currentQuestion">1</span>
          <span>of</span>
          <span id="totalQuestions">10</span>
        </div>
      </div>
      <div class="question-container" id="questionContainer">
        <div class="question-card" id="questionCard"></div>
      </div>
      <div class="nav-buttons">
        <button class="nav-btn prev-btn" id="prevBtn">Previous</button>
        <button class="nav-btn next-btn" id="nextBtn">Next</button>
      </div>
    </div>

    <!-- RESULTS SCREEN -->
    <div class="results-screen" id="resultsScreen">
      <div class="score-circle" id="scoreCircle">
        <span id="finalScore">0</span>
      </div>
      <p class="score-text" id="scoreText"></p>
      <div class="final-score" id="finalScoreText">0/10</div>
      <button class="play-again-btn" id="playAgainBtn">🔄 Play Again</button>
    </div>
  </div>

  <!-- SOUND EFFECTS -->
  <audio id="correctSound" preload="auto">
    <source
      src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQA="
      type="audio/wav"
    />
  </audio>
  <audio id="wrongSound" preload="auto">
    <source
      src="data:audio/wav;base64,UklGRn4GAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQA="
      type="audio/wav"
    />
  </audio>

  <script>
    // ===== QUIZ DATA =====
    const quizData = [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2,
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
      },
      { question: "What is 15 x 3?", options: ["35", "40", "45", "50"], correct: 2 },
      {
        question: "Which language is primarily spoken in Brazil?",
        options: ["Spanish", "Portuguese", "French", "English"],
        correct: 1,
      },
      {
        question: "How many continents are there on Earth?",
        options: ["6", "7", "8", "9"],
        correct: 1,
      },
      {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1,
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correct: 1,
      },
      {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2,
      },
      {
        question: "What is the fastest land animal?",
        options: ["Lion", "Horse", "Cheetah", "Gazelle"],
        correct: 2,
      },
      {
        question: "Which fruit is known as the 'king of fruits' in Southeast Asia?",
        options: ["Mango", "Durian", "Jackfruit", "Rambutan"],
        correct: 1,
      },
    ];

    // ===== STATE VARIABLES =====
    let currentUser = null;
    let currentQuestionIndex = 0;
    let score = 0;
    let answers = [];
    let showFeedback = false;

    // ===== DOM ELEMENTS =====
    const loginScreen = document.getElementById("loginScreen");
    const signupScreen = document.getElementById("signupScreen");
    const dashboard = document.getElementById("dashboard");
    const startScreen = document.getElementById("startScreen");
    const quizScreen = document.getElementById("quizScreen");
    const resultsScreen = document.getElementById("resultsScreen");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const startBtn = document.getElementById("startBtn");
    const startQuizBtn = document.getElementById("startQuizBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const playAgainBtn = document.getElementById("playAgainBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const progressFill = document.getElementById("progressFill");
    const currentQuestionEl = document.getElementById("currentQuestion");
    const questionContainer = document.getElementById("questionContainer");
    const questionCard = document.getElementById("questionCard");
    const scoreCircle = document.getElementById("scoreCircle");
    const finalScore = document.getElementById("finalScore");
    const finalScoreText = document.getElementById("finalScoreText");
    const scoreText = document.getElementById("scoreText");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const scoreList = document.getElementById("scoreList");

    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");

    // ===== LOCAL STORAGE FUNCTIONS =====
    function getUsers() {
      return JSON.parse(localStorage.getItem("quizUsers") || "[]");
    }

    function saveUsers(users) {
      localStorage.setItem("quizUsers", JSON.stringify(users));
    }

    function saveCurrentUser(user) {
      localStorage.setItem("quizCurrentUser", JSON.stringify(user));
    }

    function loadCurrentUser() {
      return JSON.parse(localStorage.getItem("quizCurrentUser") || "null");
    }

    // ===== AUTH FUNCTIONS =====
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.toLowerCase();
      const password = document.getElementById("loginPassword").value;

      const users = getUsers();
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        currentUser = user;
        saveCurrentUser(currentUser);
        showDashboard();
      } else {
        alert("Invalid credentials!");
      }
    });

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.toLowerCase();
      const password = document.getElementById("signupPassword").value;

      const users = getUsers();
      if (users.find((u) => u.email === email)) {
        alert("Email already exists!");
        return;
      }

      const newUser = { name, email, password, scores: [] };
      users.push(newUser);
      saveUsers(users);

      currentUser = newUser;
      saveCurrentUser(currentUser);
      showDashboard();
    });

    document.getElementById("toSignup").addEventListener("click", (e) => {
      e.preventDefault();
      loginScreen.classList.remove("active");
      signupScreen.classList.add("active");
    });

    document.getElementById("toLogin").addEventListener("click", (e) => {
      e.preventDefault();
      signupScreen.classList.remove("active");
      loginScreen.classList.add("active");
    });

    function showDashboard() {
      loginScreen.classList.remove("active");
      signupScreen.classList.remove("active");
      startScreen.classList.remove("active");
      quizScreen.classList.remove("active");
      resultsScreen.classList.remove("active");
      dashboard.classList.add("active");

      userName.textContent = `Welcome, ${currentUser.name}!`;
      userEmail.textContent = currentUser.email;
      loadScores();
    }

    function loadScores() {
      if (currentUser.scores.length) {
        scoreList.innerHTML = currentUser.scores
          .map(
            (s, i) => `<div class="score-item" title="Date: ${
              s.date || "N/A"
            }">
          <span>Quiz ${i + 1}</span>
          <span>${s.score}/${s.total} (${Math.round((s.score / s.total) * 100)}%)</span>
          </div>`
          )
          .join("");
      } else {
        scoreList.innerHTML =
          '<p style="text-align: center; color: #666; font-style: italic;">No scores yet. Take a quiz!</p>';
      }
    }

    logoutBtn.addEventListener("click", () => {
      currentUser = null;
      localStorage.removeItem("quizCurrentUser");
      dashboard.classList.remove("active");
      startScreen.classList.remove("active");
      quizScreen.classList.remove("active");
      resultsScreen.classList.remove("active");
      signupScreen.classList.remove("active");
      loginScreen.classList.add("active");
    });

    // ===== QUIZ FUNCTIONS =====
    startQuizBtn.addEventListener("click", () => {
      dashboard.classList.remove("active");
      startScreen.classList.add("active");
    });

    startBtn.addEventListener("click", startQuiz);
    prevBtn.addEventListener("click", previousQuestion);
    nextBtn.addEventListener("click", nextQuestion);
    playAgainBtn.addEventListener("click", restartQuiz);

    function initializeAnswers() {
      answers = new Array(quizData.length).fill(null);
      currentQuestionIndex = 0;
      score = 0;
      showFeedback = false;
    }

    function startQuiz() {
      initializeAnswers();
      startScreen.classList.remove("active");
      quizScreen.classList.add("active");
      updateTotalQuestions();
      showQuestion();
    }

    function updateTotalQuestions() {
      document.getElementById("totalQuestions").textContent = quizData.length;
    }

    function showQuestion() {
      const question = quizData[currentQuestionIndex];

      // Update progress
      const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
      progressFill.style.width = progress + "%";
      currentQuestionEl.textContent = currentQuestionIndex + 1;

      // Remove old feedback
      const feedbackOld = questionCard.querySelector(".feedback-message");
      if (feedbackOld) feedbackOld.remove();

      // Build question & options markup
      questionCard.innerHTML = `
                <div class="question-number">Question ${
                  currentQuestionIndex + 1
                }</div>
                <div class="question-text">${question.question}</div>
                <div class="options-container">
                    ${question.options
                      .map(
                        (option, index) => `
                        <button class="option-btn ${
                          answers[currentQuestionIndex] === index
                            ? "selected"
                            : ""
                        }" data-option="${index}">${option}</button>`
                      )
                      .join("")}
                </div>
            `;

      // Add event listeners for options
      document.querySelectorAll(".option-btn").forEach((btn) => {
        btn.addEventListener("click", () => selectOption(btn));
      });

      updateNavButtons();

      // Animate question container appearance
      questionContainer.classList.remove("visible");
      setTimeout(() => {
        questionContainer.classList.add("visible");
      }, 50);

      // Reset score recalc for quiz display case
      // (score recalculated on showAnswerFeedback)
    }

    function selectOption(selectedBtn) {
      if (showFeedback) return; // Prevent reselect after feedback shown

      const optionIndex = parseInt(selectedBtn.dataset.option);

      // Deselect all options
      document.querySelectorAll(".option-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });

      // Select current option
      selectedBtn.classList.add("selected");
      answers[currentQuestionIndex] = optionIndex;

      updateNavButtons();
    }

    function showAnswerFeedback() {
      const question = quizData[currentQuestionIndex];
      const userAnswer = answers[currentQuestionIndex];
      if (userAnswer === null) return;

      // Highlight correct answer
      const correctBtn = document.querySelector(
        `.option-btn[data-option="${question.correct}"]`
      );
      correctBtn.classList.add("correct");

      // If user answer wrong, highlight wrong selection
      if (userAnswer !== question.correct) {
        const userBtn = document.querySelector(
          `.option-btn[data-option="${userAnswer}"]`
        );
        if (userBtn) userBtn.classList.add("wrong");

        // Feedback message: show correct answer
        const feedback = document.createElement("div");
        feedback.className = "feedback-message feedback-wrong";
        feedback.textContent = `Correct answer: ${question.options[question.correct]}`;
        questionCard.appendChild(feedback);
        setTimeout(() => {
          feedback.style.opacity = "1";
          feedback.style.transform = "translateY(0)";
        }, 100);

        wrongSound.play().catch(() => {});
      } else {
        // Feedback message: Correct!
        const feedback = document.createElement("div");
        feedback.className = "feedback-message feedback-correct";
        feedback.textContent = "Perfect! ✅";
        questionCard.appendChild(feedback);
        setTimeout(() => {
          feedback.style.opacity = "1";
          feedback.style.transform = "translateY(0)";
        }, 100);

        correctSound.play().catch(() => {});
      }

      // Update score live here to avoid recalculating all answers each time
      score = answers.reduce((acc, ans, idx) => {
        if (ans === quizData[idx].correct) return acc + 1;
        return acc;
      }, 0);

      showFeedback = true;
      updateNavButtons();
    }

    function nextQuestion() {
      if (!showFeedback) {
        if (answers[currentQuestionIndex] === null) {
          alert("Please select an answer before continuing.");
          return;
        }
        showAnswerFeedback();
        return;
      }

      if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        showFeedback = false;
        showQuestion();
      } else {
        showResults();
      }
    }

    function previousQuestion() {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showFeedback = false;
        showQuestion();
      }
    }

    function updateNavButtons() {
      prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "block";

      const hasAnswered = answers[currentQuestionIndex] !== null;
      nextBtn.textContent =
        currentQuestionIndex === quizData.length - 1 ? "Finish" : "Next";

      if (hasAnswered && !showFeedback) {
        nextBtn.textContent = "Show Answer";
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
      } else if (showFeedback) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
      } else {
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.6";
        nextBtn.style.cursor = "not-allowed";
      }
    }

    function showResults() {
      quizScreen.classList.remove("active");
      resultsScreen.classList.add("active");

      finalScore.textContent = score;
      finalScoreText.textContent = `${score}/${quizData.length}`;
      scoreText.textContent =
        score >= 7
          ? "🎉 Excellent!"
          : score >= 5
          ? "👍 Good job!"
          : "💪 Keep practicing!";

      // Save score with date to current user
      currentUser.scores.push({
        score,
        total: quizData.length,
        date: new Date().toLocaleDateString(),
      });
      const users = getUsers();
      const userIndex = users.findIndex(
        (u) => u.email === currentUser.email && u.name === currentUser.name
      );
      if (userIndex !== -1) {
        users[userIndex] = currentUser;
      }
      saveUsers(users);
      saveCurrentUser(currentUser);

      // Animate score circle popping
      scoreCircle.style.transform = "scale(0)";
      setTimeout(() => {
        scoreCircle.style.transform = "scale(1)";
      }, 100);
    }

    function restartQuiz() {
      resultsScreen.classList.remove("active");
      dashboard.classList.add("active");
      loadScores();
    }

    // ===== INITIALIZE APP =====
    window.addEventListener("load", () => {
      currentUser = loadCurrentUser();
      if (currentUser) {
        showDashboard();
      } else {
        loginScreen.classList.add("active");
      }
    });
  </script>
</body>
</html>

