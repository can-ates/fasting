"use client";
import React, { useState, useEffect, useMemo } from "react";
import Confetti from "react-confetti";

import Timer from "./Timer";
import CircularProgressBar from "./CircularProgress";
import { useFastingContext } from "@/context";
import { saveFasting } from "@/actions";
import {
  calculateEndTime,
  convertToSeconds,
  formatTime,
  removeSeconds,
  secondsToFormattedTime,
} from "@/utils";

const FastingTracker: React.FC = () => {
  const initialFastingDuration = 8 * 60 * 60; // 8 hours in seconds
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(
    calculateEndTime(startTime, initialFastingDuration)
  );
  const [fastingDuration, setFastingDuration] = useState<number>(
    initialFastingDuration
  );
  const [fastingTime, setFastingTime] = useState<string>(
    formatTime(new Date(fastingDuration * 1000), false)
  );
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState<number>(101);

  const { dispatchFastingAction } = useFastingContext();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status === "started" && fastingDuration > 0) {
      interval = setInterval(() => {
        setFastingDuration((time) => time - 1);
        setTimeElapsed((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    if (fastingDuration === 0 && status === "started") {
      setStatus("completed");
      setTimeElapsed(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, fastingDuration]);

  // Update progress over time
  useEffect(() => {
    if (status === "started") {
      const now = new Date();
      const startTimestamp = startTime.getTime();
      const endTimestamp = endTime.getTime();
      const nowTimestamp = now.getTime();

      if (nowTimestamp < startTimestamp) {
        setProgress(0);
      } else if (nowTimestamp > endTimestamp) {
        setProgress(100);
      } else {
        // Calculate the progress percentage
        const totalDuration = endTimestamp - startTimestamp;
        const elapsed = nowTimestamp - startTimestamp;
        const progress = (elapsed / totalDuration) * 100;
        setProgress(progress);
      }
    }
  }, [startTime, fastingDuration, status, endTime]);

  useEffect(() => {
    if (status === "idle") {
      setEndTime(calculateEndTime(startTime, fastingDuration));
    } else if (status === "started") {
      const elapsedTime = secondsToFormattedTime(timeElapsed);
      setFastingTime(elapsedTime);
    } else {
      recordFasting();
    }
  }, [startTime, fastingDuration, status, timeElapsed]);

  const [header, elapsed, start, end, ctaText] = useMemo(() => {
    if (status === "completed") {
      return [
        "Fasting is completed!",
        "Total Time",
        "Started",
        "Ended",
        "Start New Fasting Session",
      ];
    } else if (status === "started") {
      return [
        "You are fasting",
        `Elapsed Time (%${progress.toFixed(1)})`,
        "Started",
        "End",
        "End Fasting",
      ];
    }

    return [
      "Ready to Fasting",
      "Set Fasting Time",
      "Start to",
      "End to",
      "Start Fasting",
    ];
  }, [status, progress]);

  const resetFasting = () => {
    setStartTime(new Date());
    setProgress(101);
    setFastingDuration(initialFastingDuration);
    setStatus("idle");
    setFastingTime(formatTime(new Date(initialFastingDuration * 1000), false));
  };

  const recordFasting = () => {
    const startTimeInSeconds = convertToSeconds(formatTime(startTime));
    const currentTimeInSeconds = convertToSeconds(
      formatTime(new Date(Date.now()))
    );

    let durationInSeconds = currentTimeInSeconds - startTimeInSeconds;

    // If the duration is negative, we assume that the current time is for the next day
    if (durationInSeconds < 0) {
      durationInSeconds += 24 * 3600;
    }

    saveFasting(dispatchFastingAction, {
      duration: durationInSeconds,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      createdAt: new Date(Date.now()).toISOString(),
    });
  };

  const handleFastingState = () => {
    if (status === "idle") {
      const newDate = new Date();
      setStartTime(newDate);
      setEndTime(calculateEndTime(newDate, fastingDuration));
      setStatus("started");
    } else if (status === "started") {
      recordFasting();
      resetFasting();
    } else {
      resetFasting();
    }
  };

  const handleDurationChange = (time: string) => {
    const newDuration = convertToSeconds(time);
    setFastingDuration(newDuration);
    const fastTime = formatTime(new Date(newDuration * 1000), false);
    setFastingTime(fastTime);
  };

  const onCountDownChange = (prettyFormat: string) => {
    handleDurationChange(prettyFormat);
  };

  return (
    <div className='flex flex-col items-center justify-center px-20 py-6 pt-12 space-y-6 w-full'>
      <div className='relative'>
        <h3 className='text-2xl font-bold text-center mb-4'>{header}</h3>
        <CircularProgressBar size={300} strokeWidth={30} progress={progress} />
        <div className='absolute top-4 left-0 flex items-center justify-center w-full h-full'>
          <div className='text-center'>
            <div className='font-raleway text-[#575757]'>
              <span>{elapsed}</span>
            </div>
            <Timer
              isActive={status !== "idle"}
              time={fastingTime}
              onCountDownChange={onCountDownChange}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-evenly w-full'>
        <div className='flex flex-col items-center'>
          <label htmlFor='start-time' className='text-sm text-[#9695A8]'>
            {start}
          </label>
          <input
            id='start-time'
            type='time'
            value={removeSeconds(formatTime(startTime))}
            disabled
            className='text-[#6567D9] font-bold'
          />
        </div>
        <div className='flex flex-col items-center'>
          <label htmlFor='end-time' className='text-sm text-[#9695A8]'>
            {end}
          </label>
          <input
            id='end-time'
            type='time'
            disabled
            value={removeSeconds(formatTime(endTime))}
            className='text-[#6567D9] font-bold'
          />
        </div>
      </div>
      <button
        type='button'
        className='mb-8 bg-[#002548] text-white w-full p-4 rounded-[24px] hover:bg-blue-700 transition duration-300'
        onClick={handleFastingState}
      >
        {ctaText}
      </button>
      {status === "completed" && (
        <Confetti
          initialVelocityX={3.6}
          initialVelocityY={9.8}
          numberOfPieces={25}
          gravity={0.04}
          confettiSource={{
            w: 10,
            h: 10,
            x: 500 / 2,
            y: 530 / 2,
          }}
          width={500}
          height={530}
        />
      )}
    </div>
  );
};

export default FastingTracker;
