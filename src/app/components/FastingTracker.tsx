"use client";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Timer from "./Timer";
import CircularProgressBar from "./CircularProgress";
import { useFastingContext } from "@/context";
import { saveFasting } from "@/actions";
import {
  calculateEndTime,
  convertToSeconds,
  formatDuration,
  formatTime,
  getLocalTime,
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
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState<number>(100);

  const { dispatchFastingAction } = useFastingContext();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && fastingDuration > 0) {
      interval = setInterval(() => {
        setFastingDuration((time) => time - 1);
      }, 1000);
    }

    if (fastingDuration === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, fastingDuration]);

  // Update progress over time
  useEffect(() => {
    if (isActive) {
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
  }, [startTime, fastingDuration, isActive, endTime]);

  useEffect(() => {
    if (!isActive) {
      setEndTime(calculateEndTime(startTime, fastingDuration));
    } else {
      setFastingTime(formatTime(new Date(fastingDuration * 1000), false));
    }
  }, [startTime, fastingDuration, isActive]);

  const resetFasting = () => {
    setStartTime(new Date());
    setProgress(100);
    setFastingDuration(initialFastingDuration);
    setIsActive(false);
    setFastingTime(formatTime(new Date(initialFastingDuration * 1000), false));
  };

  const handleFastingState = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
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
        duration: formatDuration(durationInSeconds),
        startTime: formatTime(startTime),
        endTime: formatTime(endTime, false),
        createdAt: new Date(Date.now()).toLocaleString(),
      });
      resetFasting();
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = new Date();
    newStartTime.setHours(parseInt(e.target.value.substr(0, 2)));
    newStartTime.setMinutes(parseInt(e.target.value.substr(3, 2)));
    newStartTime.setSeconds(0);
    setStartTime(newStartTime);
  };

  const handleDurationChange = (time: string) => {
    const newDuration = convertToSeconds(time);
    setFastingDuration(newDuration);
    console.log(newDuration, time);
    const fastTime = formatTime(new Date(newDuration * 1000), false);
    console.log(fastTime, new Date(newDuration * 1000));
    setFastingTime(fastTime);
  };

  const onCountDownChange = ({ prettyFormat }) => {
    console.log(prettyFormat);
    handleDurationChange(prettyFormat);
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <div className='relative'>
        <CircularProgressBar size={300} strokeWidth={30} progress={progress} />
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
          <div className='text-center'>
            <div className='text-lg font-semibold'>
              {isActive ? (
                <span>Elapsed Time %{progress.toFixed(1)}</span>
              ) : (
                <span>Set Fasting Time</span>
              )}
            </div>
            <Timer
              fastingTime={fastingTime}
              onCountDownChange={onCountDownChange}
            />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <label
          htmlFor='start-time'
          className='block text-sm font-medium text-gray-700'
        >
          Start To:
        </label>
        <input
          id='start-time'
          type='time'
          step='60'
          value={formatTime(startTime)}
          onChange={handleStartTimeChange}
          className='mt-1'
          disabled={isActive}
        />
      </div>
      <div className='flex justify-between w-full mt-4'>
        <label
          htmlFor='start-time'
          className='block text-sm font-medium text-gray-700'
        >
          End To:
        </label>
        <input
          id='start-time'
          type='time'
          step='60'
          disabled
          value={formatTime(endTime, false)}
        />
      </div>
      <button
        type='button'
        className='px-4 py-2 mt-4 text-white bg-blue-600 rounded'
        onClick={handleFastingState}
      >
        {isActive ? "End Fasting" : "Start Fasting"}
      </button>
    </div>
  );
};

export default FastingTracker;
