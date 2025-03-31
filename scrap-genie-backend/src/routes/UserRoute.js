const routes = require("express").Router();
const userController = require("../controllers/UserController");
routes.post("/signup", userController.signup);
// routes.post("/signupwithimage",userController.signupWithFile)
routes.post("/login", userController.login);
routes.get("/", userController.getAllUsers);
routes.get("/getusersbyid/:id", userController.getUserById);
routes.delete("/:id", userController.deleteUser);
routes.post("/forgotpassword",userController.forgotPassword)
routes.post("/resetpassword",userController.resetPassword)

module.exports = routes;
