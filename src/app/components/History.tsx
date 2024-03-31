"use client";
import { formatDuration, prettyFormatDate, removeSeconds } from "@/utils";
import Card from "./Card";

import { HistoryProps } from "@/types";
import { useFastingContext } from "@/context";
import { deleteFasting } from "@/actions";
import DropdownMenu from "./DropDownMenu";
import Image from "next/image";

import Trash from "../../assets/trash.svg";

const History: React.FC<HistoryProps> = ({ histories }) => {
  const { dispatchFastingAction } = useFastingContext();

  const deleteFastingSession = (createdDate: string) => {
    deleteFasting(dispatchFastingAction, createdDate);
  };

  return (
    <div className='space-y-6'>
      {histories.map(({ duration, endTime, startTime, createdAt }) => (
        <Card key={createdAt}>
          <div className='relative flex w-full items-center justify-between p-6'>
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
            <DropdownMenu>
              <button
                onClick={() => deleteFastingSession(createdAt)}
                className='flex items-center w-full p-2 text-sm '
                role='menuitem'
              >
                <Image src={Trash} height={20} width={20} alt='menu' />
                <span className='ml-2'>Delete Fasting Session</span>
              </button>
            </DropdownMenu>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default History;
