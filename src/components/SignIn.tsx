import React from "react";
import signinimg from "../assets/images/Signin.png";
import { TbMailFilled } from "react-icons/tb";
import { BiSolidLock } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { signInschema } from "../schema/formSchema";
import PasswordField from "./common/authentication/PasswordField";
import InputField from "./common/authentication/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { decryptData, encryptData } from "../utils/dataEncryption";
import { signInInfo } from "../redux/features/userAuth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { register, handleSubmit, formState, setError, setValue } =
    useForm<FormData>({
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "onChange",
      resolver: yupResolver(signInschema),
    });
  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    const signUpData = localStorage.getItem("userSignupData") || "[]";
    if (signUpData !== "[]") {
      const decryptedsignUpData = JSON.parse(decryptData(signUpData));
      const matchedUser = decryptedsignUpData.find(
        (user: any) => user.email === data.email
      );
      if (matchedUser && matchedUser.password === data.password) {
        toast.success("SignIn successful!", {
          position: "bottom-right",
  autoClose: 1000,          style: {
            background: "green",
            color: "white",
          },
        });
        const signInData = encryptData(JSON.stringify(data));
        localStorage.setItem("currentUser", signInData);
        dispatch(signInInfo(JSON.parse(decryptData(signInData))));
        setTimeout(() => {
          if (currentPath === "/cart") {
            navigate("/checkout");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        setError("password", {
          type: "custom",
          message: "Invalid Password",
        });
        setValue("password", "");
      }
    } else {
      setError("email", {
        type: "custom",
        message: "User Not Found Please SignUp",
      });
      setValue("password", "");
    }
  };
  const handleNewUserClick = () => {};

  return (
    <>
      <div className="">
        <div className="min-h-screen flex justify-center items-center">
          <div className="relative py-3 w-[60%] h-[50%]">
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-900 to-gray-300 shadow-lg transform -skew-y-6 sm:skew-y-0 rotate-6 rounded-3xl"></div>
            <div className="relative bg-gray-100 text-gray-500 rounded-3xl shadow-xl overflow-hidden">
              <div className="md:flex w-full">
                <div className="flex flex-col justify-evenly w-full md:w-1/2 py-10 px-5 md:px-10">
                  <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900">
                      Sign In
                    </h1>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                      <div className="w-full px-3 mb-5">
                        <button className="block w-full max-w-xs mx-auto bg-black hover:bg-gray-900 hover:text-yellow-500 focus:bg-black text-white rounded-lg px-3 py-3 font-semibold">
                          SIGN IN
                        </button>
                      </div>
                    </div>
                  </form>
                  <Link
                    to="/signup"
                    className="text-center hover:text-yellow-500"
                  >
                    <p>
                      New User?
                      <span onClick={handleNewUserClick}>
                        Create an account
                      </span>
                    </p>
                  </Link>
                </div>
                <div className="hidden md:flex md:flex-col gap-3 w-1/2 bg-black py-10 px-10">
                  <h2 className="text-white font-bold text-4xl">
                    Welcome Back,
                  </h2>
                  <p className="text-white font-medium">
                    Please SignIn to Get access of your Orders and Wishlist
                  </p>
                  <img className="my-auto" src={signinimg} alt="SignUpPhoto" />
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

export default SignIn;
