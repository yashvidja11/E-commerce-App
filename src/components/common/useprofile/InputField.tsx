// import React from "react";
// interface InputFieldProps {
//   id: string;
//   type: string;
//   register:any;
//    error: any;
//    placeholder:string;
// }

// const InputField: React.FC<InputFieldProps> = ({ id, type, register, error,placeholder}) => {
//   return (
//     <>
//         <input
//         name={id}
//           type={type}
//           className="w-full pl-2 py-2 rounded-lg border-2 border-gray-200 outline-none"
//           placeholder={placeholder}
//           {...register(id)}
//       />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </>
//   );
// };
// export default InputField;
import React from "react";

interface InputFieldProps {
  id: string;
  type: string;
  register: any;
  error: any;
  placeholder: string;
  readOnly?: boolean; 
  className?: string; // Add a className prop
}

const InputField: React.FC<InputFieldProps> = ({ id, type, register, error, placeholder, readOnly, className }) => {
  return (
    <>
      <input
        name={id}
        type={type}
        className={`w-full pl-2 py-2 border-none border-b-2 border-gray-200 outline-none ${className}`} // Apply styles here
        placeholder={placeholder}
        readOnly={readOnly}
        {...register(id)}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </>
  );
};

export default InputField;
