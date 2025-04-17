const myProductModel = require("../models/MyProductModel");

const addMyProduct = async (req, res) => {
  try {
    const savedProduct = await myProductModel.create(req.body);
    res
      .status(201)
      .json({ messaage: "Product added successfully..", data: savedProduct });
  } catch (err) {
    res.status(500).json({ messsage: res.messaage });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const myProducts = await myProductModel.find().populate("userId productId");
    res.status(200).json({ message: "all Products..", data: myProducts });
  } catch (err) {
    res.status(500).json({ messaage: res.messaage });
  }
};

const getProductById = async (req, res) => {
  try {
    const products = await myProductModel.findById(req.params.id);
    if (!products) {
      res.status(404).json({ message: "No product found" });
    } else {
      res.status(200).json({ message: "Products fetched", data: products });
    }
    // res.status(200).json({ messaage: "products fetched", data: productById });

    // res.status(404).json({ messaage: err.messaage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProductsByUserId = async (req, res) => {
  try {
    const myProducts = await myProductModel
      .find({ userId: req.params.userId })
      .populate("userId productId");
    if (myProducts.length === 0) {
      res.status(404).json({ message: "no product found" });
    } else {
      res
        .status(200)
        .json({ message: "product found successfully", data: myProducts });
    }
    // res
    //   .status(200)
    //   .json({ messaage: "product fond successfully..", data: myProducts });
  } catch (err) {
    res.status(500).json({ message: err.messaage });
  }
};
module.exports = {
  addMyProduct,
  getAllProducts,
  getProductById,
  getAllProductsByUserId,
};
