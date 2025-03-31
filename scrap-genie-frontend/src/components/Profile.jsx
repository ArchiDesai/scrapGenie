import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);

  // const getUsersById = async () => {
  //   const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
  //   setUserName(res.data.data);
  // };

  // const getAllProducts = async () => {
  //   const res = await axios.get("/scrapProduct/getallscrapproductbyuserid/" + localStorage.getItem("id"));
  //   console.log(res.data);
  //   setProducts(res.data.data);
  // };

  // useEffect(() => {
  //   getUsersById();
  //   getAllProducts()
  // }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/women/65.jpg"
  );

  // Sample user data
  const defaultValues = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Frontend developer passionate about creating beautiful user experiences.",
    phone: "+1234567890",
    address: "123 Main St, Anytown, USA",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log("Profile updated:", data);
    setIsEditing(false);
    // Here you would typically send the data to your backend
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // <div className="container mx-auto px-4 py-8">
    //   <div className="bg-white shadow-md p-6 rounded-lg">
    //     <h2 className="text-2xl font-bold">User Profile</h2>
    //     {/* <p className="text-gray-600">Manage your scrap listings and transactions.</p> */}

    //     <div className="flex items-center space-x-4 mt-4">
    //       <img
    //         src="https://via.placeholder.com/100"
    //         className="rounded-full w-24 h-24"
    //       />
    //       <div>
    //         <h3 className="text-lg font-bold">
    //           {userName.firstName}&nbsp;{userName.lastName}
    //         </h3>
    //         <p className="text-gray-600">Scrap Dealer | Verified ✅</p>
    //       </div>
    //     </div>

    //     <div className="mt-6">
    //       <h3 className="text-xl font-bold">My Listings</h3>
    //       <ul className="list-disc list-inside mt-2">
    //         {products?.map((product)=>{
    //             return <li>{product.productName} - {product.price}</li>
    //         })}
    //       </ul>
    //     </div>

    //     <div>
    //       <button>Update Profile</button>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-green-700 px-6 py-8 sm:py-12 sm:px-10 text-center">
            <h1 className="text-2xl font-bold text-white">User Profile</h1>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8 sm:px-10">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="relative group">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                    src={profileImage}
                    alt="Profile"
                  />
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-sm font-medium">
                        Change
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Profile Form */}
              <div className="flex-grow">
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mt-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          {...register("name")}
                          className={`mt-1 block p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                            errors.name ? "border-red-500" : "border"
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          {...register("email")}
                          className={`mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                            errors.email ? "border-red-500" : "border"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          {...register("phone")}
                          className={`mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                            errors.phone ? "border-red-500" : "border"
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          {...register("address")}
                          className={`mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                            errors.address ? "border-red-500" : "border"
                          }`}
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      {/* <div className="sm:col-span-2">
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows={3}
                          {...register("bio")}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
                            errors.bio ? "border-red-500" : "border"
                          }`}
                        />
                        {errors.bio && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.bio.message}
                          </p>
                        )}
                      </div> */}
                    </div>

                    <div className="flex justify-end space-x-12">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!isDirty}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                          !isDirty ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-5">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Jane Doe
                      </h2>
                      
                    </div>

                    <div className="mt-4">
                      <div >
                        <h3 className="text-sm font-medium text-gray-500">
                          Email
                        </h3>
                        <p className="text-sm text-gray-900">
                          jane.doe@example.com
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm mt-4 font-medium text-gray-500">
                          Phone
                        </h3>
                        <p className="text-sm text-gray-900">+1234567890</p>
                      </div>
                      <div>
                        <h3 className="text-sm mt-4 font-medium text-gray-500">
                          Address
                        </h3>
                        <p className="text-sm text-gray-900">
                          123 Main St, Anytown, USA
                        </p>
                      </div>
                    </div>

                    {/* <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        About
                      </h3>
                      <p className="text-sm text-gray-900">
                        Frontend developer passionate about creating beautiful
                        user experiences.
                      </p>
                    </div> */}

                    <div className="">
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center mt-7 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
