import { TextInputProps } from "@/types";
import React from "react";

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  label,
  required,
}) => {
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='mb-2 text-gray-700'>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='border-2 w-full h-[60px] border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#002548] transition-colors'
        aria-labelledby={label ? id : undefined}
      />
    </div>
  );
};

export default TextInput;
