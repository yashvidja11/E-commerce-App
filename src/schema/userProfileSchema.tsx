import * as yup from "yup";

export const editProfile = yup.object({
    firstname: yup
    .string()
    .required("Firstname is Required")
    .matches(/^[a-zA-Z]+$/, 'Firstname cannot contain white space, special character and digit')
    .min(2, "Firstname length should be at least 2 characters")
    .max(20, "Firstname cannot exceed more than 20 characters"),
  lastname: yup
    .string()
    .required("Lastname is Required")
    .matches(/^[a-zA-Z]+$/, 'Lastname cannot contain white space, special character and digit')
    .min(2, "Lastname length should be at least 2 characters")
    .max(20, "Lastname cannot exceed more than 20 characters"),
  username: yup
    .string()
    .required("Firstname is Required")
    .matches(
      /^[a-zA-Z]+$/,
      "Firstname cannot contain white space, special character and digit"
    )
    .min(2, "Firstname length should be at least 2 characters")
    .max(20, "Firstname cannot exceed more than 20 characters"),
    email: yup
    .string()
    .required("Email is Required")
    .email("Email format is not valid")
    .matches(
        /^(?=.*@)(?!.*\.\.)([A-Za-z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|in|org))$/,
      "Invalid Email format"
    ),
  gender: yup.string().required("Please Select Gender"),
});

