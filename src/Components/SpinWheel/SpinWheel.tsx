import React, { FC, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./SpinWheel.scss";

interface Prize {
  id: number;
  label: string;
  color: string;
  textColor?: string;
}

interface SpinWheelProps {
  prizes?: Prize[];
  onSpinComplete?: (prize: Prize) => void;
}

const defaultPrizes: Prize[] = [
  { id: 1, label: "Technology", color: "#FF3366", textColor: "#FFFFFF" },
  { id: 2, label: "Business", color: "#00D4FF", textColor: "#FFFFFF" },
  { id: 3, label: "General", color: "#FFD700", textColor: "#000000" },
  { id: 4, label: "Entertain", color: "#9C27B0", textColor: "#FFFFFF" },
  { id: 5, label: "Lifestyle", color: "#E91E63", textColor: "#FFFFFF" },
  { id: 6, label: "Fun", color: "#FF9800", textColor: "#FFFFFF" },
  {
    id: 7,
    label: "AI",
    color: "#2196F3",
    textColor: "#FFFFFF",
  },
  { id: 8, label: "Cricket", color: "#4CAF50", textColor: "#FFFFFF" },
];

const SpinWheel: FC<SpinWheelProps> = ({
  prizes = defaultPrizes,
  onSpinComplete,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Immediately redirect to quiz page when countdown reaches 0
      if (selectedPrize && onSpinComplete) {
        onSpinComplete(selectedPrize);
      }
    }
  }, [countdown, selectedPrize, onSpinComplete]);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setHasSpun(true);
    setSelectedPrize(null);
    setCountdown(null);

    const randomSpins = Math.floor(Math.random() * 6) + 5;
    const segmentAngle = 360 / prizes.length;
    const randomSegment = Math.floor(Math.random() * prizes.length);
    const extraRotation = randomSegment * segmentAngle + segmentAngle / 2;
    const totalRotation = rotation + randomSpins * 360 + extraRotation;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const winningIndex =
        Math.floor((360 - normalizedRotation) / segmentAngle) % prizes.length;
      const prize = prizes[winningIndex];

      setSelectedPrize(prize);
      setIsSpinning(false);
      setCountdown(3); // Start 3-second countdown

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
    }, 5000);
  };

  const segmentAngle = 360 / prizes.length;

  return (
    <div className="SpinWheel" data-testid="SpinWheel">
      <div className="spin-wheel-container">
        <div className="wheel-header">
          <h1 className="wheel-title">Spin Wheel</h1>
          <div className="wheel-icon">🏆</div>
        </div>

        <div className="wheel-wrapper">
          {/* Arrow Pointer */}
          <div className="wheel-pointer">
            <svg width="40" height="50" viewBox="0 0 40 50">
              <polygon
                points="20,50 0,0 40,0"
                fill="#FFC107"
                stroke="#fff"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* The Wheel Container */}
          <div className="wheel-container">
            <svg className="wheel-svg" viewBox="0 0 400 400">
              {/* Dark blue outer ring */}
              <circle cx="200" cy="200" r="195" fill="#1e3a5f" />

              {/* Inner white circle border */}
              <circle
                cx="200"
                cy="200"
                r="182"
                fill="none"
                stroke="#fff"
                strokeWidth="4"
              />

              {/* White dots around the outer ring */}
              {Array.from({ length: 12 }, (_, i) => {
                const dotAngle = (((i * 360) / 12) * Math.PI) / 180;
                const dotRadius = 188;
                const dotX = 200 + dotRadius * Math.cos(dotAngle - Math.PI / 2);
                const dotY = 200 + dotRadius * Math.sin(dotAngle - Math.PI / 2);
                return (
                  <circle
                    key={`dot-${dotAngle}-${dotX}`}
                    cx={dotX}
                    cy={dotY}
                    r="6"
                    fill="#fff"
                  />
                );
              })}

              {/* Rotating group */}
              <g
                className={`wheel-segments ${isSpinning ? "spinning" : ""}`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: "200px 200px",
                }}
              >
                {prizes.map((prize, index) => {
                  const angle = segmentAngle;
                  const startAngle = index * angle - 90;
                  const endAngle = startAngle + angle;

                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;

                  const innerRadius = 60;
                  const outerRadius = 180;

                  const x1 = 200 + innerRadius * Math.cos(startRad);
                  const y1 = 200 + innerRadius * Math.sin(startRad);
                  const x2 = 200 + outerRadius * Math.cos(startRad);
                  const y2 = 200 + outerRadius * Math.sin(startRad);
                  const x3 = 200 + outerRadius * Math.cos(endRad);
                  const y3 = 200 + outerRadius * Math.sin(endRad);
                  const x4 = 200 + innerRadius * Math.cos(endRad);
                  const y4 = 200 + innerRadius * Math.sin(endRad);

                  const largeArc = angle > 180 ? 1 : 0;

                  const pathData = `
                    M ${x1} ${y1}
                    L ${x2} ${y2}
                    A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3}
                    L ${x4} ${y4}
                    A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}
                  `;

                  // Calculate text position
                  const textAngle = startAngle + angle / 2;
                  const textRad = (textAngle * Math.PI) / 180;
                  const textRadius = 120;
                  const textX = 200 + textRadius * Math.cos(textRad);
                  const textY = 200 + textRadius * Math.sin(textRad);

                  return (
                    <g key={prize.id}>
                      <path
                        d={pathData}
                        fill={prize.color}
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill={prize.textColor || "#1A1A2E"}
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${
                          textAngle + 90
                        } ${textX} ${textY})`}
                      >
                        {prize.label}
                      </text>
                    </g>
                  );
                })}
              </g>

              <circle
                cx="200"
                cy="200"
                r="58"
                fill="#fff"
                stroke="#0a1f44"
                strokeWidth="4"
              />
              <image
                href="https://stagegamificationui.blob.core.windows.net/sandbox-assets/rewad-rally-fav.png"
                x="160"
                y="160"
                width="80"
                height="80"
              />
            </svg>
          </div>

          {/* Spin Button - Hide after first click */}
          {!hasSpun && (
            <button
              className={`spin-button ${isSpinning ? "disabled" : ""}`}
              onClick={spinWheel}
              disabled={isSpinning}
            >
              {isSpinning ? "Spinning..." : "Play Now!"}
            </button>
          )}
        </div>

        {/* Show both result and countdown together */}
        {selectedPrize && !isSpinning && countdown !== null && (
          <div className="results-wrapper">
            <div className="result-container">
              {countdown > 0 ? (
                <h2 className="result-title">00:0{countdown}</h2>
              ) : (
                <h2 className="result-title">
                  🎉 Get Ready<span className="loading-dots"></span> 🎉
                </h2>
              )}
              <div
                className="result-prize"
                style={{
                  backgroundColor: selectedPrize.color,
                  color: selectedPrize.textColor || "#FFFFFF",
                }}
              >
                Category Unlocked: <strong>{selectedPrize.label}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
