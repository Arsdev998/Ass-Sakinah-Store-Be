import USer from "../../models/USer.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import sendEmail from "../../utils/SendEmail.js";

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
            return res
              .status(200)
              .cookie("token", token)
              .json({ user });
          }
        });
      }
    })(req, res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sendEmailControll = async (req, res) => {
  try {
    const user = await USer.findOne({ username: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "email belum terdaftar di Ass-Sakinah" });
    }
    const token = user.PasswordToken();
    await user.save({ validateBeforeSave: true });

    const url = `${process.env.DOMAIN}/reset-password/${token}`;
    const message = `Klik link ini untuk mereset password anda : ${url} `;
    await sendEmail({
      email: user.username,
      subject: "Reset Password",
      message,
    });
    return res
      .status(200)
      .json({ message: `Link reset password telah dikirim ${user.username}` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logourUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expiresIn: new Date(Date.now),
    });

    res.status(200).json({ message: "berhasil logout" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
