import mongoose from "mongoose";
import Cart from "../../models/Cart.js";
const ObjectId = mongoose.Types.ObjectId;

export const addCard = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.products.push(req.body.products);
      await cart.save();
      return res.status(200).json({ message: "Berhasil disimpan" });
    } else {
      await Cart.create(req.body);
      return res.status(200).json({ message: "Berhasil disimpan" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyCart = async (req, res) => {
  try {
    const myCart = await Cart.findOne({ user: req.user._id })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "products",
        populate: {
          path: "productId",
          model: "product",
        },
      });
    if (!myCart) {
      return res.status(404).json({ message: "Cart tidak ditemukan" });
    }
    return res.status(200).json(myCart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Mengonversi productId menjadi ObjectId jika tidak menggunakan string
    const productIdObject = new ObjectId(productId);

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find((product) =>
      product.productId.equals(productIdObject)
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products.pull(product);
    await cart.save();

    res.status(200).json({ message: "Product berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};