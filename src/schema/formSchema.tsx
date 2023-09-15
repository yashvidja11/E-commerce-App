import * as yup from "yup";

export const signUpschema = yup.object({
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
      /^(?=.*@)(?!.*\.\.)([A-Za-z0-9._%+-]+@([a-z]+)\.(com|in|org))$/,
      "Invalid Email format"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password length should be at least 6 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase, one lowercase, one digit and one special character"
    ),
  confirmpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
export const signInschema = yup.object({
  email: yup
    .string()
    .required("Email is Required")
    .email("Email format is not valid")
    .matches(
      /^(?=.*@)(?!.*\.\.)([A-Za-z0-9._%+-]+@[a-z]+\.(com|in|org))$/,
      "Invalid Email format"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password length should be at least 6 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase, one lowercase, one digit and one special character"
    ),
});
