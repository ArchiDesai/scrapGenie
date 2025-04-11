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
    const myProducts = await myProductModel.find(req.body);
    res
      .status(200)
      .json({ message: "all Products..", data: myProducts });
  } catch (err) {
    res.status(500).json({ messaage: res.messaage });
  }
};

const getAllProductsByUserId =async(req,res)=>{
    try {
        const myProducts= await myProductModel.findById({userId:req.params.userId}).populate("userId")
        res.status(200).json({messaage:"product fond successfully..",data:myProducts})
    } catch (err) {
        res.status(500).json({message:err.messaage})
    }
}
module.exports = { addMyProduct, getAllProducts, getAllProductsByUserId };
