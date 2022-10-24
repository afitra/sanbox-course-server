var express = require('express');
var router = express.Router();
const adminController = require("../controllers/adminController")

/* GET users listing. */
router.post("/register", adminController.RegisterAdmin)
router.post("/brand/add", adminController.addBrand)
router.post("/category/add", adminController.addCategory)
router.post("/product/add", adminController.addProduct)

module.exports = router;
