"use client";
import React, { useState } from "react";
import Card from "../components/Card";
import TextInput from "../components/TextInput";
import { authenticate } from "../../lib/action";
import { FormDataTypes } from "@/types";
import { useFastingContext } from "@/context";
import { FastingActionTypes } from "@/constants";

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
  const [formData, setFormData] = useState<FormDataTypes>({
    name: "",
    email: "",
    password: "",
  });

  const { dispatchFastingAction } = useFastingContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name as keyof FormData]: value,
    }));
  };
  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await authenticate(formData);
    dispatchFastingAction({
      type: FastingActionTypes.SET_STATE,
      payload: { user },
    });
  };

  return (
    <article className='mt-12'>
      <Card title='Create New Profile' subtitle='Start Your Fasting Journey'>
        <form onSubmit={onRegister}>
          <div className='flex flex-col items-center space-y-6 my-8'>
            {formElements.map(({ name, id, placeholder, type }) => (
              <TextInput
                key={id}
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
                value={formData[name as keyof FormDataTypes]}
                onChange={handleInputChange}
                required={true}
              />
            ))}
            <button
              type='submit'
              className='bg-[#002548] text-white w-full p-4 rounded-[24px] hover:bg-blue-700 transition duration-300'
            >
              Register
            </button>
          </div>
        </form>
      </Card>
    </article>
  );
};

export default SignUp;
