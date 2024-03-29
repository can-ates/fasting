"use client";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <div className='max-w-md mx-auto rounded-lg p-14 bg-white shadow-md'>
      {title && (
        <h1 className='text-2xl font-bold text-center mb-2'>{title}</h1>
      )}
      {subtitle && <p className='text-base text-center mb-4'>{subtitle}</p>}
      {children}
    </div>
  );
};

export default Card;
