import React, { FC, useState } from "react";
import confetti from "canvas-confetti";
import SpinWheel from "../SpinWheel/SpinWheel";
import QuizChallenge, {
  QuizSubmissionData,
} from "../QuizChallenge/QuizChallenge";
import "./RewardChallenge.scss";

interface Prize {
  id: number;
  label: string;
  color: string;
  textColor?: string;
}

interface RewardChallengeProps {}

const RewardChallenge: FC<RewardChallengeProps> = () => {
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  const handleFollowClick = () => {
    setButtonClicked(true);
    window.open(
      "https://www.linkedin.com/showcase/reward-rally/posts/?feedView=all",
      "_blank"
    );
    setTimeout(() => {
      setShowSpinWheel(true);
    }, 5000);
  };

  const handleSpinComplete = (prize: Prize) => {
    console.log("Won:", prize.label);
    setWonPrize(prize);
    setTimeout(() => {
      setShowQuiz(true);
    }, 2000);
  };

  const handleQuizComplete = async (data: QuizSubmissionData) => {
    try {
      const tableUrl =
        "https://rewardrallyhrms.table.core.windows.net/techxconfrewardchallange?sv=2019-02-02&spr=https&st=2025-10-29T12%3A05%3A17Z&se=2026-12-30T12%3A05%3A00Z&sp=raud&sig=HLpqV6nNYxMchg6i66%2BZPr1DpmGFC3S3h2RYb2ZNssk%3D&tn=techxconfrewardchallange";

      const entity = {
        PartitionKey: "QuizChallenge",
        RowKey: Date.now().toString(),
        PrizeName: data.prizeName || wonPrize?.label || "N/A",
        UserName: data.userName || "Anonymous",
        PhoneNumber: data.phoneNumber || "N/A",
        Score: data.score.toString(),
        TotalQuestions: data.answers.length.toString(),
        TimeTaken: data.timeTaken.toString(), // Store time taken in seconds
        AnswersJSON: JSON.stringify(data.answers),
        SubmittedAt: new Date().toISOString(),
      };

      const response = await fetch(tableUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;odata=nometadata",
          "x-ms-date": new Date().toUTCString(),
          "x-ms-version": "2019-02-02",
        },
        body: JSON.stringify(entity),
      });

      if (response.ok) {
        setQuizCompleted(true);

        // Trigger confetti on successful submission
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: [
            "#FF3366",
            "#00D4FF",
            "#FFD700",
            "#9C27B0",
            "#E91E63",
            "#FF9800",
            "#2196F3",
            "#4CAF50",
          ],
        });
      }
    } catch (error) {
      console.error("Error saving quiz data to Azure:", error);
    }
  };

  const handleTimeUp = () => {
    setTimeExpired(true);
    setShowQuiz(false);
  };

  if (showQuiz && wonPrize && !quizCompleted) {
    return (
      <QuizChallenge
        prizeName={wonPrize.label}
        onComplete={handleQuizComplete}
        onTimeUp={handleTimeUp}
      />
    );
  }

  if (timeExpired) {
    return (
      <div className="RewardChallenge completion-screen">
        <div className="challenge-container">
          <div className="challenge-card completion-card time-expired">
            <div className="time-icon">⏰</div>
            <h1 className="completion-title">Time's Up!</h1>
            <p className="completion-description">
              You ran out of time to complete the quiz challenge.
            </p>
            <div className="completion-info">
              <p>Don't worry! You can try again.</p>
              <p>Follow us on LinkedIn for more chances to win prizes!</p>
            </div>
            <button
              className="retry-button"
              onClick={() => {
                setTimeExpired(false);
                setShowQuiz(false);
                setShowSpinWheel(false);
                setButtonClicked(false);
                setWonPrize(null);
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="RewardChallenge completion-screen">
        <div className="challenge-container">
          <div className="challenge-card completion-card">
            {/* <div className="completion-icon"> */}
            <img
              src="../../../assets/images/gift.svg"
              alt="Image 1"
              className="gift-image"
            />
            {/* </div> */}
            <h1 className="completion-title">Thank You!</h1>
            <p className="completion-description">
              Your submission has been recorded successfully!
            </p>
            <div className="completion-info">
              <p>
                Winners will be announced at the{" "}
                <strong>end of the event.</strong>
              </p>
            </div>
            <div className="social-message">
              <p>Stay connected with us on LinkedIn for updates! </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showSpinWheel) {
    return <SpinWheel onSpinComplete={handleSpinComplete} />;
  }

  return (
    <div className="RewardChallenge">
      <div className="challenge-container">
        <div className="challenge-card">
          <div className="circular-image-container">
            <img
              src="../../../assets/images/gift-image.png"
              alt="Reward Challenge"
              className="circular-image"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const placeholder = document.createElement("div");
                placeholder.className = "image-placeholder";
                placeholder.textContent = "🎁";
                e.currentTarget.parentNode?.appendChild(placeholder);
              }}
            />
          </div>

          <div className="trophy-icon"></div>
          <h1 className="challenge-title">Unlock Your Reward!</h1>
          <p className="challenge-description">
            Follow our LinkedIn page <strong>Reward Rally</strong> to spin the
            wheel and win exciting prizes!
          </p>

          <div className="linkedin-logo">
            <img src="https://www.rewardrally.in/assets/favicon.svg" alt="" />
          </div>
          <button
            className={`follow-button ${buttonClicked ? "clicked" : ""}`}
            onClick={handleFollowClick}
            disabled={buttonClicked}
          >
            {buttonClicked ? (
              <>
                <span className="spinner"> </span> Preparing Your Spin...
              </>
            ) : (
              <>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Follow Reward Rally
              </>
            )}
          </button>
          {buttonClicked && (
            <p className="waiting-message">
              Thank you! Your spin wheel will appear in a few seconds...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardChallenge;
