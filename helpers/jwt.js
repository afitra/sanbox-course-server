const jwt = require('jsonwebtoken')
var Decode = require("jwt-decode");
module.exports = {
    tokenGenerate: (payload) => {
        return jwt.sign(payload, process.env.JWT_SECRET)
    },
    verify: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET)
    },
    jwtDecode: (token) => {
        return Decode(token).id;
    }
}