import { ContainerProps } from "@/types";
import React from "react";

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <main className='flex justify-center items-center'>
      <section className='w-full max-w-[530px]'>{children}</section>
    </main>
  );
};

export default Container;
