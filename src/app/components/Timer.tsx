import { TimerProps } from "@/types";
import { secondsToFormattedTime } from "@/utils";
import React from "react";

const Timer: React.FC<TimerProps> = ({ onCountDownChange, time, isActive }) => {
  const convertToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const times = secondsToFormattedTime(convertToSeconds(e.target.value));
    onCountDownChange(times);
  };

  return (
    <div className='flex flex-col items-center justify-center p-2 space-y-4'>
      <input
        type='time'
        step='1'
        className='font-raleway font-bold text-2xl'
        value={time}
        onChange={onTimeChange}
        disabled={isActive}
      />
    </div>
  );
};

export default Timer;
