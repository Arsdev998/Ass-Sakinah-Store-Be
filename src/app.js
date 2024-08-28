import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import shippingRoute from './routes/shippingRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import USer from "./models/USer.js"; // Pastikan nama file dan import benar


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

app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/ongkir",shippingRoute);
app.use("/api/payment",paymentRoute)

export default app;
