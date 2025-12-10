import React, { FC, useState, useEffect } from 'react';
import './QuizAdmin.scss';
import { quizQuestionsByCategory } from '../../Data/quizData';

interface QuizSubmission {
  PartitionKey: string;
  RowKey: string;
  Timestamp: string;
  PrizeName: string;
  UserName: string;
  PhoneNumber: string;
  Score: string;
  TotalQuestions: string;
  AnswersJSON: string;
  SubmittedAt: string;
  TimeTaken: string;
}

interface Answer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

interface QuizAdminProps {}

const QuizAdmin: FC<QuizAdminProps> = () => {
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const tableUrl =
        "https://rewardrallyhrms.table.core.windows.net/techxconfrewardchallange?sv=2019-02-02&spr=https&st=2025-10-29T12%3A05%3A17Z&se=2026-12-30T12%3A05%3A00Z&sp=raud&sig=HLpqV6nNYxMchg6i66%2BZPr1DpmGFC3S3h2RYb2ZNssk%3D&tn=techxconfrewardchallange";

      const response = await fetch(tableUrl, {
        method: "GET",
        headers: {
          Accept: "application/json;odata=nometadata",
          "x-ms-date": new Date().toUTCString(),
          "x-ms-version": "2019-02-02",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubmissions(data.value || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError("Failed to load submissions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const parseAnswers = (answersJSON: string): Answer[] => {
    try {
      return JSON.parse(answersJSON);
    } catch {
      return [];
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.PhoneNumber.includes(searchTerm) ||
      submission.PrizeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Sort by highest score first, then by fastest time
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    const scoreA = Number.parseInt(a.Score);
    const scoreB = Number.parseInt(b.Score);
    
    // First, sort by score (highest first)
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    
    // If scores are equal, sort by time (fastest first)
    const timeA = Number.parseInt(a.TimeTaken || '0');
    const timeB = Number.parseInt(b.TimeTaken || '0');
    return timeA - timeB;
  });

  const calculateStats = () => {
    const total = submissions.length;
    const avgScore = submissions.length > 0
      ? (submissions.reduce((sum, s) => sum + parseInt(s.Score), 0) / submissions.length).toFixed(2)
      : '0';
    const avgTime = submissions.length > 0
      ? (submissions.reduce((sum, s) => sum + parseInt(s.TimeTaken || '0'), 0) / submissions.length).toFixed(1)
      : '0';
    
    return { total, avgScore, avgTime };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="QuizAdmin loading">
        <div className="loader"></div>
        <p>Loading submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="QuizAdmin error">
        <div className="error-card">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={fetchSubmissions} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="QuizAdmin">
      <div className="admin-container">
        <header className="admin-header">
          <h1>📊 Quiz Challenge Admin Panel</h1>
          <div className="header-actions">
            <button 
              onClick={() => setShowAllQuestions(!showAllQuestions)} 
              className={`toggle-questions-button ${showAllQuestions ? 'active' : ''}`}
            >
              {showAllQuestions ? '📋 View Submissions' : '📚 View All Questions'}
            </button>
            <button onClick={fetchSubmissions} className="refresh-button">
              🔄 Refresh Data
            </button>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Total Submissions</h3>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>Average Score</h3>
              <p className="stat-value">{stats.avgScore} / 3</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <h3>Average Time</h3>
              <p className="stat-value">{stats.avgTime}s</p>
            </div>
          </div>
        </div>

        {showAllQuestions ? (
          <div className="all-questions-section">
            <h2 className="section-title">📚 All Quiz Questions & Answers</h2>
            {Object.keys(quizQuestionsByCategory).map((category) => (
              <div key={category} className="category-section">
                <h3 className="category-title">
                  <span className={`category-badge ${category.toLowerCase()}`}>
                    {category}
                  </span>
                  <span className="question-count">
                    {quizQuestionsByCategory[category].length} Questions
                  </span>
                </h3>
                <div className="questions-grid">
                  {quizQuestionsByCategory[category].map((question) => (
                    <div key={question.id} className="question-card">
                      <div className="question-header">
                        <span className="question-id">Q{question.id}</span>
                      </div>
                      <h4 className="question-title">{question.question}</h4>
                      <div className="options-list">
                        {question.options.map((option, idx) => (
                          <div 
                            key={idx} 
                            className={`option-item ${option === question.correctAnswer ? 'correct-answer' : ''}`}
                          >
                            <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                            <span className="option-text">{option}</span>
                            {option === question.correctAnswer && (
                              <span className="correct-indicator">✓ Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="filters-section">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by name, phone, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="submissions-table-container">
              <table className="submissions-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Phone Number</th>
                    <th>Prize Category</th>
                    <th>Score ↓</th>
                    <th>Time Taken ↑</th>
                    <th>Submitted At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="no-data">
                        No submissions found
                      </td>
                    </tr>
                  ) : (
                    sortedSubmissions.map((submission, index) => (
                      <tr key={submission.RowKey}>
                        <td>{index + 1}</td>
                        <td>{submission.UserName}</td>
                        <td>{submission.PhoneNumber}</td>
                        <td>
                          <span className={`prize-badge ${submission.PrizeName.toLowerCase()}`}>
                            {submission.PrizeName}
                          </span>
                        </td>
                        <td>
                          <span className="score-badge">
                            {submission.Score} / {submission.TotalQuestions}
                          </span>
                        </td>
                        <td>{submission.TimeTaken}s</td>
                        <td>{formatDate(submission.SubmittedAt)}</td>
                        <td>
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="view-details-button"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {selectedSubmission && (
        <div className="modal-overlay" onClick={() => setSelectedSubmission(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedSubmission(null)}
            >
              ✕
            </button>
            <h2>Submission Details</h2>
            
            <div className="detail-section">
              <h3>User Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Name:</label>
                  <span>{selectedSubmission.UserName}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{selectedSubmission.PhoneNumber}</span>
                </div>
                <div className="detail-item">
                  <label>Prize Category:</label>
                  <span className={`prize-badge ${selectedSubmission.PrizeName.toLowerCase()}`}>
                    {selectedSubmission.PrizeName}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Submitted At:</label>
                  <span>{formatDate(selectedSubmission.SubmittedAt)}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Quiz Performance</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Score:</label>
                  <span className="score-badge">
                    {selectedSubmission.Score} / {selectedSubmission.TotalQuestions}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Time Taken:</label>
                  <span>{selectedSubmission.TimeTaken} seconds</span>
                </div>
                <div className="detail-item">
                  <label>Percentage:</label>
                  <span>
                    {((parseInt(selectedSubmission.Score) / parseInt(selectedSubmission.TotalQuestions)) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Answers</h3>
              <div className="answers-list">
                {parseAnswers(selectedSubmission.AnswersJSON).map((answer, idx) => (
                  <div key={idx} className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="answer-header">
                      <span className="question-number">Question {idx + 1}</span>
                      <span className={`answer-status ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                        {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <div className="answer-content">
                      <label>Selected Answer:</label>
                      <span>{answer.selectedAnswer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAdmin;
