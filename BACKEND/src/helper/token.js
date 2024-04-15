
const jwt = require('jsonwebtoken');

const generateAccessToken = async(user) => {
  
    const email = user.email;
    const role = user.role;
    
    const token = jwt.sign({ email:email, role:role }, "secret", {
      expiresIn: '7d',
    });
    return {token: token}
  };

  module.exports = generateAccessToken;