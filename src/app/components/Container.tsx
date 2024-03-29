import { ContainerProps } from "@/types";
import React from "react";

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <main className='flex justify-center items-center min-h-screen'>
      <section className='w-full max-w-[530px] p-4 bg-white shadow-md rounded-lg'>
        {children}
      </section>
    </main>
  );
};

export default Container;
