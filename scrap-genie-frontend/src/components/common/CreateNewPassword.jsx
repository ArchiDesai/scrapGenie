import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const CreateNewPassword = () => {
  const token = useParams().token;

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const object = {
      token: token,
      password: data.password,
    };
    const res = await axios.post("/resetpassword", object);
    console.log(res.data);
    try {
      if (res.status === 201) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error(`${err.res?.data?.message || "password updation failed"}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const password = watch("password", "");

  const validationSchema = {
    passwordValidation: {
      required: {
        required: {
          value: true,
          message: "*password is required",
        },
        minLength: {
          value: 8,
          message: "minimum length is 8",
        },
        validate: (pass) => {
          const password = {
            capital: /(?=.*[A-Z])/,
            specialChar: /[-\/:-@\[-\`{-~]/,
            digits: /(?=.*[0-9])/,
          };
          return (
            (password.capital.test(pass) &&
              password.specialChar.test(pass) &&
              password.digits.test(pass)) ||
            "at least one capital char, special char & digit is required"
          );
        },
      },
    },

    confirmPasswordValidation: {
      required: {
        value: true,
        message: "Please confirm your password",
      },
      validate: (value) => value === password || "Passwords do not match",
    },
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4"
    >
      <div className="w-full max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-6">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              {...register("password", validationSchema.passwordValidation)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <span className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register(
                "confirmPassword",
                validationSchema.confirmPasswordValidation
              )}

              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <span className="text-red-500 text-sm mt-1">
              {errors.confirmPassword?.message}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
