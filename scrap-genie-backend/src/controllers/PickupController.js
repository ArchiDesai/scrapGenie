const pickupModel = require("../models/PickupModel");

const addPickup = async (req, res) => {
  try {
    const savedPickup = await pickupModel.create(req.body);
    res.status(200).json({ message: "pickup done...", data: savedPickup });
  } catch (err) {
    res.status(500).json({ message: res.message });
  }
};

module.exports = { addPickup };
