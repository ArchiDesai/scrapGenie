import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/login", data);
      console.log(res.data);

      if (res.status === 200) {
        toast.success("Login successfully", {
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

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        setTimeout(() => {
          {
            res.data.data.roleId.name == "Seller"
              ? navigate("/seller")
              : navigate("/buyer");
          }
        }, 1500);
      }
    } catch (err) {
      if (err.status === 401) {
        toast.error("Invalid credential..", {
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
      } else {
        toast("⚠️ Something went wrong...", {
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
    }
  };

  const validationSchema = {
    emailValidation: {
      required: {
        value: true,
        message: "*email is required",
      },
    },

    passwordValidation: {
      required: {
        value: true,
        message: "*password is required",
      },
    },
  };

  return (

    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
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
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Welcome Back
      </h2>
      <p className="text-gray-600 text-center mt-2">Login to your account</p>

      {/* Login Form */}
      <form onSubmit={handleSubmit(submitHandler)} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded mt-1"
            {...register("email", validationSchema.emailValidation)}
          />
          <span className="text-red-500 text-sm">
            {errors.email?.message}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded mt-1"
            {...register("password", validationSchema.passwordValidation)}
          />
          <span className="text-red-500 text-sm">
            {errors.password?.message}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-600 text-sm">Remember Me</span>
          </label>
          <Link to="/resetpassword" className="text-blue-600 text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  </div>


  );
};

export default Login;
