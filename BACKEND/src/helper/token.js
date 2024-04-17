
const jwt = require('jsonwebtoken');

const generateAccessToken = async(user) => {
  
    const email = user.email;
    const role = user.role;
    const _id= user._id;
    
    const token = jwt.sign({ email:email, role:role,_id:_id }, "secret", {
      expiresIn: '7d',
    });
    return {token: token}
  };

  module.exports = generateAccessToken;