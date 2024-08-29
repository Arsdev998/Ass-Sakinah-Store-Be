import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    orderId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    payment: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending" },
    orderStatus: { type: String, default: "proccesing" },
    resi: { type: String },
    products: [
      {
        productId: [{ type: Schema.Types.ObjectId, required: true }],
        qty: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        profit: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model("order", orderSchema);
