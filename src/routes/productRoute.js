import express from "express";
import { createProduct, deleteProducts, getProducts, getSinggleProduct, updateProduct } from "../controllers/productControllers/product.controller.js";
import { authentication } from "../middleware/middleware.js";

const router = express.Router();

router.get("/products/get",getProducts);
router.get("/products/get/:name",getSinggleProduct);
router.post("/products/post",authentication(["admin"]),createProduct)
router.delete("/products/delete/:id",authentication(["admin"]),deleteProducts)
router.put("/products/update/:id",authentication(["admin"]),updateProduct)



export default router;