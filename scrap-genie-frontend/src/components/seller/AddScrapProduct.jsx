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
      console.log(res.data);
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

  // // Handle Image Upload Preview
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
    <div className="min-h-full flex items-center justify-center bg-gray-100">
      <div className="bg-white my-5 shadow-lg rounded-lg p-6 w-full max-w-3xl">
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
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Add Scrap Product
            </h2>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Product Name
                </label>
                <input
                  {...register(
                    "productName",
                    validationSchema.productNameValidation
                  )}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter product name"
                />
                <span className="text-red-500 text-sm">
                  {errors.productName?.message}
                </span>
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Category
                </label>
                <select
                  {...register("category", validationSchema.categoryValidation)}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="">Select Category</option>
                  <option value="Metal">Metal</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Paper">Paper</option>
                  <option value="E-Waste">E-Waste</option>
                  <option value="Vehicle Parts">Vehicle Parts</option>
                </select>
                <span className="text-red-500 text-sm">
                  {errors.category?.message}
                </span>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", validationSchema.imageValidation)}
                  className="w-full p-2 border rounded mt-1"
                  onChange={handleImageChange}
                />
                <span className="text-red-500 text-sm">
                  {errors.image?.message}
                </span>
              </div>

              {/* Image Preview */}
              {selectedImage && (
                <div className="mt-2">
                  <label className="block text-gray-700 font-medium">
                    Image Preview
                  </label>
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-60 h-auto object-cover rounded mt-1"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Description
                </label>
                <textarea
                  {...register(
                    "description",
                    validationSchema.descriptionValition
                  )}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter product description"
                  rows="3"
                ></textarea>
                <span className="text-red-500 text-sm">
                  {errors.description?.message}
                </span>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity", validationSchema.quantityValidation)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter quantity"
                />
                <span className="text-red-500 text-sm">
                  {errors.quantity?.message}
                </span>
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Price (per unit)
                </label>
                <input
                  type="number"
                  {...register("price", validationSchema.pricevalidation)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter price"
                />
                <span className="text-red-500 text-sm">
                  {errors.price?.message}
                </span>
              </div>

              {/* State */}
              <div>
                <label className="block text-gray-700">State</label>
                <select
                  {...register("stateId", validationSchema.stateValidation)}
                  className="w-full p-2 border rounded-lg"
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

              {/* City */}
              <div>
                <label className="block text-gray-700">City</label>
                <select
                  {...register("cityId", validationSchema.cityValidation)}
                  className="w-full p-2 border rounded-lg"
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

              {/* Status */}
              <div>
                <label className="block text-gray-700">Status</label>
                <div className="space-x-10">
                  <input
                    type="radio"
                    value="Available"
                    {...register("status", validationSchema.statusValidation)}
                    className="form-radio text-blue-500"
                  />
                  Available
                  <input
                    type="radio"
                    value="Sold"
                    {...register("status", validationSchema.statusValidation)}
                    className="form-radio text-blue-500"
                  />
                  Sold
                </div>
                <span className="text-red-500 text-sm">
                  {errors.status?.message}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Submit Scrap Product
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddScrapProduct;
