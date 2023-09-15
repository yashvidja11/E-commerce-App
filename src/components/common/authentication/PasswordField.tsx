import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface PasswordFieldProps {
  label: string;
  icon: any;
  id: string;
  register: any;
  error: any;
}
const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  icon,
  id,
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full px-3 mb-5">
      <label htmlFor={id} className="text-xs font-semibold px-1">
        {label}
      </label>
      <div className="flex">
        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
          <i className=" text-xl">{icon}</i>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-black"
          placeholder="************"
          {...register(id)}
        />
        <div
          className="w-10 -ml-12 text-center text-2xl flex items-center justify-center"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
export default PasswordField;
