const midtransClient = require('midtrans-client');
require("dotenv").config()
 
// let snap = new midtransClient.Snap({
//         isProduction : process.env.MIDTRANS_PRODUCTION,
//         clientKey : process.env.MIDTRANS_CLIENT_KEY,
//         serverKey : process.env.MIDTRANS_SERVER_KEY
//     });
let snap = new midtransClient.Snap()
snap.apiConfig.isProduction =   (process.env.MIDTRANS_PRODUCTION === 'true')
snap.apiConfig.serverKey = process.env.MIDTRANS_SERVER_KEY
snap.apiConfig.clientKey = process.env.MIDTRANS_CLIENT_KEY
function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
}
    
 
module.exports = {
        getPaymentUrl:async  (data,cart) => {
             
          
            let item_details=[]
            cart.forEach(item => {
                
                item_details.push({
                    id:item.product.id,
                    price:item.product.price,
                    quantity:item.quantity,
                    name:item.product.title,
                    // brand:item.product.brand_id,
                    // category:item.item.product.category_id,
                    // merchant_name:"Midtrans",
                    // url:"tes.com"
                })
            });

            let transaction_details={
                order_id:makeid(6) ,
                gross_amount:data.total_price
            }
            let userData={
                first_name :data.name,
                last_name : data.name,
                address : data.address,
                city : "kediri",
                postal_code : "64182",
                phone : data.phone,
                country_code : "IDN",
            }
            let customer_details={
                first_name :data.name,
                last_name : data.name,
                email:data.email,
                phone:data.phone,
                billing_address:userData,
                shipping_address:userData
            }
            let midtrans_params={
                transaction_details,customer_details,item_details
            }
            
           return [await snap.createTransaction(midtrans_params),transaction_details.order_id]
             
            
            
        },
        
}