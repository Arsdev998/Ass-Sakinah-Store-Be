import express from "express";
import { authentication } from "../middleware/middleware.js";
import {
  getProvince,
  getCity,
  getCost
} from "../controllers/shippingControllers/shipping.controller.js";

const router = express.Router();

router.get("/provinces", authentication(["user", "admin"]), getProvince);
router.get("/city/:province_id", authentication(["user", "admin"]), getCity);
router.get("/cost/:origin/:destination/:weight/:courier",authentication(["user","admin"]),getCost)

export default router;
