import React, { useState } from "react";
import signupimg from "../assets/images/Signup.png";
import { FaUser } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { BiSolidLock } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpschema } from "../schema/formSchema";
import InputField from "./common/authentication/InputField";
import PasswordField from "./common/authentication/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { decryptData, encryptData } from "../utils/dataEncryption";
import { signUpInfo } from "../redux/features/userAuth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}
const SignUp: React.FC = () => {
  const { signUp } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, setError } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(signUpschema),
  });

  const { errors } = formState;
  const onSubmit = (data: any) => {
    const existingData = localStorage.getItem("userSignupData");

    const decryptedExistingData = existingData
      ? JSON.parse(decryptData(existingData))
      : [];
   

    const isEmailExists = signUp.find((user: any) => user.email === data.email);

    if (isEmailExists) {
      setError("email", {
        type: "custom",
        message: "Email already exists",
      });
    } else {
      toast.success("Signup successful! You can now sign in.", {
        position: "bottom-right",
        autoClose: 1000,
        style: {
          background: "green",
          color: "white",
        },
      });
      decryptedExistingData.push(data);
      const encryptedData = encryptData(JSON.stringify(decryptedExistingData));
      localStorage.setItem("userSignupData", encryptedData);
      dispatch(signUpInfo(data));
      setModalOpen(false);

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  };

  const handleExistingUserClick = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div>
        <div className="min-h-screen flex justify-center items-center">
          <div className="relative py-3 w-[60%] h-[50%]">
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-900 to-gray-700 shadow-lg transform -skew-y-6 sm:skew-y-0 -rotate-6 rounded-3xl"></div>
            <div className="relative bg-gray-100 text-gray-500 rounded-3xl shadow-xl overflow-hidden">
              <div className="md:flex w-full">
                <div className="hidden md:flex md:flex-col gap-3 w-1/2 bg-black py-10 px-10">
                  <h2 className="text-white font-bold text-4xl">
                    Looks like you're new here!
                  </h2>
                  <p className="text-white font-medium">
                    Sign up to get started
                  </p>
                  <img className="my-auto" src={signupimg} alt="SignUpPhoto" />
                </div>
                <div className="flex flex-col justify-evenly w-full md:w-1/2 py-10 px-5 md:px-10">
                  <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900">
                      Sign Up
                    </h1>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex -mx-3">
                      <InputField
                        label={"User Name"}
                        id={"username"}
                        icon={<FaUser />}
                        type={"text"}
                        placeholder={"usename"}
                        register={register}
                        error={errors.username}
                      />
                    </div>
                    <div className="flex -mx-3">
                      <InputField
                        label={"Email"}
                        id={"email"}
                        icon={<TbMailFilled />}
                        type={"email"}
                        placeholder={"youremail@gmail.com"}
                        register={register}
                        error={errors.email}
                      />
                    </div>
                    <div className="flex -mx-3">
                      <PasswordField
                        label={"Password"}
                        id={"password"}
                        icon={<BiSolidLock />}
                        register={register}
                        error={errors.password}
                      />
                    </div>
                    <div className="flex -mx-3">
                      <PasswordField
                        label={"Confirm Password"}
                        id={"confirmpassword"}
                        icon={<BiSolidLock />}
                        register={register}
                        error={errors.confirmpassword}
                      />
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <button className="block w-full max-w-xs mx-auto bg-black hover:bg-gray-900 focus:bg-black text-white rounded-lg px-3 py-3 font-semibold">
                          REGISTER NOW
                        </button>
                      </div>
                    </div>
                  </form>
                  <Link to="/signin" className="text-center">
                    <p>
                      Existing User?{" "}
                      <span onClick={handleExistingUserClick}>SignIn</span>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
