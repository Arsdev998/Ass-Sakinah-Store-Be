import jwt from "jsonwebtoken";


function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_EXPIRED_TOKEN, {
    expiresIn: process.env.JWT_EXPIRED_TOKEN,
  });
}


export const googleLogin = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Anda tidak terotentikasi" });
  }
  const token = generateToken(req.user);
  return res.status(200).cookie("tokoen", token ).redirect(process.env.DOMAIN);
};

