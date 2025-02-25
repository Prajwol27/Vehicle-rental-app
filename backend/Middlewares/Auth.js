const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');


const ensureAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};


const authenticateAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only', success: false });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

module.exports = { ensureAuthenticated, authenticateAdmin };
