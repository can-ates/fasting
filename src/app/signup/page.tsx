"use client";
import React from "react";
import Card from "../components/Card";

const SignUp: React.FC = () => {
  const onRegister = () => {};

  return (
    <Card
      title='Create New Profile'
      subtitle='Start Your Fasting Journey'
      ctaElement={
        <button
          onClick={onRegister}
          type='button'
          className='mt-4 bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition duration-300'
        >
          Register
        </button>
      }
    >
      INPUTS WILL BE ADDED
    </Card>
  );
};

export default SignUp;
