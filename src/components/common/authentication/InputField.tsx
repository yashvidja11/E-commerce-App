import React from "react";
interface InputFieldProps {
  label: string;
  icon: any;
  id: string;
  type: string;
  register:any;
   error: any;
   placeholder:string;
}

const InputField: React.FC<InputFieldProps> = ({ label, icon, id, type, register, error,placeholder}) => {
  return (
    <div className="w-full px-3 mb-5">
      <label htmlFor={id} className="text-xs font-semibold px-1">
        {label}
      </label>
      <div className="flex">
        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
          <i className=" text-xl">
            {icon}
          </i>
        </div>
        <input
        name={id}
          type={type}
          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black"
          placeholder={placeholder}
          {...register(id)}
      />
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
export default InputField;
