import Order from "../../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    await Order.create(req.body);
    res.status(200).json("Order berhasil disimpan");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyOrder = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "products",
        populate: {
          path: "productId",
          model: "product",
        },
      });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find()
      .populate({
        path: "user",
        model: "user",
        select: "-hash -salt",
      })
      .populate({
        path: "products",
        populate: {
          path: "productId",
          model: "product",
        },
      })
      .sort({ createdAt: -1 });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
