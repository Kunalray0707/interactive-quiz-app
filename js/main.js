// ============================================
// QuizNova - Main Application
// ============================================

const AppState = {
    currentUser: null,
    currentPage: 'landing',
    quiz: {
        mode: null,
        category: null,
        difficulty: null,
        questions: [],
        currentIndex: 0,
        answers: [],
        score: 0,
        xp: 0,
        streak: 0,
        timer: null,
        timeLeft: 30,
        lifelines: {
            fiftyFifty: true,
            skip: true,
            timeFreeze: true,
            hint: true
        }
    },
    settings: {
        soundEnabled: true,
        darkMode: true,
        notificationsEnabled: true
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadSettings();
    initParticles();
    initEventListeners();
    navigateTo('landing');
});

// Navigation System
function navigateTo(page, data = {}) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        AppState.currentPage = page;
        
        // Page-specific initialization
        switch(page) {
            case 'landing':
                initLandingPage();
                break;
            case 'modes':
                initModesPage();
                break;
            case 'quiz':
                initQuizPage(data);
                break;
            case 'results':
                initResultsPage();
                break;
            case 'dashboard':
                initDashboardPage();
                break;
            case 'leaderboard':
                initLeaderboardPage();
                break;
            case 'auth':
                initAuthPage();
                break;
            case 'admin':
                initAdminPage();
                break;
        }
        
        // Update navigation
        updateNavigation();
    }
}

function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === AppState.currentPage) {
            link.classList.add('active');
        }
    });
}

// Event Listeners
function initEventListeners() {
    // Theme Toggle
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    
    // Sound Toggle
    document.getElementById('sound-toggle')?.addEventListener('click', toggleSound);
    
    // Mobile Menu
    document.getElementById('mobile-menu-btn')?.addEventListener('click', toggleMobileMenu);
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
}

// Theme Toggle
function toggleTheme() {
    AppState.settings.darkMode = !AppState.settings.darkMode;
    document.body.classList.toggle('light-mode', !AppState.settings.darkMode);
    saveSettings();
    
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = AppState.settings.darkMode ? '🌙' : '☀️';
    }
}

// Sound Toggle
function toggleSound() {
    AppState.settings.soundEnabled = !AppState.settings.soundEnabled;
    saveSettings();
    
    const icon = document.querySelector('.sound-icon');
    if (icon) {
        icon.textContent = AppState.settings.soundEnabled ? '🔊' : '🔇';
    }
}

// Mobile Menu
function toggleMobileMenu() {
    document.querySelector('.sidebar')?.classList.toggle('active');
}

// Scroll Effect
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Particles Background
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ================== LANDING PAGE ==================
function initLandingPage() {
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ================== AUTH PAGE ==================
function initAuthPage() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    
    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm?.classList.add('hidden');
            registerForm?.classList.remove('hidden');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm?.classList.add('hidden');
            loginForm?.classList.remove('hidden');
        });
    }
    
    // Handle login
    loginForm?.addEventListener('submit', handleLogin);
    
    // Handle register
    registerForm?.addEventListener('submit', handleRegister);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;
    
    if (!email || !password) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Simulate login (in real app, validate against backend)
    const users = JSON.parse(localStorage.getItem('quiznova_users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (user && user.password === btoa(password)) {
        AppState.currentUser = user;
        saveUserData();
        showNotification('Login successful!', 'success');
        navigateTo('dashboard');
    } else {
        showNotification('Invalid credentials', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name')?.value;
    const email = document.getElementById('register-email')?.value;
    const password = document.getElementById('register-password')?.value;
    
    if (!name || !email || !password) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('quiznova_users') || '[]');
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password: btoa(password),
        xp: 0,
        level: 1,
        streak: 0,
        lastPlayed: null,
        achievements: [],
        stats: {
            totalQuizzes: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            averageScore: 0
        }
    };
    
    users.push(newUser);
    localStorage.setItem('quiznova_users', JSON.stringify(users));
    
    AppState.currentUser = newUser;
    saveUserData();
    showNotification('Registration successful!', 'success');
    navigateTo('dashboard');
}

// ================== MODES PAGE ==================
function initModesPage() {
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            const mode = card.dataset.mode;
            const category = document.getElementById('category-select')?.value || 'all';
            const difficulty = document.getElementById('difficulty-select')?.value || 'all';
            
            startQuiz(mode, category, difficulty);
        });
    });
}

// Embedded Questions Database
const questionsDatabase = [
    { id: 1, category: "programming", type: "mcq", difficulty: "easy", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correctAnswer: 0, explanation: "HTML stands for Hyper Text Markup Language" },
    { id: 2, category: "programming", type: "mcq", difficulty: "easy", question: "Which of these is NOT a JavaScript framework?", options: ["React", "Angular", "Django", "Vue"], correctAnswer: 2, explanation: "Django is a Python web framework" },
    { id: 3, category: "programming", type: "mcq", difficulty: "medium", question: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correctAnswer: 2, explanation: "Binary search has O(log n) time complexity" },
    { id: 4, category: "programming", type: "code", difficulty: "medium", question: "What is the output?\nlet x = [1,2,3];\nlet y = x;\ny.push(4);\nconsole.log(x.length);", options: ["3", "4", "Error", "undefined"], correctAnswer: 1, explanation: "Arrays are passed by reference in JavaScript" },
    { id: 5, category: "programming", type: "mcq", difficulty: "hard", question: "In Python, print(type(lambda: None)) outputs?", options: ["<class 'function'>", "<class 'lambda'>", "<class 'NoneType'>", "SyntaxError"], correctAnswer: 0, explanation: "Lambda creates a function object" },
    { id: 6, category: "science", type: "mcq", difficulty: "easy", question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctAnswer: 2, explanation: "Au comes from Latin 'aurum'" },
    { id: 7, category: "science", type: "mcq", difficulty: "medium", question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctAnswer: 1, explanation: "Saturn has over 140 known moons" },
    { id: 8, category: "science", type: "mcq", difficulty: "hard", question: "What is the half-life of Carbon-14?", options: ["5,730 years", "1,000 years", "10,000 years", "50,000 years"], correctAnswer: 0, explanation: "Carbon-14 half-life is ~5,730 years" },
    { id: 9, category: "mathematics", type: "mcq", difficulty: "easy", question: "What is π to 2 decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correctAnswer: 1, explanation: "Pi is approximately 3.14159" },
    { id: 10, category: "mathematics", type: "mcq", difficulty: "medium", question: "What is the derivative of x²?", options: ["x", "2x", "2", "x²"], correctAnswer: 1, explanation: "Using power rule: d/dx(x²) = 2x" },
    { id: 11, category: "mathematics", type: "mcq", difficulty: "hard", question: "What is the integral of 2x dx?", options: ["x² + C", "2x² + C", "x²", "2 + C"], correctAnswer: 0, explanation: "Integral of 2x dx = x² + C" },
    { id: 12, category: "history", type: "mcq", difficulty: "easy", question: "In which year did WWII end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2, explanation: "WWII ended in 1945" },
    { id: 13, category: "history", type: "mcq", difficulty: "medium", question: "Who was the first US President?", options: ["Jefferson", "Adams", "Washington", "Franklin"], correctAnswer: 2, explanation: "George Washington was first President" },
    { id: 14, category: "geography", type: "mcq", difficulty: "easy", question: "What is the largest country by area?", options: ["Canada", "China", "USA", "Russia"], correctAnswer: 3, explanation: "Russia is the largest country" },
    { id: 15, category: "geography", type: "mcq", difficulty: "medium", question: "Which is the longest river?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: 1, explanation: "Nile is ~6,650 km long" },
    { id: 16, category: "technology", type: "mcq", difficulty: "easy", question: "Who founded Microsoft?", options: ["Jobs", "Gates", "Zuckerberg", "Musk"], correctAnswer: 1, explanation: "Bill Gates co-founded Microsoft" },
    { id: 17, category: "technology", type: "mcq", difficulty: "medium", question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], correctAnswer: 0, explanation: "CPU = Central Processing Unit" },
    { id: 18, category: "programming", type: "truefalse", difficulty: "easy", question: "JavaScript is statically typed.", options: ["True", "False"], correctAnswer: 1, explanation: "JavaScript is dynamically typed" },
    { id: 19, category: "science", type: "truefalse", difficulty: "easy", question: "Light travels faster than sound.", options: ["True", "False"], correctAnswer: 0, explanation: "Light is much faster than sound" },
    { id: 20, category: "programming", type: "fillblank", difficulty: "medium", question: "CSS property for flexible items is ____.", correctAnswer: "flex", explanation: "The flex property is used in Flexbox" }
];

function startQuiz(mode, category, difficulty) {
    // Use embedded questions
    let questions = [...questionsDatabase];
    
    // Filter by category
    if (category !== 'all') {
        questions = questions.filter(q => q.category === category);
    }
    
    // Filter by difficulty
    if (difficulty !== 'all') {
        questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Shuffle and limit
    questions = shuffleArray(questions).slice(0, 10);
    
    if (questions.length === 0) {
        showNotification('No questions available', 'error');
        return;
    }
    
    // Initialize quiz state
    AppState.quiz = {
        mode, category, difficulty, questions,
        currentIndex: 0, answers: [], score: 0, xp: 0, streak: 0,
        timer: null,
        timeLeft: mode === 'timed' ? 20 : 30,
        lifelines: { fiftyFifty: true, skip: true, timeFreeze: true, hint: true }
    };
    
    navigateTo('quiz', { mode });
}

// ================== QUIZ PAGE ==================
function initQuizPage(data) {
    showQuestion();
    startTimer();
}

function showQuestion() {
    const quiz = AppState.quiz;
    const question = quiz.questions[quiz.currentIndex];
    
    if (!question) {
        endQuiz();
        return;
    }
    
    // Update progress
    const progressFill = document.querySelector('.quiz-progress-fill');
    const questionNumber = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const answersGrid = document.querySelector('.answers-grid');
    const questionCategory = document.getElementById('question-category-display');
    const questionDifficulty = document.getElementById('question-difficulty-display');
    
    if (progressFill) {
        progressFill.style.width = `${((quiz.currentIndex + 1) / quiz.questions.length) * 100}%`;
    }
    
    if (questionNumber) questionNumber.textContent = quiz.currentIndex + 1;
    if (questionText) questionText.textContent = question.question;
    if (questionCategory) questionCategory.textContent = question.category;
    if (questionDifficulty) questionDifficulty.textContent = question.difficulty;
    
    // Update stats
    updateQuizStats();
    
    // Generate answers
    if (answersGrid) {
        answersGrid.innerHTML = '';
        
        const letters = ['A', 'B', 'C', 'D'];
        
        question.options.forEach((option, index) => {
            const answerEl = document.createElement('div');
            answerEl.className = 'answer-option';
            answerEl.innerHTML = `
                <span class="answer-letter">${letters[index]}</span>
                <span class="answer-text">${option}</span>
            `;
            answerEl.addEventListener('click', () => selectAnswer(index));
            answersGrid.appendChild(answerEl);
        });
    }
    
    // Update lifelines UI
    updateLifelinesUI();
}

function selectAnswer(index) {
    const quiz = AppState.quiz;
    const question = quiz.questions[quiz.currentIndex];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    // Disable further clicks
    answerOptions.forEach(opt => opt.style.pointerEvents = 'none');
    
    // Mark selected
    answerOptions[index].classList.add('selected');
    
    // Check if correct
    const isCorrect = index === question.correctAnswer;
    
    if (isCorrect) {
        answerOptions[index].classList.add('correct');
        quiz.score++;
        quiz.streak++;
        
        // Calculate XP
        const baseXP = question.difficulty === 'easy' ? 10 : question.difficulty === 'medium' ? 20 : 30;
        const streakBonus = quiz.streak * 5;
        quiz.xp += baseXP + streakBonus;
        
        playSound('correct');
    } else {
        answerOptions[index].classList.add('incorrect');
        answerOptions[question.correctAnswer].classList.add('correct');
        quiz.streak = 0;
        
        // Survival mode - end on wrong answer
        if (quiz.mode === 'survival') {
            showNotification('Game Over!', 'error');
            setTimeout(() => endQuiz(), 1000);
            return;
        }
        
        playSound('incorrect');
    }
    
    // Store answer
    quiz.answers.push({
        questionId: question.id,
        selected: index,
        correct: isCorrect,
        timeSpent: 30 - quiz.timeLeft
    });
    
    // Update stats
    updateQuizStats();
    
    // Next question after delay
    setTimeout(() => {
        quiz.currentIndex++;
        
        if (quiz.currentIndex >= quiz.questions.length) {
            endQuiz();
        } else {
            // Reset timer for next question
            quiz.timeLeft = quiz.mode === 'timed' ? 20 : 30;
            showQuestion();
        }
    }, 1500);
}

function updateQuizStats() {
    const quiz = AppState.quiz;
    
    const scoreEl = document.getElementById('stat-score');
    const streakEl = document.getElementById('stat-streak');
    const xpEl = document.getElementById('stat-xp');
    
    if (scoreEl) scoreEl.textContent = quiz.score;
    if (streakEl) streakEl.textContent = quiz.streak;
    if (xpEl) xpEl.textContent = `+${quiz.xp}`;
}

function startTimer() {
    const quiz = AppState.quiz;
    
    clearInterval(quiz.timer);
    
    quiz.timer = setInterval(() => {
        quiz.timeLeft--;
        
        updateTimerDisplay();
        
        if (quiz.timeLeft <= 0) {
            clearInterval(quiz.timer);
            
            // Time's up - mark as wrong
            quiz.answers.push({
                questionId: quiz.questions[quiz.currentIndex].id,
                selected: -1,
                correct: false,
                timeSpent: 30
            });
            
            quiz.streak = 0;
            
            if (quiz.mode === 'survival') {
                showNotification('Time\'s up! Game Over!', 'error');
                setTimeout(() => endQuiz(), 1000);
            } else {
                quiz.currentIndex++;
                
                if (quiz.currentIndex >= quiz.questions.length) {
                    endQuiz();
                } else {
                    quiz.timeLeft = quiz.mode === 'timed' ? 20 : 30;
                    showQuestion();
                    startTimer();
                }
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const quiz = AppState.quiz;
    const timerText = document.querySelector('.timer-text');
    const timerProgress = document.querySelector('.timer-ring-progress');
    
    if (timerText) {
        timerText.textContent = quiz.timeLeft;
    }
    
    if (timerProgress) {
        const maxTime = quiz.mode === 'timed' ? 20 : 30;
        const circumference = 2 * Math.PI * 45;
        const offset = circumference * (1 - quiz.timeLeft / maxTime);
        timerProgress.style.strokeDashoffset = offset;
        
        // Color changes
        timerProgress.classList.remove('warning', 'danger');
        if (quiz.timeLeft <= 5) {
            timerProgress.classList.add('danger');
        } else if (quiz.timeLeft <= 10) {
            timerProgress.classList.add('warning');
        }
    }
}

// Lifelines
function useFiftyFifty() {
    if (!AppState.quiz.lifelines.fiftyFifty) return;
    
    const question = AppState.quiz.questions[AppState.quiz.currentIndex];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    // Find two wrong answers to hide
    const wrongIndices = [];
    answerOptions.forEach((_, index) => {
        if (index !== question.correctAnswer) {
            wrongIndices.push(index);
        }
    });
    
    // Randomly hide two wrong answers
    const toHide = shuffleArray(wrongIndices).slice(0, 2);
    toHide.forEach(index => {
        answerOptions[index].style.display = 'none';
    });
    
    AppState.quiz.lifelines.fiftyFifty = false;
    updateLifelinesUI();
    showNotification('50/50 used! Two wrong answers removed.', 'success');
}

function useSkip() {
    if (!AppState.quiz.lifelines.skip) return;
    
    AppState.quiz.lifelines.skip = false;
    updateLifelinesUI();
    
    // Move to next question without penalty
    AppState.quiz.currentIndex++;
    
    if (AppState.quiz.currentIndex >= AppState.quiz.questions.length) {
        endQuiz();
    } else {
        AppState.quiz.timeLeft = AppState.quiz.mode === 'timed' ? 20 : 30;
        showQuestion();
    }
    
    showNotification('Question skipped!', 'success');
}

function useTimeFreeze() {
    if (!AppState.quiz.lifelines.timeFreeze) return;
    
    AppState.quiz.lifelines.timeFreeze = false;
    updateLifelinesUI();
    
    // Add 10 seconds
    AppState.quiz.timeLeft += 10;
    updateTimerDisplay();
    
    showNotification('Time frozen! +10 seconds added.', 'success');
}

function useHint() {
    if (!AppState.quiz.lifelines.hint) return;
    
    const question = AppState.quiz.questions[AppState.quiz.currentIndex];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    // Highlight the correct answer
    answerOptions[question.correctAnswer].style.borderColor = 'var(--neon-green)';
    answerOptions[question.correctAnswer].style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
    
    AppState.quiz.lifelines.hint = false;
    updateLifelinesUI();
    showNotification('Hint revealed! The correct answer is highlighted.', 'success');
}

function updateLifelinesUI() {
    const lifelines = AppState.quiz.lifelines;
    
    const fiftyBtn = document.getElementById('lifeline-fifty');
    const skipBtn = document.getElementById('lifeline-skip');
    const freezeBtn = document.getElementById('lifeline-freeze');
    const hintBtn = document.getElementById('lifeline-hint');
    
    if (fiftyBtn) {
        fiftyBtn.classList.toggle('used', !lifelines.fiftyFifty);
        fiftyBtn.disabled = !lifelines.fiftyFifty;
    }
    if (skipBtn) {
        skipBtn.classList.toggle('used', !lifelines.skip);
        skipBtn.disabled = !lifelines.skip;
    }
    if (freezeBtn) {
        freezeBtn.classList.toggle('used', !lifelines.timeFreeze);
        freezeBtn.disabled = !lifelines.timeFreeze;
    }
    if (hintBtn) {
        hintBtn.classList.toggle('used', !lifelines.hint);
        hintBtn.disabled = !lifelines.hint;
    }
}

function endQuiz() {
    clearInterval(AppState.quiz.timer);
    
    // Calculate final stats
    const quiz = AppState.quiz;
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.score;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update user stats
    if (AppState.currentUser) {
        AppState.currentUser.xp += quiz.xp;
        AppState.currentUser.stats.totalQuizzes++;
        AppState.currentUser.stats.totalQuestions += totalQuestions;
        AppState.currentUser.stats.correctAnswers += correctAnswers;
        
        // Calculate new level
        const xpForNextLevel = AppState.currentUser.level * 100;
        if (AppState.currentUser.xp >= xpForNextLevel) {
            AppState.currentUser.level++;
            AppState.currentUser.xp -= xpForNextLevel;
            showNotification(`Level Up! You are now level ${AppState.currentUser.level}!`, 'success');
        }
        
        // Update streak
        const today = new Date().toDateString();
        if (AppState.currentUser.lastPlayed !== today) {
            AppState.currentUser.streak++;
        }
        AppState.currentUser.lastPlayed = today;
        
        saveUserData();
    }
    
    // Save quiz result
    saveQuizResult({
        date: new Date().toISOString(),
        mode: quiz.mode,
        category: quiz.category,
        difficulty: quiz.difficulty,
        score: correctAnswers,
        total: totalQuestions,
        accuracy,
        xp: quiz.xp,
        answers: quiz.answers
    });
    
    navigateTo('results');
}

// ================== RESULTS PAGE ==================
function initResultsPage() {
    const quiz = AppState.quiz;
    
    // Animate score circle
    const scoreValue = document.getElementById('score-value');
    const scoreCircle = document.querySelector('.score-circle-progress');
    
    if (scoreValue) {
        scoreValue.textContent = '0%';
    }
    
    setTimeout(() => {
        const accuracy = Math.round((quiz.score / quiz.questions.length) * 100);
        if (scoreValue) {
            animateValue(scoreValue, 0, accuracy, 1500);
        }
        
        if (scoreCircle) {
            const circumference = 2 * Math.PI * 45;
            const offset = circumference * (1 - accuracy / 100);
            scoreCircle.style.strokeDashoffset = offset;
        }
    }, 100);
    
    // Update stats
    const stats = {
        'result-correct': quiz.score,
        'result-incorrect': quiz.questions.length - quiz.score,
        'result-accuracy': Math.round((quiz.score / quiz.questions.length) * 100) + '%',
        'result-xp': '+' + quiz.xp,
        'result-streak': quiz.streak
    };
    
    Object.entries(stats).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
    
    // Confetti for high scores
    if (quiz.score / quiz.questions.length >= 0.7) {
        launchConfetti();
    }
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ================== DASHBOARD PAGE ==================
function initDashboardPage() {
    if (!AppState.currentUser) {
        navigateTo('auth');
        return;
    }
    
    // Update user info
    const userName = document.getElementById('dashboard-username');
    const userLevel = document.getElementById('dashboard-level');
    const userXP = document.getElementById('dashboard-xp');
    const xpBarFill = document.querySelector('.xp-bar-fill');
    const userStreak = document.getElementById('dashboard-streak');
    
    if (userName) userName.textContent = AppState.currentUser.name;
    if (userLevel) userLevel.textContent = AppState.currentUser.level;
    if (userXP) userXP.textContent = `${AppState.currentUser.xp} XP`;
    if (userStreak) userStreak.textContent = AppState.currentUser.streak;
    
    if (xpBarFill) {
        const xpForNextLevel = AppState.currentUser.level * 100;
        xpBarFill.style.width = `${(AppState.currentUser.xp / xpForNextLevel) * 100}%`;
    }
    
    // Update stats cards
    const stats = AppState.currentUser.stats;
    const statElements = {
        'stat-total-quizzes': stats.totalQuizzes,
        'stat-total-questions': stats.totalQuestions,
        'stat-correct-answers': stats.correctAnswers,
        'stat-accuracy': stats.totalQuestions > 0 ? 
            Math.round((stats.correctAnswers / stats.totalQuestions) * 100) + '%' : '0%'
    };
    
    Object.entries(statElements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
    
    // Load charts
    loadAnalyticsCharts();
}

function loadAnalyticsCharts() {
    // Accuracy Chart
    const accuracyCtx = document.getElementById('accuracy-chart');
    if (accuracyCtx) {
        new Chart(accuracyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Correct', 'Incorrect'],
                datasets: [{
                    data: [65, 35],
                    backgroundColor: ['#00ff88', '#ff006e'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
    }
    
    // Performance Chart
    const performanceCtx = document.getElementById('performance-chart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Score',
                    data: [65, 72, 68, 80, 75, 85, 90],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#94a3b8' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        });
    }
}

// ================== LEADERBOARD PAGE ==================
function initLeaderboardPage() {
    const users = JSON.parse(localStorage.getItem('quiznova_users') || '[]');
    const sortedUsers = users.sort((a, b) => b.xp - a.xp).slice(0, 10);
    
    const tbody = document.getElementById('leaderboard-body');
    if (tbody) {
        tbody.innerHTML = '';
        
        sortedUsers.forEach((user, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="leaderboard-rank">
                    <span class="rank-badge ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}">
                        ${index + 1}
                    </span>
                </td>
                <td>
                    <div class="leaderboard-user">
                        <div class="leaderboard-avatar">${user.name.charAt(0)}</div>
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.level}</td>
                <td><span class="badge xp">${user.xp} XP</span></td>
                <td>${user.stats.totalQuizzes}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// ================== ADMIN PAGE ==================
function initAdminPage() {
    loadQuestionsForAdmin();
}

function loadQuestionsForAdmin() {
    const container = document.getElementById('questions-list');
    if (container) {
        container.innerHTML = '';
        
        questionsDatabase.forEach(q => {
            const el = document.createElement('div');
            el.className = 'question-item';
            el.innerHTML = `
                <div class="question-item-content">
                    <h4>${q.question.substring(0, 50)}...</h4>
                    <p class="badge">${q.category}</p>
                    <span class="badge">${q.difficulty}</span>
                </div>
                <div class="question-item-actions">
                    <button class="btn btn-sm btn-ghost" onclick="editQuestion(${q.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteQuestion(${q.id})">Delete</button>
                </div>
            `;
            container.appendChild(el);
        });
    }
}

// ================== UTILITY FUNCTIONS ==================

// Shuffle array
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Sound effects
function playSound(type) {
    if (!AppState.settings.soundEnabled) return;
    
    // In a real app, you'd use actual audio files
    // This is a placeholder for sound effects
    console.log(`Playing sound: ${type}`);
}

// Notifications
function showNotification(message, type = 'info') {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <div class="notification-content">
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// Confetti
function launchConfetti() {
    const container = document.querySelector('.confetti-container') || createConfettiContainer();
    container.innerHTML = '';
    
    const colors = ['#6366f1', '#ec4899', '#00ff88', '#00d4ff', '#f59e0b'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const animation = confetti.animate([
            { top: '-10px', opacity: 1 },
            { top: '100%', opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1500,
            delay: Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        container.appendChild(confetti);
    }
}

function createConfettiContainer() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    return container;
}

// Local Storage Functions
function saveUserData() {
    if (AppState.currentUser) {
        localStorage.setItem('quiznova_current_user', JSON.stringify(AppState.currentUser));
    }
}

function loadUserData() {
    const data = localStorage.getItem('quiznova_current_user');
    if (data) {
        AppState.currentUser = JSON.parse(data);
    }
}

function saveSettings() {
    localStorage.setItem('quiznova_settings', JSON.stringify(AppState.settings));
}

function loadSettings() {
    const data = localStorage.getItem('quiznova_settings');
    if (data) {
        AppState.settings = { ...AppState.settings, ...JSON.parse(data) };
    }
    
    // Apply theme
    if (!AppState.settings.darkMode) {
        document.body.classList.add('light-mode');
    }
}

function saveQuizResult(result) {
    const results = JSON.parse(localStorage.getItem('quiznova_results') || '[]');
    results.push(result);
    localStorage.setItem('quiznova_results', JSON.stringify(results.slice(-50))); // Keep last 50
}

// Export for global access
window.navigateTo = navigateTo;
window.startQuiz = startQuiz;
window.useFiftyFifty = useFiftyFifty;
window.useSkip = useSkip;
window.useTimeFreeze = useTimeFreeze;
window.useHint = useHint;
window.quizNova = {
    AppState,
    showNotification,
    saveQuizResult
};
