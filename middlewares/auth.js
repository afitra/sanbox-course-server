const { verify } = require("../helpers/jwt");
const { Siswa, Admin } = require("../models");
var jwtDecode = require("jwt-decode");



module.exports = {
     Authentication: async (req, res,next) =>  {
        try {
      
        
          let decode = await verify(req.headers.authorization.split(' ')[1]);
          next();
        } catch (err) {
     
 
          next(err);
        }
      },
      
       Authorization: async (req, res,next) =>  {
        var validate = await jwtDecode(req.headers.authorization.split(' ')[1]);
      
        await Admin.findOne({
          where: {
            id: validate.id,
            role: "ADMIN"
          }
        })
          .then(event => {
            if (event) {
              next();
            } else {
              next({
                status: 403,
                message: `you don't have the authority to do this action`
              });
            }
          })
          .catch(next);
      },
      
   
      
}