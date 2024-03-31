"use client";
import { useMemo } from "react";
import Link from "next/link";
import Card from "../components/Card";
import FastingTracker from "../components/FastingTracker";
import { useFastingContext } from "@/context";

import History from "../components/History";
import { hasDaysPassed } from "@/utils";

export default function Home() {
  const { FastingState } = useFastingContext();

  const { fastingHistories, user } = FastingState;

  const latestHistories = useMemo(
    () =>
      fastingHistories.filter(({ createdAt }) => {
        if (hasDaysPassed(createdAt, 1)) return false;

        return true;
      }),
    [fastingHistories]
  );

  const totalHours = useMemo(
    () =>
      fastingHistories.reduce((acc, curr) => {
        return acc + curr.duration;
      }, 0),
    [fastingHistories]
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
      value: fastingHistories.length,
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

  return (
    <div className='flex flex-col items-center justify-between space-y-12 py-10'>
      <h1>
        Hello <span className='font-bold'>{user.name}</span>
      </h1>
      <article className='w-full relative'>
        <Card>
          <FastingTracker />
        </Card>
      </article>
      <article className='flex w-full justify-between space-x-6'>
        {fastingInfo}
      </article>
      <article className='w-full'>
        <div className='flex justify-between items-center mb-4'>
          <h4 className='font-bold text-2xl '>My Latest Fastings</h4>
          <Link href='/history' legacyBehavior>
            <a
              className='text-[#834CC9] bg-transparent hover:bg-purple-200 text-sm px-5 py-2.5 text-center'
              aria-label='View all fasting sessions'
            >
              View All
            </a>
          </Link>
        </div>
        {latestHistories.length > 0 ? (
          <div>
            <History histories={latestHistories} />
          </div>
        ) : (
          <p className='text-center p-8'>
            You do not have any fasting sessions in 24 hours.
          </p>
        )}
      </article>
    </div>
  );
}
