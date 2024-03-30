"use client";
import Link from "next/link";
import Card from "../components/Card";
import FastingTracker from "../components/FastingTracker";
import { useFastingContext } from "@/context";
import { prettyFormatDate, removeSeconds } from "@/utils";

export default function Home() {
  const { FastingState } = useFastingContext();

  const { fastingHistories } = FastingState;

  return (
    <div className='flex flex-col items-center justify-between p-24 space-y-16 w-fit'>
      <article>
        <Card title='Ready to Fasting'>
          <FastingTracker />
        </Card>
      </article>

      <article className='flex w-full'>
        <Card>
          <span role='img' aria-label='Sand Glass'>
            ⌛️
          </span>
          <span>48</span>
          <span>Total Hours</span>
        </Card>
        <Card>
          <span role='img' aria-label='confetti'>
            🎉
          </span>
          <span>6</span>
          <span>Total Completed Fasting</span>
        </Card>
      </article>

      <article className='w-full'>
        <div className='flex justify-between items-center'>
          <h5 className='font-bold'>My Latest Feedings</h5>
          <Link href='/history' passHref>
            <button
              type='button'
              className='text-[#834CC9] bg-transparent hover:bg-purple-200 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              aria-label='View all fasting sessions'
            >
              View All
            </button>
          </Link>
        </div>
        <div>
          {fastingHistories.map(
            ({ duration, endTime, startTime, createdAt }) => (
              <Card key={createdAt}>
                <div className='flex justify-between'>
                  <div className='text-[#6567D9]'>
                    <span className='text-3xl capitalize'>{duration}</span>
                    <span>{prettyFormatDate(createdAt)}</span>

                    <span>
                      {removeSeconds(startTime)} - {removeSeconds(endTime)}
                    </span>
                  </div>
                  <button>more</button>
                </div>
              </Card>
            )
          )}
        </div>
      </article>
    </div>
  );
}
