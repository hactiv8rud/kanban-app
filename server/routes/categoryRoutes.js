const route = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

route.post("/", CategoryController.read);
route.post("/add", CategoryController.add);
route.post("/:id", CategoryController.findByPk);
route.put("/:id", CategoryController.put);
route.delete("/:id", CategoryController.delete);

module.exports = route;