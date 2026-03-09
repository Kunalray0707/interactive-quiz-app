# QuizNova - The Next Generation Smart Quiz Platform

A premium-level, fully functional quiz web application with AI-powered features, gamification, and stunning visual design.

## 🌟 Features

### Quiz Modes
- **Practice Mode** - Learn at your own pace
- **Timed Mode** - Answer quickly under time pressure
- **Survival Mode** - One wrong answer = game over
- **Battle Mode** - Local 2-player competitive
- **AI Smart Mode** - Adaptive difficulty based on performance

### Question Types
- Multiple Choice (MCQ)
- True/False
- Fill in the Blank
- Code Snippet Questions

### Gamification
- XP (Experience Points) System
- Level Up Progress
- Daily Streak Counter
- Achievement Badges
- Combo Streak Bonuses
- Leaderboard Rankings

### Premium UI
- Glassmorphism + Neon Design
- Dark/Light Theme Toggle
- Animated Gradients
- Particle Background Effects
- Smooth Transitions
- 3D Hover Effects
- Circular Timer Animation
- Confetti Celebrations

### Smart Features
- Adaptive Difficulty (AI Mode)
- Lifelines: 50/50, Skip, Time Freeze, Hint
- Weak Area Detection
- Performance Analytics
- Category-based Practice

## 🚀 How to Run QuizNova - Step by Step

### Method 1: Double-click index.html (Easiest)
1. Go to the QuizNova folder
2. Find the file named `index.html`
3. Double-click on it
4. The quiz will open in your browser

### Method 2: Using VS Code Live Server (Recommended)
1. Open VS Code
2. Open the QuizNova folder in VS Code
3. Install the "Live Server" extension (click Install if prompted)
4. Right-click on `index.html`
5. Select "Open with Live Server"
6. The quiz will open in your browser

### Method 3: Using Python Simple Server
1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Navigate to the QuizNova folder:
   `cd path/to/QuizNova`
3. Run this command:
   `python -m http.server 8000`
4. Open your browser and go to:
   `http://localhost:8000`

### Troubleshooting
- Questions not loading? Use Method 2 or 3 instead of double-clicking
- Styles look broken? Check your internet connection
- Blank page? Try refreshing the browser

No server required - fully client-side!

## 📁 Project Structure

```
QuizNova/
├── index.html          # Main HTML file with all pages
├── css/
│   └── styles.css     # Premium styling with glassmorphism
├── js/
│   └── app.js         # Main application logic
├── data/
│   └── questions.json # Question database
└── README.md          # This file
```

## 🎮 How to Play

1. **Register/Login** - Create an account to track progress
2. **Choose Mode** - Select your preferred quiz format
3. **Select Category** - Pick a topic (Programming, Science, Math, etc.)
4. **Start Quiz** - Answer questions and earn XP
5. **Level Up** - Gain XP to unlock higher levels
6. **Compete** - View the leaderboard to see rankings

## 📊 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom premium styling
- **JavaScript ES6+** - Modern JavaScript
- **Chart.js** - Analytics visualizations
- **LocalStorage** - Offline data persistence

## 🔧 Configuration

### Adding Questions
Edit `data/questions.json` to add new questions:

```
json
{
  "id": 21,
  "category": "programming",
  "type": "mcq",
  "difficulty": "easy",
  "question": "Your question here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Explanation of the answer"
}
```

### Categories
- Programming
- Science
- Mathematics
- History
- Geography
- Technology

### Difficulty Levels
- Easy (10 XP per question)
- Medium (20 XP per question)
- Hard (30 XP per question)

## 🎯 Lifelines

- **50/50** - Removes two wrong answers
- **Skip** - Move to next question
- **Time Freeze** - Add 10 seconds
- **Hint** - Highlights correct answer

## 📈 Analytics

The dashboard provides:
- Total quizzes completed
- Questions answered
- Correct answer percentage
- Performance over time chart
- Accuracy rate chart

## 🎨 Theme

Toggle between Dark and Light modes using the theme button in the navigation. The application remembers your preference.

## 📱 Responsive

Works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🔐 Security

- Passwords are encoded using base64 (basic protection)
- Data stored locally in browser
- No external server required

## 📝 License

This project is open source and available for educational purposes.

---

Built with ❤️ using HTML, CSS, and JavaScript
