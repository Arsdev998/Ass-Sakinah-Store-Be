import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  orderId: { type: string, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
  addres: { type: String, required: true },
  phone: { type: Number, required: true },
  subtotal: { type: String, required: true },
  payment: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  orderStatus: { type: String, required: true },
  resi: { type: String, default: "proccesing" },
  products: [
    {
      productId: [{ type: Schema.Types.ObjectId, required: true }],
      qty: { type: String, required: true },
      totalPrice: { type: Number, required: true },
      profit: { type: Number, required: true },
    },
  ],
},{timestamps:true});

export default model("order",orderSchema)
