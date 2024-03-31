import React, { useMemo } from "react";
import { InfoCardsProps } from "@/types";

import Card from "./Card";

const InfoCards: React.FC<InfoCardsProps> = ({ histories }) => {
  const totalHours = useMemo(
    () =>
      histories.reduce((acc, curr) => {
        return acc + curr.duration;
      }, 0),
    [histories]
  );

  const fastingInfo = [
    {
      id: "sand glass",
      text: "Total Hours",
      icon: "⌛️",
      value: Math.floor(totalHours / 3600),
    },
    {
      id: "confetti",
      text: "Total Completed Fasting",
      icon: "🎉",
      value: histories.length,
    },
  ].map(({ id, text, icon, value }) => (
    <Card key={id}>
      <div className='flex flex-col items-center justify-center w-full py-6 px-4'>
        <span className='text-2xl mb-2' role='img' aria-label={id}>
          {icon}
        </span>
        <span className='font-bold text-2xl'>{value}</span>
        <span className='text-[#696C74]'>{text}</span>
      </div>
    </Card>
  ));
  return <>{fastingInfo}</>;
};

export default InfoCards;
