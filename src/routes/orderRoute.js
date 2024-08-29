import express from 'express'
import {authentication} from '../middleware/middleware.js'
import { createOrder, getAllOrder, getMyOrder } from '../controllers/orderControllers/order.controller.js'

const router = express.Router()


router.post("/create",authentication(["user"]),createOrder);
router.get("/my-order",authentication(["user"]),getMyOrder);
router.get("/all-order",authentication(["admin"]),getAllOrder);



export default router