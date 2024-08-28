import USer from "../models/USer.js";
import jwt from "jsonwebtoken";

export const authentication = (role = []) => {
  return async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await USer.findById(decode._id);
      if (!role.includes(req.user.role)) {
        return res.status(403).json({ message: "Admin Only, you  not have otoritation" });
      }
      next();
    } catch (error) {
        return res.status(403).json({ message: "Token tidak valid" });
    }
  };
};
