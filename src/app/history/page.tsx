"use client";
import React from "react";
import Link from "next/link";
import { useFastingContext } from "@/context";

import History from "../components/History";
import InfoCards from "../components/InfoCards";

const HistoryPage = () => {
  const { FastingState } = useFastingContext();

  const { fastingHistories } = FastingState;

  return (
    <div className='space-y-10 flex flex-col justify-center'>
      <Link href='/home' legacyBehavior>
        <a
          className='text-[#834CC9] mt-10 bg-transparent text-sm px-5 py-2.5 text-center'
          aria-label='Go Home'
        >
          Go Home
        </a>
      </Link>
      <article className='flex w-full justify-between space-x-6'>
        <InfoCards histories={fastingHistories} />
      </article>
      <article>
        <div className='flex justify-between items-center mb-4'>
          <h4 className='font-bold text-2xl '>My Fasting Sessions</h4>
        </div>
        <History histories={fastingHistories} />
      </article>
    </div>
  );
};

export default HistoryPage;
