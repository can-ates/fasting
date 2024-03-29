import React from "react";

type TextInputProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  label,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className='mb-2 text-gray-700'>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='border-2 max-w-[345px] w-full h-[60px] border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#002548] transition-colors'
        aria-labelledby={label ? id : undefined}
      />
    </>
  );
};

export default TextInput;
