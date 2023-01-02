import * as Yup from "yup";

export const signUpSchema = Yup.object({
  first_name: Yup.string().min(2).max(25).required("Please enter your name"),
  last_name: Yup.string().min().required("Please enter yourname"),
//   password: Yup.string().min(6).required("Please enter your password"),
//   confirm_password: Yup.string()
//     .required()
//     .oneOf([Yup.ref("password"), null], "Password must match"),
});