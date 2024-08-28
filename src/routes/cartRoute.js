import express from "express";
import { authentication } from "../middleware/middleware.js";
import { addCard, getMyCart ,deleteProduct } from "../controllers/cardControllers/cart.controller.js";

const router = express.Router();

router.post("/post", authentication(["user"]),addCard);
router.get("/mycart", authentication(["user","admin"]),getMyCart);
router.delete("/delete/:id", authentication(["user","admin"]),deleteProduct);

export default router;
