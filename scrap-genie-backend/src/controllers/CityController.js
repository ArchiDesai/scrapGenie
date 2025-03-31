const cityModel = require("../models/CityModel");

const addCity = async (req, res) => {
  try {
    const savedCity = await cityModel.create(req.body);
    res.status(201).json({ message: "City added..", data: savedCity });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAllCities = async (req, res) => {
  try {
    const cities = await cityModel.find().populate("stateId");
    res.status(200).json({ message: "All cities fatched..", data: cities });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getCitiyByStateId = async (req, res) => {
  try {
    const city = await cityModel.find({ stateId: req.params.stateId });
    res.status(200).json({ message: "city found", data: city });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteCity = async (req, res) => {
  try {
    const removedCity = await cityModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "city removed..", data: removedCity });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { addCity, getAllCities, getCitiyByStateId, deleteCity };
