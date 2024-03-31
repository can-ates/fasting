"use client";
import { useMemo } from "react";
import Link from "next/link";
import Card from "../components/Card";
import FastingTracker from "../components/FastingTracker";
import { useFastingContext } from "@/context";
import { formatDuration, prettyFormatDate, removeSeconds } from "@/utils";

import ThreeDot from "../../assets/threedot.svg";
import Image from "next/image";

export default function Home() {
  const { FastingState } = useFastingContext();

  const { fastingHistories, user } = FastingState;

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
        <div className='flex justify-between items-center'>
          <h5 className='font-bold'>My Latest Feedings</h5>
          <Link href='/history' passHref>
            <button
              type='button'
              className='text-[#834CC9] bg-transparent hover:bg-purple-200 text-sm px-5 py-2.5 text-center'
              aria-label='View all fasting sessions'
            >
              View All
            </button>
          </Link>
        </div>
        <div>
          <div className='space-y-6'>
            {fastingHistories.map(
              ({ duration, endTime, startTime, createdAt }) => (
                <Card key={createdAt}>
                  <div className='flex w-full justify-between p-6'>
                    <div className='text-[#6567D9]'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-3xl font-bold capitalize'>
                          {formatDuration(duration)}
                        </span>
                        <span className='ml-4 uppercase bg-[#D2CDFF] text-xs text-[#9F70DA] rounded-md p-2'>
                          {prettyFormatDate(createdAt)}
                        </span>
                      </div>
                      <span className='text-[#8F939A]'>
                        {removeSeconds(startTime)} - {removeSeconds(endTime)}
                      </span>
                    </div>
                    <button
                      onClick={() => {}}
                      className='relative flex flex-col justify-around items-center bg-transparent '
                      aria-label='menu'
                    >
                      <Image src={ThreeDot} height={20} width={20} alt='menu' />
                    </button>
                  </div>
                </Card>
              )
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
