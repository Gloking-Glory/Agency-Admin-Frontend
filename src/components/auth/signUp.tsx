"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import { SignUpData } from "../types";
import {
  validateEmail, validatePassword, validateRequired,
} from "../utils/validation";
import { useSignUp } from "@/app/hooks/useSignUp";
import AlertModal, { AlertType } from "../utils/alertModal";
import { SignUpErrorType } from "@/app/hooks/types/apiTypes";
import type { AxiosError } from 'axios';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpData>();

  const router = useRouter();
  const password = watch("password");
  const [userRole, setUserRole] = useState<"ADMIN" | "AGENCY">("ADMIN");
  const [alertModal, setAlertModal] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [modalMessage, setModalMessage] = useState({ title: 'Sign Up Successful', subtitle: 'Thank you for signing up' });

  // const { mutate, isPending, isError, error, isSuccess } = useSignUp();
  const { mutate, isPending, error } = useSignUp();

  const handleFormSubmit = async (data: SignUpData) => {
    mutate(
      { ...data, role: userRole },
      {
        onSuccess: (data) => {
          setAlertType('success');
          console.log(data);
          setModalMessage({ title: 'Sign Up Successful', subtitle: 'Thank you for sign up, redirecting to login...' });
          setAlertModal(true);
          setTimeout(() => router.push("/login"), 2500);
        },
        onError: (err: AxiosError<SignUpErrorType>) => {
          const res = err.response?.data;
          const firstError =
            typeof res === 'object'
              ? Object.values(res)[0]?.[0] || 'Something went wrong!'
              : 'Something went wrong!';

          setAlertType('error');
          setModalMessage({ title: 'Sign Up Failed', subtitle: firstError });
          setAlertModal(true);
        }
      }
    )
  };

  const handleCloseAlertModal = () => {
    setAlertModal(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Sign Up
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Register as:
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg border transition ${
                userRole === "ADMIN"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
              onClick={() => setUserRole("ADMIN")}
            >
              Admin
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg border transition ${
                userRole === "AGENCY"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
              onClick={() => setUserRole("AGENCY")}
            >
              Agency
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  validateEmail(value) || "Invalid email address",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                validate: (value: string) =>
                  validatePassword(value) ||
                  "Password must be at least 6 characters",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value: string) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-gray-900 placeholder-gray-500"
              placeholder="Confirm your password"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {userRole === "AGENCY" && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  {...register("company_name", {
                    required:
                      userRole === "AGENCY"
                        ? "Company name is required"
                        : false,
                    validate: (value?: string) =>
                      userRole !== "AGENCY" ||
                      validateRequired(value || "") ||
                      "Company name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Enter company name"
                />
                {errors.company_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.company_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", {
                    required:
                      userRole === "AGENCY" ? "Address is required" : false,
                    validate: (value?: string) =>
                      userRole !== "AGENCY" ||
                      validateRequired(value || "") ||
                      "Address is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Enter address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contact Details
                </label>
                <input
                  type="text"
                  {...register("contact_details")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Enter contact details"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 px-4 rounded-lg text-white transition duration-200 ${
              isPending
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {isPending ? (
              <>
                <CircularProgress size={20} color="inherit" className="mr-2" />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>

      <AlertModal
        isOpen={alertModal}
        title={modalMessage.title}
        subtitle={modalMessage.subtitle}
        type={alertType}
        onClose={handleCloseAlertModal}
      />
    </div>
  );
};

export default SignUpForm;
