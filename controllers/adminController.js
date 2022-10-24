const { comparePassword ,hashPassword} = require("../helpers/bycrypt"), 
{User,Product,Brand,Category} = require("../models"),
slugify = require('slugify')

module.exports = {
  
  RegisterAdmin: async (req, res) => {
    try {
      const { email,username, password } = req.body
      const user = await User.create({
        email,
        username,
        role:"ADMIN",
        password:hashPassword(req.body.password)
    })
    res.status(200).json({ status: true })
      
    } catch (error) {
      res.status(500).send(`${ error.message}`)
    }
  },
  addProduct: async (req, res) => {
    try {
      const {  brand_id,category_id,description,discount ,price,rating,stock,thumbnail ,title } = req.body
      const product = await Product.create({brand_id,category_id,description,discount,slug: slugify(req.body.title, `_${Math.floor(Math.random() * 100)}_`) ,price,rating,stock,thumbnail ,title})
    res.status(200).json({ status: true })
      
    } catch (error) {
      res.status(500).send(`${ error.message}`)
    }
  },
  addBrand: async (req, res) => {
    try {
      const {  name} = req.body
      const brand = await Brand.create({name})
    res.status(200).json({ status: true })
      
    } catch (error) {
      res.status(500).send(`${ error.message}`)
    }
  },
  addCategory: async (req, res) => {
    try {
      const {  name} = req.body
      const category = await Category.create({name})
      res.status(200).json({ status: true })
      
    } catch (error) {
      res.status(500).send(`${ error.message}`)
    }
  },
}
