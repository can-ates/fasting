"use client";
import React, { useState } from "react";
import Card from "../components/Card";
import TextInput from "../components/TextInput";

interface FormData {
  name: string;
  email: string;
  password: string;
}

type ElementsData = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
};

const formElements: ElementsData[] = [
  {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name as keyof FormData]: value,
    }));
  };
  const onRegister = () => {};

  return (
    <Card
      title='Create New Profile'
      subtitle='Start Your Fasting Journey'
      ctaElement={
        <button
          onClick={onRegister}
          type='button'
          className='mt-4 bg-[#002548] text-white w-full p-4 rounded-[24px] hover:bg-blue-700 transition duration-300'
        >
          Register
        </button>
      }
    >
      <div className='flex flex-col items-center space-y-6 my-10'>
        {formElements.map(({ name, id, placeholder, type }) => (
          <TextInput
            key={id}
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            value={formData[name as keyof FormData]}
            onChange={handleInputChange}
          />
        ))}
      </div>
    </Card>
  );
};

export default SignUp;
