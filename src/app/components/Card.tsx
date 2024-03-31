"use client";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <div className='w-full flex-grow rounded-lg bg-white shadow-md'>
      {title && (
        <h1 className='text-2xl font-bold text-center mb-2 pt-12'>{title}</h1>
      )}
      {subtitle && <p className='text-base text-center mb-'>{subtitle}</p>}
      {children}
    </div>
  );
};

export default Card;
