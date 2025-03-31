const communicationModel = require("../models/CommunicationModel");

const addCommunication = async (req, res) => {
  try {
    const savedCommunication = await communicationModel.create(req.body);
    res
      .status(200)
      .json({ message: "Communication created..", data: savedCommunication });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllMessagesByUserId = async(req,res)=>{
  try {
    const userId = req.params.id;
    const messages = await communicationModel.find({ sellerId: userId }); // Fetch messages for the seller
    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { addCommunication ,getAllMessagesByUserId};
