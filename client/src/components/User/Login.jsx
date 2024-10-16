import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { LoginApi } from "../../Services/loginApi";
import AlertMessage from "../Alert/AlertMessage";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("password is required"),
});
const LoginForm = () => {
  const mutation = useMutation({
    mutationFn: LoginApi,
    mutationKey: ["login"],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      mutation
        .mutateAsync(values)
        .then((data) => {
          dispatch(login(data));
          // console.log(data);
          // console.log(mutation);
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div>
      <form
        className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Login
        </h2>
        {/* Display messages */}

        <p className="text-sm text-center text-gray-500">
          Login to access your account
        </p>
        {mutation.isPending && (
          <AlertMessage type="loading" message="loading..." />
        )}
        {mutation.isSuccess && (
          <AlertMessage type="success" message="success" />
        )}
        {mutation.isError && (
          <AlertMessage type="error" message={mutation.error.message} />
        )}

        {/* Input Field - Email */}
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}
        </div>

        {/* Input Field - Password */}
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
