import React from "react";
interface GenderOption {
  value: string;
  label: string;
}
interface RadioFieldProps {
    id: string;
    options:GenderOption[];
    register:any;
  }

const RadioField: React.FC<RadioFieldProps> = ({id, options, register }) => {
  return (
    <div className="flex item-center">
      {options.map((option:any) => (
        <span key={option.value} className="flex items-center mr-3">
          <input
            className="h-4 w-4 mr-1"
            type="radio"
            id={option.value}
            value={option.value}
            {...register(id)}
          />
          <label htmlFor={option.value}>
            {option.label}
          </label>
        </span>
      ))}
    </div>
  );
};

export default RadioField;
