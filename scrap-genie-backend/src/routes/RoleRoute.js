const routes = require("express").Router();
const roleController = require("../controllers/RoleController");
routes.get("/getallroles", roleController.getAllRoles);
routes.post("/add", roleController.addRole);
routes.delete("/:id", roleController.deleteRole);
routes.get("/getrole/:id", roleController.getRoleById);
// routes.put("/role/:id",roleController.updateRole)
module.exports = routes;
