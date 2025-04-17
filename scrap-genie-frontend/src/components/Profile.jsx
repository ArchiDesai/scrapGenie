// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useParams } from "react-router-dom";
// // import { Bounce, toast, ToastContainer } from "react-toastify";

// // const Profile = () => {
// //   const id = useParams().id;

// //   const [user, setUser] = useState("");
// //   const [states, setStates] = useState([]);

// //   const getUserData = async () => {
// //     const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
// //     // console.log("res", res.data.data);
// //     setUser(res.data.data);
// //   };

// //   const getAllStates = async () => {
// //     const res = await axios.get("/state/getallstates");
// //     // console.log(res.data.data);
// //     setStates(res.data.data);
// //   };

// //   useEffect(() => {
// //     getUserData();
// //     getAllStates();
// //   }, []);

// //   const [isEditing, setIsEditing] = useState(false);
// //   const [profileImage, setProfileImage] = useState(
// //     "https://randomuser.me/api/portraits/women/65.jpg"
// //   );

// //   const {
// //     register,
// //     handleSubmit,
// //     reset,
// //     formState: { errors, isDirty },
// //   } = useForm({
// //     // defaultValues: async () => {
// //     //   const res = await axios.get("/getusersbyid/" + id);
// //     //   return res.data.data;
// //     // },
// //   });

// //   const onSubmit = async (data) => {
// //     data.userId = localStorage.getItem("id");
// //     delete data._id;
// //     console.log(data);
// //     try {
// //       const res = await axios.put("/updateprofile/" + id, data);
// //       console.log("Profile updated:", res.data);
// //       setIsEditing(false);
// //       if (res.status === 201) {
// //         toast.success(res.data.message, {
// //           position: "top-right",
// //           autoClose: 1000,
// //           hideProgressBar: false,
// //           closeOnClick: false,
// //           pauseOnHover: true,
// //           draggable: true,
// //           progress: undefined,
// //           theme: "light",
// //           transition: Bounce,
// //         });
// //         // setTimeout(() => {
// //         //   navigate("/seller/scrapproductlist");
// //         // }, 1500);
// //       }
// //     } catch (err) {
// //       toast.error(`${err.res?.data?.message || "Update Profile failed"}`, {
// //         position: "top-right",
// //         autoClose: 1000,
// //         hideProgressBar: false,
// //         closeOnClick: false,
// //         pauseOnHover: true,
// //         draggable: true,
// //         progress: undefined,
// //         theme: "light",
// //         transition: Bounce,
// //       });
// //     }
// //   };

// //   const handleCancel = () => {
// //     reset(user);
// //     setIsEditing(false);
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setProfileImage(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-2xl mx-auto">
// //         <ToastContainer
// //           position="top-right"
// //           autoClose={1000}
// //           hideProgressBar={false}
// //           newestOnTop={false}
// //           closeOnClick={false}
// //           rtl={false}
// //           pauseOnFocusLoss
// //           draggable
// //           pauseOnHover
// //           theme="light"
// //           transition={Bounce}
// //         />
// //         <div className="bg-white shadow rounded-lg overflow-hidden">
// //           {/* Profile Header */}
// //           <div className="bg-green-700 px-6 py-8 sm:py-12 sm:px-10 text-center">
// //             <h1 className="text-2xl font-bold text-white">User Profile</h1>
// //           </div>

// //           {/* Profile Content */}
// //           <div className="px-6 py-8 sm:px-10">
// //             <div className="flex flex-col sm:flex-row gap-8">
// //               {/* Profile Image */}
// //               <div className="flex-shrink-0 mx-auto sm:mx-0">
// //                 <div className="relative group">
// //                   <img
// //                     className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
// //                     src={profileImage}
// //                     alt="Profile"
// //                   />
// //                   {isEditing && (
// //                     <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
// //                       <span className="text-white text-sm font-medium">
// //                         Change
// //                       </span>
// //                       <input
// //                         type="file"
// //                         accept="image/*"
// //                         className="hidden"
// //                         onChange={handleImageChange}
// //                       />
// //                     </label>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Profile Form */}
// //               <div className="flex-grow">
// //                 {isEditing ? (
// //                   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //                     <div className="mt-5">
// //                       <div>
// //                         <label
// //                           htmlFor="name"
// //                           className="block text-sm font-medium text-gray-700"
// //                         >
// //                           First Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           id="name"
// //                           {...register("firstName")}
// //                           className={`mt-1 block p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
// //                             errors.name ? "border-red-500" : "border"
// //                           }`}
// //                         />
// //                         {errors.name && (
// //                           <p className="mt-1 text-sm text-red-600">
// //                             {errors.name.message}
// //                           </p>
// //                         )}
// //                       </div>
// //                       <div className="mt-4">
// //                         <label
// //                           htmlFor="name"
// //                           className="block text-sm font-medium text-gray-700"
// //                         >
// //                           Last Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           id="name"
// //                           {...register("lastName")}
// //                           className={`mt-1 block p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
// //                             errors.name ? "border-red-500" : "border"
// //                           }`}
// //                         />
// //                         {errors.name && (
// //                           <p className="mt-1 text-sm text-red-600">
// //                             {errors.name.message}
// //                           </p>
// //                         )}
// //                       </div>

// //                       <div className="mt-4">
// //                         <label
// //                           htmlFor="email"
// //                           className="block text-sm font-medium text-gray-700"
// //                         >
// //                           Email
// //                         </label>
// //                         <input
// //                           type="email"
// //                           id="email"
// //                           {...register("email")}
// //                           className={`mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
// //                             errors.email ? "border-red-500" : "border"
// //                           }`}
// //                         />
// //                         {errors.email && (
// //                           <p className="mt-1 text-sm text-red-600">
// //                             {errors.email.message}
// //                           </p>
// //                         )}
// //                       </div>

// //                       <div className="mt-4">
// //                         <label
// //                           htmlFor="phone"
// //                           className="block text-sm font-medium text-gray-700"
// //                         >
// //                           Phone
// //                         </label>
// //                         <input
// //                           type="tel"
// //                           id="phone"
// //                           {...register("phone")}
// //                           className={`mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
// //                             errors.phone ? "border-red-500" : "border"
// //                           }`}
// //                         />
// //                         {errors.phone && (
// //                           <p className="mt-1 text-sm text-red-600">
// //                             {errors.phone.message}
// //                           </p>
// //                         )}
// //                       </div>

// //                       <div className="mt-4">
// //                         <label
// //                           htmlFor="address"
// //                           className="block text-sm font-medium text-gray-700"
// //                         >
// //                           State
// //                         </label>
// //                         <select
// //                           {...register("stateId")}
// //                           className={`w-full mt-1 p-1 border rounded-md ${
// //                             errors.address ? "border-red-500" : "border"
// //                           }`}
// //                           onChange={(e) => {
// //                             getAllStates(e.target.value);
// //                           }}
// //                         >
// //                           <option>Select State</option>
// //                           {states?.map((state) => (
// //                             <option key={state._id} value={state._id}>
// //                               {state.name}
// //                             </option>
// //                           ))}
// //                         </select>
// //                         {errors.address && (
// //                           <p className="mt-1 text-sm text-red-600">
// //                             {errors.address.message}
// //                           </p>
// //                         )}
// //                       </div>
// //                     </div>

// //                     <div className="flex justify-end space-x-12">
// //                       <button
// //                         type="button"
// //                         onClick={handleCancel}
// //                         className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
// //                       >
// //                         Cancel
// //                       </button>
// //                       <button
// //                         type="submit"
// //                         // disabled={!isDirty}
// //                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 "
// //                       >
// //                         {/* ${
// //                           !isDirty ? "opacity-50 cursor-not-allowed" : ""
// //                         } */}
// //                         Save Changes
// //                       </button>
// //                     </div>
// //                   </form>
// //                 ) : (
// //                   <div className="mt-5">
// //                     <div>
// //                       <h2 className="text-xl font-semibold text-gray-900">
// //                         {user.firstName}&nbsp;{user.lastName}
// //                       </h2>
// //                     </div>

// //                     <div className="mt-4">
// //                       <div>
// //                         <h3 className="text-sm font-medium text-gray-500">
// //                           Email
// //                         </h3>
// //                         <p className="text-sm text-gray-900">{user.email}</p>
// //                       </div>
// //                       <div>
// //                         <h3 className="text-sm mt-4 font-medium text-gray-500">
// //                           Phone
// //                         </h3>
// //                         <p className="text-sm text-gray-900">{user.phone}</p>
// //                       </div>
// //                       <div>
// //                         <h3 className="text-sm mt-4 font-medium text-gray-500">
// //                           State
// //                         </h3>
// //                         <p className="text-sm text-gray-900">
// //                           {user.stateId?.name}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     <div className="">
// //                       <button
// //                         type="button"
// //                         onClick={() => setIsEditing(true)}
// //                         className="inline-flex items-center mt-7 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
// //                       >
// //                         Edit Profile
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { BsFillPersonFill } from "react-icons/bs";
// import { FaCamera } from "react-icons/fa6";
// import { useParams } from "react-router-dom";
// import { Bounce, toast, ToastContainer } from "react-toastify";

// const Profile = () => {
//   const id = useParams().id;
//   const [user, setUser] = useState("");
//   const [states, setStates] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileImage, setProfileImage] = useState();

//   const getUserData = async () => {
//     const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
//     setUser(res.data.data);
//   };

//   const getAllStates = async () => {
//     const res = await axios.get("/state/getallstates");
//     setStates(res.data.data);
//   };

//   useEffect(() => {
//     getUserData();
//     getAllStates();
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // {defaultValues: async () => {
//   //   const res = await axios.get("/getusersbyid/" + id);
//   //   return res.data.data;
//   // },}

//   const onSubmit = async (data) => {
//     data.userId = localStorage.getItem("id");
//     console.log(data);
    

//     // const formData = new FormData();
//     // formData.append("image", data.image[0]);
//     // formData.append("firstName", data.firstName);
//     // formData.append("lastName", data.lastName);
//     // formData.append("email", data.email);
//     // formData.append("phone", data.phone);
//     // formData.append("stateId", data.stateId);

//     delete data._id;

//     try {
//       const res = await axios.put("/updateprofile/" + id, data);
//       setIsEditing(false);
//       if (res.status === 201) {
//         toast.success(res.data.message, {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Bounce,
//         });
//       }
//     } catch (err) {
//       toast.error(`${err.res?.data?.message || "Update Profile failed"}`, {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
//     }
//   };

//   const handleCancel = () => {
//     reset(user);
//     setIsEditing(false);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//       // const reader = new FileReader();
//       // reader.onloadend = () => {
//       //   setProfileImage(reader.result);
//       // };
//       // reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <ToastContainer
//         position="top-right"
//         autoClose={1000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />

//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Profile Header */}
//           <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 sm:py-10 text-center">
//             <h1 className="text-3xl font-bold text-white">User Profile</h1>
//           </div>

//           {/* Profile Content */}
//           <div className="px-6 py-8 sm:px-10">
//             <div className="flex flex-col md:flex-row gap-8 items-start">
//               {/* Profile Image */}
//               <div className="flex-shrink-0 mx-auto md:mx-0">
//                 <div className="relative group">
//                   {profileImage == true ? (
//                     <div className="w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
//                       <img
//                         className="w-full h-full object-cover"
//                         // src={profileImage}
//                         alt="Profile"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-36 h-36 rounded-full border-4 bg-gray-400 flex items-center justify-center border-white shadow-lg overflow-hidden">
//                       <BsFillPersonFill className="text-7xl" />
//                     </div>
//                   )}
//                   {isEditing && (
//                     <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//                       <div className="bg-white p-2 rounded-full">
//                         <FaCamera className="h-5 w-5 text-gray-800" />
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleImageChange}
//                       />
//                     </label>
//                   )}
//                 </div>
//               </div>

//               {/* Profile Form */}
//               <div className="flex-grow w-full">
//                 {isEditing ? (
//                   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label
//                           htmlFor="firstName"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           First Name
//                         </label>
//                         <input
//                           type="text"
//                           id="firstName"
//                           {...register("firstName")}
//                           className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
//                             errors.firstName
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="lastName"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           id="lastName"
//                           {...register("lastName")}
//                           className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
//                             errors.lastName
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           {...register("email")}
//                           className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
//                             errors.email ? "border-red-500" : "border-gray-300"
//                           }`}
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="phone"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Phone
//                         </label>
//                         <input
//                           type="tel"
//                           id="phone"
//                           {...register("phone")}
//                           className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
//                             errors.phone ? "border-red-500" : "border-gray-300"
//                           }`}
//                         />
//                       </div>
//                       <div className="md:col-span-2">
//                         <label
//                           htmlFor="stateId"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           State
//                         </label>
//                         <select
//                           {...register("stateId")}
//                           className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
//                             errors.stateId
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                           onChange={(e) => {
//                             getAllStates(e.target.value);
//                           }}
//                         >
//                           <option value="">Select State</option>
//                           {states?.map((state) => (
//                             <option key={state._id} value={state._id}>
//                               {state.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="flex justify-end space-x-4 pt-4">
//                       <button
//                         type="button"
//                         onClick={handleCancel}
//                         className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium text-white transition"
//                       >
//                         Save Changes
//                       </button>
//                     </div>
//                   </form>
//                 ) : (
//                   <div className="space-y-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-800">
//                         {user.firstName} {user.lastName}
//                       </h2>
//                     </div>

//                     <div className="space-y-4">
//                       <div>
//                         <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
//                           Email
//                         </h3>
//                         <p className="mt-1 text-base text-gray-700">
//                           {user.email}
//                         </p>
//                       </div>
//                       <div>
//                         <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
//                           Phone
//                         </h3>
//                         <p className="mt-1 text-base text-gray-700">
//                           {user.phone}
//                         </p>
//                       </div>
//                       <div>
//                         <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
//                           State
//                         </h3>
//                         <p className="mt-1 text-base text-gray-700">
//                           {user.stateId?.name}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setIsEditing(true)}
//                         className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium text-white transition"
//                       >
//                         Edit Profile
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { BsFillPersonFill } from "react-icons/bs";
// import { useParams } from "react-router-dom";

// const Profile = () => {
//   const id = useParams().id;
//   const [user, setUser] = useState("");
//   const [states, setStates] = useState([]);

//   const getUserData = async () => {
//     const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
//     setUser(res.data.data);
//   };

//   const getAllStates = async () => {
//     const res = await axios.get("/state/getallstates");
//     setStates(res.data.data);
//   };

//   useEffect(() => {
//     getUserData();
//     getAllStates();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Profile Header */}
//           <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 sm:py-10 text-center">
//             <h1 className="text-3xl font-bold text-white">User Profile</h1>
//           </div>

//           {/* Profile Content */}
//           <div className="px-6 py-8 sm:px-10">
//             <div className="flex flex-col md:flex-row gap-8 items-start">
//               {/* Profile Image */}
//               <div className="flex-shrink-0 mx-auto md:mx-0">
//                 <div className="relative group">
//                   <div className="w-36 h-36 rounded-full border-4 bg-gray-400 flex items-center justify-center border-white shadow-lg overflow-hidden">
//                     <BsFillPersonFill className="text-7xl" />
//                   </div>
//                 </div>
//               </div>

//               {/* Profile Info */}
//               <div className="flex-grow w-full">
//                 <div className="space-y-6">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">
//                       {user.firstName} {user.lastName}
//                     </h2>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
//                         Email
//                       </h3>
//                       <p className="mt-1 text-base text-gray-700">
//                         {user.email}
//                       </p>
//                     </div>
//                     <div>
//                       <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
//                         Phone
//                       </h3>
//                       <p className="mt-1 text-base text-gray-700">
//                         {user.phone}
//                       </p>
//                     </div>
//                     <div>
//                       <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
//                         State
//                       </h3>
//                       <p className="mt-1 text-base text-gray-700">
//                         {user.stateId?.name}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

const Profile = () => {
  const id = useParams().id;
  const [user, setUser] = useState("");
  const [states, setStates] = useState([]);

  const getUserData = async () => {
    const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
    setUser(res.data.data);
  };

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  useEffect(() => {
    getUserData();
    getAllStates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-12 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <h1 className="text-4xl font-bold text-white relative z-10">Profile Overview</h1>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-10">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-40 h-40 rounded-full bg-white border-4 shadow-gray-300 shadow-lg flex items-center justify-center">
                  <BsFillPersonFill className="text-8xl text-black" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-grow w-full">
                <div className="space-y-8">
                  <div className="border-b border-gray-100 pb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-indigo-500 mt-1">Active User</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Email Address
                      </h3>
                      <p className="text-lg font-medium text-gray-800">
                        {user.email}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Phone Number
                      </h3>
                      <p className="text-lg font-medium text-gray-800">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Location
                      </h3>
                      <p className="text-lg font-medium text-gray-800">
                        {user.stateId?.name || "Not specified"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Account Status
                      </h3>
                      <p className="text-lg font-medium text-green-600">
                        Verified
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;