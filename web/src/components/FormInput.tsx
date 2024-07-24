import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  className?: string;
  name?: string;
  options?: string[];
  errorMessage?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      id,
      className = "mt-2 w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:border-black focus:ring-black",
      options = [""],
      errorMessage,
      ...props
    },
    ref
  ) => {
    if (type === 'radio' && options.length > 0) {
      return (
        <div className="mb-4 mt-4">
          <div className="mt-2 flex flex-col md:flex-row md:items-center">
            {options.map((option, index) => (
              <label key={option} className={`inline-flex items-center ${index !== 0 ? "ml-0 md:ml-6" : ""}`}>
                <input type="radio" ref={ref} {...props} value={option} />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
          {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        </div>
      );
    } else {
      return (
        <div className="form-input">
          {label && (
            <label htmlFor={id} className="">
              {label}
            </label>
          )}
          <input
            placeholder={placeholder}
            type={type}
            id={id}
            className={` ${className}`}
            ref={ref}
            {...props}
          />
          {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        </div>
      );
    }
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
