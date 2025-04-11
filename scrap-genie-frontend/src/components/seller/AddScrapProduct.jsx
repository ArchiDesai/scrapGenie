import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Loader from "../common/Loader";

const AddScrapProduct = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  const getAllState = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateID = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  useEffect(() => {
    getAllState();
  }, []);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("productName", data.productName);
    formData.append("category", data.category);
    formData.append("image", data.image[0]);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("stateId", data.stateId);
    formData.append("cityId", data.cityId);
    formData.append("status", data.status);

    try {
      const res = await axios.post("/scrapProduct/addwithfile", formData);
      setIsLoding(true);
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
          navigate("/seller/scrapproductlist");
        }, 1500);
      }
    } catch (err) {
      setIsLoding(false);
      toast.error(`${err.res?.data?.message || "Add Product failed"}`, {
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const validationSchema = {
    productNameValidation: {
      required: {
        value: true,
        message: "*Product name is required",
      },
    },
    categoryValidation: {
      required: {
        value: true,
        message: "*Select category",
      },
    },
    imageValidation: {
      required: {
        value: true,
        message: "*image is required",
      },
    },
    descriptionValition: {
      required: {
        value: true,
        message: "*Description is required",
      },
    },
    quantityValidation: {
      required: {
        value: true,
        message: "*Quantity is required",
      },
    },
    pricevalidation: {
      required: {
        value: true,
        message: "*Price is required",
      },
    },
    stateValidation: {
      required: {
        value: true,
        message: "*State is required",
      },
    },
    cityValidation: {
      required: {
        value: true,
        message: "*City is required",
      },
    },
    statusValidation: {
      required: {
        value: true,
        message: "*Status is required",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
        {isLoding ? (
          <Loader />
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-green-600 py-4 px-6">
              <h2 className="text-2xl font-bold text-white text-center">
                Add Scrap Product
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    {...register(
                      "productName",
                      validationSchema.productNameValidation
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    placeholder="Enter product name"
                  />
                  {errors.productName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.productName.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    {...register(
                      "category",
                      validationSchema.categoryValidation
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  >
                    <option value="">Select Category</option>
                    <option value="Metal">Metal</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Paper">Paper</option>
                    <option value="E-Waste">E-Waste</option>
                    <option value="Vehicle Parts">Vehicle Parts</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", validationSchema.imageValidation)}
                    className="w-full p-2 border rounded mt-1"
                    onChange={handleImageChange}
                  />
                  
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.image.message}
                    </p>
                  )}
                </div>

                {/* Image Preview */}
                {selectedImage && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Preview
                    </label>
                    <div className="flex justify-center">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-60 h-auto object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register(
                      "description",
                      validationSchema.descriptionValition
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    placeholder="Enter product description"
                    rows="3"
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    {...register(
                      "quantity",
                      validationSchema.quantityValidation
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    placeholder="Enter quantity"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (per unit)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      {...register("price", validationSchema.pricevalidation)}
                      className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      placeholder="Enter price"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    {...register("stateId", validationSchema.stateValidation)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
                  {errors.stateId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.stateId.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    {...register("cityId", validationSchema.cityValidation)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  >
                    <option value="">Select City</option>
                    {cities?.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.cityId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cityId.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Available"
                        {...register(
                          "status",
                          validationSchema.statusValidation
                        )}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-700">Available</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Sold"
                        {...register(
                          "status",
                          validationSchema.statusValidation
                        )}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-700">Sold</span>
                    </label>
                  </div>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  Submit Scrap Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddScrapProduct;
