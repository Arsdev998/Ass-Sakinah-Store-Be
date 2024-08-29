import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import shippingRoute from "./routes/shippingRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import orderRoute from "./routes/orderRoute.js";
import googleAuthRoute from './routes/googleAuthRoute.js'
import USer from "./models/USer.js"; // Pastikan nama file dan import benar
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 hari
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Konfigurasi passport-local-mongoose
passport.use(USer.createStrategy());
passport.serializeUser(USer.serializeUser());
passport.deserializeUser(USer.deserializeUser());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accesToken, refreshToken, profile, cb) {
      USer.findOrCreate(
        { googleId: profile.id },
        {
          name: profile.displayName,
          username: profile.emails[0].value,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

app.use("/api", userRoute);
app.use("/auth",googleAuthRoute)
app.use("/api", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/ongkir", shippingRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoute);

export default app;
