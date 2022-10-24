var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController"),
      cartController = require("../controllers/cartController"),
      productController = require("../controllers/productController")

const {Authentication} = require("../middlewares/auth")
/* GET users listing. */
router.post("/register", userController.registerUser)
router.post("/login", userController.actionLogin)
router.get("/data",Authentication, userController.getUser)
router.get("/product", productController.getAllProduct)
router.get("/cart", Authentication,cartController.getAllCart)
router.post("/cart", Authentication,cartController.createTransaction)
router.post("/cart/add/product/:id",Authentication, cartController.addCart)
router.post("/cart/min/product/:id",Authentication, cartController.removeProduct)


module.exports = router;
