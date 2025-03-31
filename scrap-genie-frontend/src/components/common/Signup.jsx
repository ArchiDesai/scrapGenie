import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";
import Loader from "./Loader";

const Signup = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
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
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Signup
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Create your account
            </p>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              {/* First Name & Last Name */}
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 font-medium">
                    First Name
                  </label>
                  <input
                    {...register(
                      "firstName",
                      validationSchema.firstNameValidation
                    )}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Your name"
                  />
                  <span className="text-red-500 text-sm">
                    {errors.firstName?.message}
                  </span>
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Last Name
                  </label>
                  <input
                    {...register(
                      "lastName",
                      validationSchema.lastNameValidation
                    )}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Surname"
                  />
                  <span className="text-red-500 text-sm">
                    {errors.lastName?.message}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  {...register("email", validationSchema.emailValidation)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="example@gmail.com"
                />
                <span className="text-red-500 text-sm">
                  {errors.email?.message}
                </span>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", validationSchema.passwordValidation)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter a strong password"
                />
                <span className="text-red-500 text-sm">
                  {errors.password?.message}
                </span>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone", validationSchema.phoneValidation)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="1234567890"
                />
                <span className="text-red-500 text-sm">
                  {errors.phone?.message}
                </span>
              </div>

              {/* User Role */}
              <div>
                <label className="block text-gray-700 font-medium">Role</label>
                <select
                  {...register("roleId", validationSchema.roleValidation)}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option>Select Role</option>
                  {roles?.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <span className="text-red-500 text-sm">
                  {errors.roleId?.message}
                </span>
              </div>

              {/* State Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">State</label>
                <select
                  {...register("stateId", validationSchema.stateValidation)}
                  className="w-full p-2 border rounded mt-1"
                  onChange={(e) => {
                    getCityByStateID(e.target.value);
                  }}
                >
                  <option>Select State</option>
                  {states?.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <span className="text-red-500 text-sm">
                  {errors.stateId?.message}
                </span>
              </div>

              {/* City Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">City</label>
                <select
                  {...register("cityId", validationSchema.cityValidation)}
                  className="w-full p-2 border rounded mt-1"
                  onChange={(e) => {
                    getAreaByCityId(e.target.value);
                  }}
                >
                  <option>Select City</option>
                  {cities?.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <span className="text-red-500 text-sm">
                  {errors.cityId?.message}
                </span>
              </div>

              {/* Area Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">Area</label>
                <select
                  {...register("areaId", validationSchema.areaValidation)}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option>Select Area</option>
                  {areas?.map((area) => (
                    <option key={area._id} value={area._id}>
                      {area.name}
                    </option>
                  ))}
                </select>
                <span className="text-red-500 text-sm">
                  {errors.areaId?.message}
                </span>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("terms", validationSchema.termValidation)}
                  className="mr-2"
                />
                <label className="text-gray-600 text-sm">
                  I agree to the
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>
                </label>
                <span className="text-red-500 text-sm">
                  {errors.terms?.message}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
