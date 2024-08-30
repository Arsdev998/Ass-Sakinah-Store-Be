import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    capital: { type: Number, required: true },
    profit: { type: Number, required: true },
    stock: { type: Number, required: true },
    weight: { type: Number, required: true },
    rating: { type: Number, default: 0 }, // Menambahkan default untuk rating
    images: [{ link: { type: String } }], // Mempertahankan struktur jika ingin menggunakan objek
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" }, // Mengasumsikan model user bernama "User"
        rating: { type: Number, default: 0 },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default model("Product", productSchema);
