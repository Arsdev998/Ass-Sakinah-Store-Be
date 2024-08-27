import USer from "../../models/USer.js";
import jwt from "jsonwebtoken";
import passport from "passport";

function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRED_TOKEN,
    }
  );
}

export const register = async (req, res) => {
  try {
    // Gunakan destructuring untuk mengambil nilai dari req.body
    const { name, username, email, password } = req.body;
    USer.register(
      new USer({ name, username, email }),
      password,
      (err, user) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          const token = generateToken(user);
          return res.status(200).cookie("token", token).json({
            message: "User registered successfully",
            isRegister: true,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        req.login(user, function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          } else {
            const token = generateToken(user);
             return res.status(200).cookie("token", token).json({
               message: "User registered successfully",
               isLogin: true,
             });
          }
        });
      }
    })(req, res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
