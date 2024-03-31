"use client";
import React, { useMemo } from "react";

interface CircularProgressBarProps {
  size: number;
  strokeWidth: number;
  progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size,
  strokeWidth,
  progress,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  // Translate the input progress so that 100% fills the arc from 225 to 315 degrees.
  // This means spreading the actual visible progress over 75% of the circle, as 90 degrees out of 360 is 1/4 of the circle.
  // But since we're starting at 225 degrees and want to end at 315 degrees visually, we adjust the progress range.
  const visibleProgress = progress * 0.75; // Adjust the progress to the visible arc

  // Stroke offset to create the progress effect
  const strokeDashoffset =
    circumference - (visibleProgress / 100) * circumference;

  // Calculate the position of the progress dot
  const startingAngleRad = (5 * Math.PI) / 4; // Starting at 225 degrees
  const adjustedProgress = (2 * Math.PI * visibleProgress) / 100; // Adjust the progress to the circle's circumference
  const progressDotAngle = startingAngleRad + adjustedProgress - Math.PI / 2;
  const dotX = center + radius * Math.cos(progressDotAngle);
  const dotY = center + radius * Math.sin(progressDotAngle);

  const [firstStopColor, secondStopColor] = useMemo(() => {
    if (progress < 100) {
      return ["#FF6B00", "#FFCB8D"];
    } else if (progress === 100) {
      return ["#52D13D", "#89C36D"];
    } else {
      return ["#9294eb", "#6f70dd"];
    }
  }, [progress]);

  return (
    <div className='relative flex items-center justify-center'>
      <svg width={size} height={size}>
        <defs>
          <linearGradient
            id='progressGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
          >
            <stop
              offset='0%'
              style={{ stopColor: firstStopColor, stopOpacity: 1 }}
            />
            <stop
              offset='100%'
              style={{ stopColor: secondStopColor, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='transparent'
          stroke='#e5e7eb'
          strokeWidth={strokeWidth}
        />
        {/* Foreground Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='transparent'
          stroke='url(#progressGradient)'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          transform={`rotate(-225 ${center} ${center})`} // Adjust rotation to start from 225 degrees
        />
        {/* Progress Dot */}
        <circle
          cx={dotX}
          cy={dotY}
          r={strokeWidth / 4}
          fill='#fff'
          stroke='#fff'
          strokeWidth='2'
          style={{ transition: "cx 0.1s, cy 0.1s" }}
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
