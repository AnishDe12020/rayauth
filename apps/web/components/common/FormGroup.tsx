import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

interface IFormGroupProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
  placeholder?: string;
  label?: string;
  id?: string;
  textarea?: boolean;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

const FormGroup = ({
  register,
  errors,
  name,
  placeholder,
  label,
  id,
  textarea,
  type,
  required,
}: IFormGroupProps): JSX.Element => {
  return (
    <>
      <div className="flex flex-col justify-center space-y-2">
        {label && (
          <label
            htmlFor={id || name}
            className="relative pr-4 text-sm font-semibold w-fit"
          >
            {label}
            {required && (
              <span className="absolute top-0 right-0 text-lg text-red-500">
                *
              </span>
            )}
          </label>
        )}
        {textarea ? (
          <textarea
            {...register(name)}
            id={id || name}
            placeholder={placeholder}
            className="h-24 px-4 py-2 transition duration-200 bg-gray-700 border-4 border-gray-900 rounded-lg resize-y hover:border-opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60"
            required={required}
          />
        ) : (
          <input
            {...register(name)}
            id={id || name}
            placeholder={placeholder}
            className="px-4 py-2 transition duration-200 bg-gray-700 border-4 border-gray-900 rounded-lg hover:border-opacity-60 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60"
            type={type}
            required={required}
          />
        )}
        {errors[name] && (
          <p className="w-full px-3 py-2 text-xs italic bg-red-600 rounded-lg">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
      <style jsx>
        {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            margin: 0;
            -webkit-appearance: none;
          }
        `}
      </style>
    </>
  );
};

export default FormGroup;
