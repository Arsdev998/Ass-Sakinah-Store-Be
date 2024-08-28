import express from "express";
import { authentication } from "../middleware/middleware.js";
import {
  getStatus,
  proccesTransaction,
} from "../controllers/paymentMidtrans/paymenrMidrans.controller.js";

const router = express.Router();

router.post(
  "/process-transaction",
  authentication(["user", "admin"]),
  proccesTransaction
);
router.get("/status/:orderId", authentication(["user", "admin"]), getStatus);

export default router;
