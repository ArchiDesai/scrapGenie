 import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";
import Loader from "./Loader";

const Signup = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [roles, setRoles] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllRoles = async () => {
    const res = await axios.get("/role/getallroles");
    setRoles(res.data.data);
  };

  const getAllState = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateID = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  useEffect(() => {
    getAllState();
    getAllRoles();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({});

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/signup", data);
      console.log(res.data);

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
    } catch (err) {
      setLoading(false);
      toast.error(`${err.res?.data?.message || "Signup failed"}`, {
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

  const validationSchema = {
    firstNameValidation: {
      required: {
        value: true,
        message: "*this field is required",
      },
    },
    lastNameValidation: {
      required: {
        value: true,
        message: "*this field is required",
      },
    },
    emailValidation: {
      required: {
        value: true,
        message: "*email is required",
      },
      pattern: {
        value: /^[a-z0-9]+@[a-z]+\.[a-z]{3}$/i,
        message: "invalid email",
      },
    },
    phoneValidation: {
      required: {
        value: true,
        message: "*phone number is required",
      },
      pattern: {
        value: /^(\+[0-9]{1,2}\s?)?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
        message: "enter correct number",
      },
    },
    passwordValidation: {
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
    roleValidation: {
      required: {
        value: true,
        message: "*this field is required",
      },
    },
    stateValidation: {
      required: {
        value: true,
        message: "*this field is required",
      },
    },
    cityValidation: {
      required: {
        value: true,
        message: "*this field is required",
      },
    },
    areaValidation: {
      required: {
        value: true,
        message: "*this field is required",
      },
    },
    termValidation: {
      required: {
        value: true,
        message: "*You must accept the terms",
      },
    },
  };

  const nextSlide = async () => {
    let fields = [];
    let isValid = false;

    if (currentSlide === 0) {
      fields = [
        "firstName",
        "lastName",
        "email",
        "password",
        "phone",
        "roleId",
      ];
    } else if (currentSlide === 1) {
      fields = ["stateId", "cityId", "areaId"];
      if (watch("stateId", "cityId")) {
        await getCityByStateID(watch("stateId"));
        await getAreaByCityId(watch("cityId"));
      }
    }

    isValid = await trigger(fields);
    if (isValid) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
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
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Progress Steps */}
            <div className="bg-gradient-to-b from-green-600 to-green-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Join Us</h2>
                <p className="text-green-100">
                  Create your account in just a few steps
                </p>
              </div>

              <div className="mt-8 space-y-8">
                {["Personal Info", "Your Location"].map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`rounded-full w-8 h-8 flex items-center justify-center mr-4 ${
                        currentSlide >= index
                          ? "bg-white text-green-900 font-bold"
                          : "bg-green-900 text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className={currentSlide === index ? "font-bold" : ""}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-green-100 text-sm">
                  Already have an account?
                </p>
                <Link
                  to="/login"
                  className="text-white font-medium hover:underline"
                >
                  Login here
                </Link>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:w-2/3 relative overflow-hidden">
              <form onSubmit={handleSubmit(submitHandler)}>
                {/* Slide 1: Personal Info */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    currentSlide === 0 ? "block" : "hidden"
                  }`}
                  
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        {...register(
                          "firstName",
                          validationSchema.firstNameValidation
                        )}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Your name"
                      />
                      <span className="text-red-500 text-xs">
                        {errors.firstName?.message}
                      </span>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        {...register(
                          "lastName",
                          validationSchema.lastNameValidation
                        )}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Surname"
                      />
                      <span className="text-red-500 text-xs">
                        {errors.lastName?.message}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      {...register("email", validationSchema.emailValidation)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="example@gmail.com"
                    />
                    <span className="text-red-500 text-xs">
                      {errors.email?.message}
                    </span>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register(
                        "password",
                        validationSchema.passwordValidation
                      )}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter a strong password"
                    />
                    <span className="text-red-500 text-xs">
                      {errors.password?.message}
                    </span>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone", validationSchema.phoneValidation)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="1234567890"
                    />
                    <span className="text-red-500 text-xs">
                      {errors.phone?.message}
                    </span>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Role
                    </label>
                    <select
                      {...register("roleId", validationSchema.roleValidation)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Role</option>
                      {roles?.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 text-xs">
                      {errors.roleId?.message}
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Slide 2: Role & Location */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    currentSlide === 1 ? "block" : "hidden"
                  }`}
                  
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Your Location
                  </h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      State
                    </label>
                    <select
                      {...register("stateId", validationSchema.stateValidation)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      onChange={(e) => {
                        getCityByStateID(e.target.value);
                      }}
                    >
                      <option value="">Select State</option>
                      {states?.map((state) => (
                        <option key={state._id} value={state._id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 text-xs">
                      {errors.stateId?.message}
                    </span>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      City
                    </label>
                    <select
                      {...register("cityId", validationSchema.cityValidation)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      onChange={(e) => {
                        getAreaByCityId(e.target.value);
                      }}
                    >
                      <option value="">Select City</option>
                      {cities?.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 text-xs">
                      {errors.cityId?.message}
                    </span>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Area
                    </label>
                    <select
                      {...register("areaId", validationSchema.areaValidation)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Area</option>
                      {areas?.map((area) => (
                        <option key={area._id} value={area._id}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 text-xs">
                      {errors.areaId?.message}
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          {...register(
                            "terms",
                            validationSchema.termValidation
                          )}
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300"
                        />
                      </div>
                      <label className="ms-2 text-sm text-gray-500">
                        I agree to the
                        <a href="#" className="text-green-600 hover:underline">
                          Terms & Conditions
                        </a>
                      </label>
                    </div>
                    <span className="text-red-500 text-xs">
                      {errors.terms?.message}
                    </span>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="text-green-600 px-6 py-2 rounded-lg border border-green-600 hover:bg-green-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
