const { comparePassword ,hashPassword} = require("../helpers/bycrypt"), 
{User,Transaction} = require("../models"),
{ tokenGenerate,jwtDecode } = require("../helpers/jwt.js");

module.exports = {
  getUser: async (req, res) => {
 
 
    
    let user_id = await jwtDecode(req.headers.authorization.split(' ')[1])
    let user = await User.findOne({
      where:{
        id:user_id
      }
    })
 
    res.status(200).json({ status: true, user })
    try {
      
    } catch (error) {
      res.status(400).send(`${ error.message}`)
    }
  },
  registerUser: async (req, res) => {
    try {
      let { email,username, password } = req.body
 
      let user = await User.create({
        email:email,
        username:username,
        role:"USER",
        password:password
      })
 
      res.status(200).json({ status: true, user })
      
    } catch (error) {
      res.status(400).send(`${ error.message}`)
    }
  },
  
  actionLogin: async (req, res) => {
    try {
      const { email, password } = req.body
    
      const user = await User.findOne({
        where:{
          email:email
        }
      })
    
      if (!user) {
        // throw new Error(` user with ${username}not found`);
        res.status(404).json({
          messege: ` user with ${username}not found`
        });
      }

      const isPasswordMatch = await comparePassword(password, user.password)
    
      if (!isPasswordMatch) {
        res.status(404).json({
          messege: ` user n pass not passed`
        });
      }
 
      
      let payload = {
        id: user.id,
        email: user.email
      };
      let token = tokenGenerate(payload);
      
      
      
      res.status(200).json({ status: true, token:token,user })
    } catch (error) {
      
      res.status(400).send(`${ error.message}`)
    }
  },
  addTransaction: async (req, res) => {
    try {
      // return req.body
      const transaction = await Transaction.create({ 
        user_id:jwtDecode(req.headers.authorization.split(' ')[1]),
        totalPrice:req.body.totalPrice,
        address:req.body.address,
        status:'pending',
        phone:req.body.phone,
        courier:req.body.courier,
       })


      res.status(200).json({ status: transaction })
    } catch (error) {
      
      res.status(400).send(`${ error.message}`)
    }
  }

 
}
