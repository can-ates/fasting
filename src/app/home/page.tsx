"use client";
import { useMemo } from "react";
import Link from "next/link";
import Card from "../components/Card";
import FastingTracker from "../components/FastingTracker";
import { useFastingContext } from "@/context";

import History from "../components/History";
import { hasDaysPassed } from "@/utils";
import InfoCards from "../components/InfoCards";

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
        <InfoCards histories={fastingHistories} />
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
