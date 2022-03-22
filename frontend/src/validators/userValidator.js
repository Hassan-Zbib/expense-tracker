import * as yup from "yup"

const requiredMsg = "This field is required"

const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required(requiredMsg)
    .lowercase()
    .trim(),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required(requiredMsg),
})

const registerSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required(requiredMsg)
    .lowercase()
    .trim(),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters")
    .required(requiredMsg),
  orgName: yup
    .string("Enter your organization's name")
    .required(requiredMsg)
    .trim(),
  firstName: yup.string("Enter your first name").required(requiredMsg).trim(),
  lastName: yup.string("Enter your last name").required(requiredMsg).trim(),
  confirmPass: yup
    .string("Confirm your password")
    .required(requiredMsg)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
})

const forgotPassSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required(requiredMsg)
    .lowercase()
    .trim(),
})

const resetPassSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters")
    .required(requiredMsg),
  confirmPass: yup
    .string("Confirm your password")
    .required(requiredMsg)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
})

export { loginSchema, registerSchema, forgotPassSchema, resetPassSchema }
