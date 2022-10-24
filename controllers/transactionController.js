const {User,Product,Brand,Category} = require("../models")

module.exports = {
  
  addTransaction: async (req, res) => {
    try {
      
    res.status(200).json({ status: true })
      
    } catch (error) {
      res.status(500).send(`${ error.message}`)
    }
  },
   
}
