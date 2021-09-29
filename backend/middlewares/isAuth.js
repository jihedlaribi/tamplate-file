const jwt = require("jsonwebtoken");
const User = require("../models/User");

require('dotenv').config();
const secret =process.env.secret




const isAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ msg: "Authorization denied" });
    }
    try {
            const decoded = jwt.verify(token, secret);
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
              return res.status(401).json([{ msg: "unauthorized" }]);
            } else {
              req.user = user;
              next();
            }
          } catch (error) {
            res.status(500).json({ error: error });
          }
  };
  module.exports = isAuth;