const  {User,Product} = require("../models")

module.exports = {
  
  addProduct: async (req, res) => {
    try {
      const {  brand_id,category_id,description,discountPercentage,slug,price,rating,stock,thumbnail ,title } = req.body
      const product = await Product.create({brand_id,category_id,description,discountPercentage,slug,price,rating,stock,thumbnail ,title})
    res.status(200).json({ status: true })
      
    } catch (error) {
      res.status(500).send(`${ error.message}`)
    }
  },
  getAllProduct: async (req, res) => {
    try {
      let product = await Product.findAll({})
    res.status(200).json({ status: true, products:product })
      
    } catch (error) {
      res.status(500).send(`${ error.message}`)
    }
  },
}
