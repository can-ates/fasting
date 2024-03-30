import React from "react";

const CountdownTimer: React.FC = ({ onCountDownChange, fastingTime }) => {
  const convertToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return {
      hours,
      minutes,
      seconds,
      prettyFormat: `${hours}:${minutes}:${seconds}`,
    };
  };

  const onTimeChange = (e) => {
    const times = formatTime(convertToSeconds(e.target.value));
    onCountDownChange(times);
  };

  return (
    <div className='flex flex-col items-center justify-center p-4 space-y-4'>
      <input
        type='time'
        step='1'
        className='w-full'
        value={fastingTime}
        onChange={onTimeChange}
      />
    </div>
  );
};

export default CountdownTimer;
