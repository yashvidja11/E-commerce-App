import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../redux/features/userAuth/authSlice";
import { encryptData, decryptData } from "../utils/dataEncryption";
import InputField from "../components/common/useprofile/InputField";
import RadioField from "../components/common/useprofile/RedioField";
import profilePng from "../assets/images/profile.png";

import { useNavigate } from "react-router";
interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
}
interface GenderOption {
  value: string;
  label: string;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, signUp } = useSelector((state: RootState) => state.auth);
  const [editing, setEditing] = useState(false);
  const loginuser = signUp.find(
    (data) => data.email === login.email
  ) as UserData;
  useEffect(() => {
    if (loginuser) {
      setValue("firstName", loginuser.firstName);
      setValue("lastName", loginuser.lastName);
      setValue("username", loginuser.username);
      setValue("email", loginuser.email);
      setValue("gender", loginuser.gender);
    }
  }, [loginuser]);
  const { register, handleSubmit, formState, setValue } = useForm<UserData>({
    defaultValues: {
      firstName: loginuser?.firstName || "",
      lastName: loginuser?.lastName || "",
      username: loginuser?.username || "",
      email: loginuser?.email || "",
      gender: loginuser?.gender || "",
    },
    mode: "onChange",
  });
  const genderOptions: GenderOption[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const { errors } = formState;

  const onSubmit = (data: UserData) => {
    dispatch(updateUserProfile(data));

    const existingUserData = localStorage.getItem("userSignupData");
    const usersData = existingUserData
      ? JSON.parse(decryptData(existingUserData))
      : [];
    const updatedUsersData = usersData.map((user: UserData) => {
      if (user.email === data.email) {
        return {
          ...user,
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          gender: data.gender,
        };
      }
      return user;
    });
    localStorage.setItem(
      "userSignupData",
      encryptData(JSON.stringify(updatedUsersData))
    );
    // navigate("/");
    setEditing(false)
  };
  return (
    <>
      {editing ? (
        <div className="p-16">
          <div className="p-8 bg-white shadow mt-24 rounded-2xl">
            <div className="relative">
              <div className="w-48 h-48 overflow-hidden border-2 border-gray-500 bg-indigo-100 mx-auto rounded-full shadow-lg absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                <img src={profilePng} alt="profilephoto" />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mt-32 text-right border-b pb-12">
              <h2 className="text-2xl text-center font-semibold py-4">Edit Profile</h2>
                {/* <div className="row-span-2 col-span-8 bg-white p-6 "> */}
                {/* <div className="grid grid-flow-row gap-4 p-4"> */}

                <div className="grid grid-cols-2 grid-rows-4 gap-8 items-center">
                  <div>
                    {" "}
                    <span className="text-gray-800 font-semibold">
                      First Name :
                    </span>
                  </div>
                  <div>
                    {" "}
                    <InputField
                      id="firstName"
                      type="text"
                      register={register}
                      error={errors.firstName}
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    {" "}
                    <span className="text-gray-800 font-semibold">
                      Last Name :
                    </span>
                  </div>
                  <div>
                    {" "}
                    <InputField
                      id={"lastName"}
                      type={"text"}
                      register={register}
                      error={errors.lastName}
                      placeholder={"lastname"}
                    />
                  </div>
                  <div>
                    {" "}
                    <span className="text-gray-800 font-semibold">
                      User Name :
                    </span>
                  </div>
                  <div>
                    {" "}
                    <InputField
                      id={"username"}
                      type={"text"}
                      register={register}
                      error={errors.username}
                      placeholder={"username"}
                    />
                  </div>
                  <div>
                    {" "}
                    <span className="text-gray-800 font-semibold">
                      Email Name :
                    </span>
                  </div>
                  <div>
                    {" "}
                    <InputField
                      id={"email"}
                      type={"text"}
                      register={register}
                      error={errors.email}
                      placeholder={"youremail@gmail.com"}
                    />
                  </div>
                  <div>
                    {" "}
                    <span className="text-gray-800 font-semibold">
                      Gender :
                    </span>
                  </div>
                  <div>
                    {" "}
                    <RadioField
                      id={"gender"}
                      options={genderOptions}
                      register={register}
                    />
                  </div>
                </div>
              </div>
              <div className=" flex justify-center gap-20">
                <button
                  // onClick={() => navigate("/")}
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>

                
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-16">
          <div className="p-8 bg-white shadow mt-24 rounded-2xl">
            <div className="relative">
              <div className="w-48 h-48 overflow-hidden border-2 border-gray-500 bg-indigo-100 mx-auto rounded-full shadow-lg absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                <img src={profilePng} alt="profilephoto" />
              </div>
            </div>
            <div className="mt-32 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700 capitalize">
                {loginuser?.username}
              </h1>
              <p className="font-light text-gray-600 mt-3">
                {loginuser?.firstName} {loginuser?.lastName}
              </p>
              <p className="mt-2 text-gray-500">{loginuser?.email}</p>
              <p className="mt-2 text-gray-500">{loginuser?.gender}</p>
            </div>
            <div className=" flex flex-col justify-center">
              <button
                className="text-indigo-500 py-2 px-4  font-medium"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
