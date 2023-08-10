// Required Variables

let express = require("express");
let Router = express.Router();

//Get Controllers
let userController = require("../controller/userController");

//Handle Routes
Router.get("/", userController.getIndex);
module.exports = Router;
