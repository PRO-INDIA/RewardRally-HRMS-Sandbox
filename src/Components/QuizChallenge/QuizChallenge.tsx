import React, { FC, useState, useEffect } from "react";
import { getQuestionsByPrizeName, QuizQuestion } from "../../Data/quizData";
import "./QuizChallenge.scss";

interface QuizChallengeProps {
  prizeName: string;
  onComplete: (data: QuizSubmissionData) => void;
  onTimeUp: () => void;
}

export interface QuizSubmissionData {
  userName: string;
  phoneNumber: string;
  prizeName: string;
  answers: { questionId: number; selectedAnswer: string; isCorrect: boolean }[];
  score: number;
  timeTaken: number; // in seconds
}

const QuizChallenge: FC<QuizChallengeProps> = ({
  prizeName,
  onComplete,
  onTimeUp,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [errors, setErrors] = useState<{
    userName?: string;
    phoneNumber?: string;
  }>({});
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds timer
  const [startTime] = useState(Date.now()); // Store the start time once when component mounts
  const [quizEndTime, setQuizEndTime] = useState<number | null>(null); // Store when quiz questions ended

  useEffect(() => {
    const randomQuestions = getQuestionsByPrizeName(prizeName, 3);
    setQuestions(randomQuestions);
  }, [prizeName]);

  // Timer countdown effect - only runs during quiz questions, not on contact form
  useEffect(() => {
    // Stop timer if contact form is showing
    if (showContactForm) {
      return;
    }

    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeUp, showContactForm]);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Record the time when user finishes the last question
      setQuizEndTime(Date.now());
      setShowContactForm(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const validateForm = () => {
    const newErrors: { userName?: string; phoneNumber?: string } = {};

    if (!userName.trim()) {
      newErrors.userName = "Name is required";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber.replaceAll(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Calculate time taken in seconds - only for the 3 questions, not including contact form time
    const endTime = quizEndTime || Date.now(); // Use quizEndTime if available
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    // Calculate score
    const answersWithResults = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id] || "",
      isCorrect: selectedAnswers[q.id] === q.correctAnswer,
    }));

    const score = answersWithResults.filter((a) => a.isCorrect).length;

    const submissionData: QuizSubmissionData = {
      userName,
      phoneNumber,
      prizeName,
      answers: answersWithResults,
      score,
      timeTaken,
    };

    onComplete(submissionData);
  };

  if (questions.length === 0) {
    return (
      <div className="QuizChallenge loading">
        <div className="loader"></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (showContactForm) {
    return (
      <div className="QuizChallenge" data-testid="QuizChallenge">
        <div className="quiz-container">
          <div className="quiz-card contact-form">
            <div className="prize-badge">
              <span className="trophy">🎁</span>
              <h2>Great Job! You cracked the {prizeName} challenge</h2>
            </div>

            <h3 className="form-title">Enter Your Contact Details</h3>
            <p className="form-description">
              Winners will be announced at the end of the event. We'll contact
              you if you win!
            </p>

            <div className="form-group">
              <label htmlFor="userName">Full Name *</label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your full name"
                className={errors.userName ? "error" : ""}
              />
              {errors.userName && (
                <span className="error-message">{errors.userName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className={errors.phoneNumber ? "error" : ""}
              />
              {errors.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
            </div>

            <div className="quiz-summary">
              <h4>Your Answers Summary:</h4>
              <p>
                Questions Answered: {Object.keys(selectedAnswers).length} /{" "}
                {questions.length}
              </p>
            </div>

            <button className="submit-button" onClick={handleSubmit}>
              Submit & Complete
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="QuizChallenge" data-testid="QuizChallenge">
      <div className="quiz-container">
        <div className="quiz-card">
          <div className="quiz-header">
            <div className="prize-info">
              <span className="trophy">🏆</span>
              <span className="prize-text">
                Category: <strong>{prizeName}</strong>
              </span>
            </div>
            <div className="timer-display">
              <span className={`timer ${timeRemaining <= 10 ? "warning" : ""}`}>
                ⏱️ {timeRemaining}s
              </span>
            </div>
            <div className="question-counter">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="question-section">
            <h2 className="question-text">{currentQuestion.question}</h2>

            <div className="options-grid">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={`${currentQuestion.id}-${option}`}
                  className={`option-button ${
                    selectedAnswers[currentQuestion.id] === option
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                >
                  <span className="option-letter">
                    {String.fromCodePoint(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            <button
              className="nav-button prev"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>
            <button
              className="nav-button next"
              onClick={handleNext}
              disabled={!isAnswered}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish →"
                : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizChallenge;
