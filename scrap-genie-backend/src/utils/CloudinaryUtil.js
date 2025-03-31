const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: "dzhgxlrat",
    api_key: "716755359195132",
    api_secret: "PpYZ8XVvLjdsrLn0gZtVdL4uN4U",
  });

  const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
  return cloudinaryResponse;
};

module.exports = { uploadFileToCloudinary };
