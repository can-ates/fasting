"use client";
import { formatDuration, prettyFormatDate, removeSeconds } from "@/utils";
import React, { useState } from "react";
import Card from "./Card";
import Image from "next/image";

import ThreeDot from "../../assets/threedot.svg";
import Trash from "../../assets/trash.svg";
import { HistoryProps } from "@/types";
import { useFastingContext } from "@/context";
import { deleteFasting } from "@/actions";

const History: React.FC<HistoryProps> = ({ histories }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const { dispatchFastingAction } = useFastingContext();

  const deleteFastingSession = (createdDate: string) => {
    deleteFasting(dispatchFastingAction, createdDate);
  };

  const onClickDot = () => {
    setShowMoreMenu((prev) => !prev);
  };

  return (
    <div className='space-y-6'>
      {histories.map(({ duration, endTime, startTime, createdAt }) => (
        <Card key={createdAt}>
          <div className='relative flex w-full justify-between p-6'>
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
              onClick={onClickDot}
              className='relative flex flex-col justify-around items-center bg-transparent '
              aria-label='menu'
            >
              <Image src={ThreeDot} height={20} width={20} alt='menu' />
            </button>
            {showMoreMenu && (
              <div
                className='absolute right-5 bottom-0 mt-2  bg-white border border-gray-200 divide-y rounded-md '
                role='menu'
              >
                <div className='py-1' role='none'>
                  <button
                    onClick={() => deleteFastingSession(createdAt)}
                    className='flex items-center w-full p-2 text-sm '
                    role='menuitem'
                  >
                    <Image src={Trash} height={20} width={20} alt='menu' />
                    <span className='ml-2'>Delete Fasting Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default History;
