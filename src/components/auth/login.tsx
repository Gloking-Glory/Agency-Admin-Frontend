"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoginData } from "../types";
import { validateEmail, validatePassword } from "../utils/validation";
import AlertModal, { AlertType } from "../utils/alertModal";
import { GenErrType, LoginResponseType } from "@/app/hooks/types/apiTypes";
import type { AxiosError } from "axios";
import { useLogin } from "@/app/hooks/useLogin";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const router = useRouter();
  const [alertType, setAlertType] = useState<AlertType>("success");
  const [alertModal, setAlertModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', subtitle: '' });

  const { mutate, isPending } = useLogin();

  const handleFormSubmit = (data: LoginData) => {
    mutate(
      { ...data },
      {
        onSuccess: (data: LoginResponseType)=> {
          const { user, tokens } = data;
          const { role } = user;
          const { refresh, access } = tokens;
          localStorage.setItem("refresh", refresh);
          localStorage.setItem("access", access);
          setAlertType("success");
          setAlertModal(true);
          setModalMessage({ title: 'Success', subtitle: 'Login Successful, going to dashboard...' })
          setTimeout(() => {
            if (role === 'ADMIN') {
              router.push("/admin-dashboard")
            } else {
              router.push("/agency-dashboard")
            }
          }, 1500);
        },

        onError: (err: AxiosError<GenErrType>) => {
          const res = err.response?.data;
          setAlertType("error");
          setModalMessage({ title: 'Error', subtitle: 'Login Failed' })
          setAlertModal(true);
        }
      }
    )
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5"
        >
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  validateEmail(value) || "Invalid email address",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         text-gray-900 placeholder-gray-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  validatePassword(value) ||
                  "Password must be at least 6 characters",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         text-gray-900 placeholder-gray-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg 
                       hover:bg-blue-600 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                       transition duration-200 font-medium cursor-pointer"
          >
            {isPending ? (
              <>
                <CircularProgress size={20} color="inherit" className="mr-2" />
                Logging In...
              </>

            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
          Don&apos;t have an account?
          &nbsp;
          <Link href="/" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      <AlertModal
        isOpen={alertModal}
        onClose={() => setAlertModal(false)}
        type={alertType}
        title={modalMessage.title}
        subtitle={modalMessage.subtitle}
      />
    </div>
  );
};

export default LoginForm;
