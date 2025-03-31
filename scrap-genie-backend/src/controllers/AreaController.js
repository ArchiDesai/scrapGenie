const areaModel = require("../models/AreaModel");

const addArea = async (req, res) => {
  try {
    const savedArea = await areaModel.create(req.body);
    res.status(201).json({ message: "Area added..", data: savedArea });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAllAreas = async (req, res) => {
  try {
    const areas = await areaModel.find().populate("cityId stateId");
    res.status(200).json({ message: "All areas fatched..", data: areas });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAreaByCityId = async (req, res) => {
  try {
    const area = await areaModel.find({ cityId: req.params.cityId });
    res.status(200).json({ message: "Area found", data: area });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteArea = async (req, res) => {
  try {
    const removedArea = await areaModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Area removed..", data: removedArea });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { addArea, getAllAreas, getAreaByCityId, deleteArea };
