// Reusable input component with label and error message in tailwindcss typescript react

import React from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  label: string;
  error?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message?: string;
};

const Input = (props: Props) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-white py-2">{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={twMerge(
          `bg-primary border rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent ${props.className}`
        )}
      />
      {props.error && (
        <p className="text-red-500 text-sm italic pl-2">{props.error}</p>
      )}
      {props.message && (
        <p className="text-green-500 text-sm italic pl-2">{props.message}</p>
      )}
    </div>
  );
};

export default Input;
