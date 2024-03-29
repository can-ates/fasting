"use client";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  ctaElement = null,
}) => {
  return (
    <div className='max-w-md mx-auto rounded-lg'>
      {title && (
        <h1 className='text-2xl font-bold text-center mb-2'>{title}</h1>
      )}
      {subtitle && <p className='text-base text-center mb-4'>{subtitle}</p>}
      {children}
      {ctaElement}
    </div>
  );
};

export default Card;
