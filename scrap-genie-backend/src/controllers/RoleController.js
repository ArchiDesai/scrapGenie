const roleModel = require("../models/RoleModel");

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.find();
    res.status(200).json({ message: "role matched successfully", data: roles });
  } catch (err) {
    res.status(200).json({ message: err });
  }
};

const addRole = async (req, res) => {
  try {
    const savedRole = await roleModel.create(req.body);
    res.status(201).json({ message: "role created..", data: savedRole });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteRole = async (req, res) => {
  try {
    const deletedRole = await roleModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "role deleted...",
      data: deletedRole,
    });
  } catch (err) {
    res.status(500), json({ message: err });
  }
};

const getRoleById = async (req, res) => {
  try {
    const foundRole = await roleModel.findById(req.params.id);
    res.status(200).json({
      message: "role fatched successfully...",
      data: foundRole,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// const updateRole = async (req, res) => {
//   const updatedRole = await roleModel.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json({ message: "role updated...", data: updatedRole });
// };

module.exports = { getAllRoles, addRole, deleteRole, getRoleById };
