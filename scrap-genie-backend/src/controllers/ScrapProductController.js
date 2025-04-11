const scrapProductModel = require("../models/ScrapProductModel");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const multer = require("multer");

// storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// multer object
const upload = multer({
  storage: storage,
}).single("image"); //file filter

const addScrapProduct = async (req, res) => {
  try {
    const savedScrapProduct = await scrapProductModel.create(req.body);
    res
      .status(201)
      .json({ message: "Scrap Product added..", data: savedScrapProduct });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAllScrapProduct = async (req, res) => {
  try {
    const scrapProducts = await scrapProductModel
      .find()
      .populate("userId stateId cityId areaId");
    res.status(200).json({ message: "All scrap list..", data: scrapProducts });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAllScrapProductByUserId = async (req, res) => {
  try {
    const scrapProducts = await scrapProductModel
      .find({ userId: req.params.userId })
      .populate("userId stateId");
    if (scrapProducts.length === 0) {
      res.status(404).json({ message: "no product found" });
    } else {
      res
        .status(200)
        .json({ message: "product found successfully", data: scrapProducts });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteScrapProduct = async (req, res) => {
  try {
    const removedScrapProduct = await scrapProductModel.findByIdAndDelete(
      req.params.id
    );
    res
      .status(200)
      .json({ message: "Scrap list deleted..", data: removedScrapProduct });
  }
   catch (err) {
    res.status(500).json({ message: err });
  }
};

const addScrapProductWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: err.message });
    } else {
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );

      // store data in database
      req.body.imageUrl = cloudinaryResponse.secure_url;
      const savedScrapProduct = await scrapProductModel.create(req.body);
      res.status(201).json({
        message: "Product saved successfully",
        data: savedScrapProduct,
      });
    }
  });
};

const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await scrapProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await scrapProductModel.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "No product found" });
    } else {
      res
        .status(200)
        .json({ message: "Product found successfully", data: product });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addScrapProduct,
  getAllScrapProduct,
  getAllScrapProductByUserId,
  deleteScrapProduct,
  addScrapProductWithFile,
  updateProductById,
  getProductById,
};
