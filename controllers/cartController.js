 
const {User,Product,Brand,Category,Cart,Transaction, TransactionItem} = require("../models"),
{ jwtDecode} = require("../helpers/jwt"),
{getPaymentUrl}= require("../helpers/midtrans")
const cart = require("../models/cart")
module.exports = {
  
  addCart: async (req, res,next) => {
    try {
        
        // let user_id = await jwtDecode(req.headers.authorization.split(' ')[1] )
        let user_id = await jwtDecode(req.headers.authorization.split(' ')[1])
        let cart = await Cart.findOrCreate({
            where: {user_id:user_id,
                product_id:req.params.id,},
            defaults: {
                     user_id:user_id,
                     product_id:req.params.id,
                     quantity:1
                  }
        })
        if(!cart[1]){
            cart[0].quantity +=1
            await cart[0].save({ fields: ['quantity'] })
        }
    res.status(200).json({ status: cart })
      
    } catch (err) {
 
      res.status(500).send(`${ err.message}`)
    }
  },
  removeProduct: async (req, res) => {
    try {
        const { id } = req.params
        let user_id = await jwtDecode(req.headers.authorization.split(' ')[1])
        let cart = await Cart.findOne({
           where:{
            user_id:user_id,
            product_id:id
           }
        })
 
        if(cart==null){
            res.status(404).json({ status: false })
        }
        else if(cart.quantity ==1){
            await cart.destroy()
            res.status(200).json({ status: true })
        }else{
            cart.quantity -= 1
            await cart.save()
            res.status(200).json({ status: true })
        }
    res.status(200).json({ status: cart })
      
    } catch (error) {
      res.status(500).send(`${ error.message}`)
    }
  },

  getAllCart: async (req, res,next) => {
    try {
       
      let user_id = await jwtDecode(req.headers.authorization.split(' ')[1])
     
        let cart = await Cart.findAll({
            where:{
                user_id:user_id
            },
            include: [
                {
                  model: User,
                  as: "user",
                },
                {
                  model: Product,
                  as: "product",
                },
            ],

        })
        res.status(200).json({ status:true, carts:cart })
    } catch (error) {
        res.status(500).send(`${ error.message}`)
    }
  },
  createTransaction:async (req, res,next) => {
    try {

      let user_id = await jwtDecode(req.headers.authorization.split(' ')[1])

      let cart = await Cart.findAll({
            where:{
                user_id:user_id
            },
            include: [
                {
                  model: User,
                  as: "user",
                },
                {
                  model: Product,
                  as: "product",
                },
            ],

      })
      let totalPrice= 0
      cart.forEach(item => {
        // totalPrice += (item.product.price- (item.product.price* item.product.discount)/100) * item.quantity
        totalPrice+=item.product.price* item.quantity
         
      });


      let transaction= await Transaction.create({
        user_id,
        name:cart[0].user.username,
        email:cart[0].user.email,
        address:'kediri',
        phone:'62123456789',
        courier:'jne',
        payment:'MIDTRANS',
        payment_url:'',
        total_price:totalPrice,
        status:'pending'
      })
 
 
        
      for (let i = 0; i < cart.length; i++) {
        await TransactionItem.create({
          transaction_id:transaction.id,
          product_id:cart[i].product.id,
          user_id
        })
        await Cart.destroy({
          where:{
            id: cart[i].id
          }
        })

        
      }

      
      
      let result= await getPaymentUrl(transaction,cart)
      transaction.token=  result[0].token
      transaction.payment_url= result[0].redirect_url
      transaction.order_id=result[1]
      await transaction.save()
    
      res.status(200).json({ status:true, data:transaction })
    } catch (error) {
      
    }
  }
   
   
}
