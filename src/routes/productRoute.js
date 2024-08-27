import express from "express";
import { getProducts, getSinggleProduct } from "../controllers/productControllers/product.controller.js";

const router = express.Router();

router.get("/products/get",getProducts);
router.get("/products/get/:name",getSinggleProduct);



export default router