import Products from "../../models/Products.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSinggleProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ name: req.params.name });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, desc, category, price, capital, stock, weight } = req.body;
    const profit = price - capital;
    const product = await Products.create({
      name: name,
      desc: desc,
      category: category,
      price: price,
      capital: capital,
      profit: profit,
      stock: stock,
      weight: weight,
    });
    if (!product) {
      res.status(500).json({ message: "Produts gagal ditambahkan" });
    }
    return res.status(201).json({ message: "succes create products", product });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    await Products.deleteOne();
    return res.status(200).json({ message: "Product berhasil dihapus" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Product tidak ditemukan" });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let product = await Products.findById(req.params.id);
     const { name, desc, category, price, capital, stock, weight } = req.body;
    const profit = price - capital;
    const data = {
      name: name,
      desc: desc,
      category: category,
      price: price,
      capital: capital,
      profit: profit,
      stock: stock,
      weight: weight,
    };
    product = await Products.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    return res
      .status(200)
      .json({ message: "succes update products", product });
  } catch (error) {
     if (error.name === "CastError") {
       return res.status(404).json({ message: "Product tidak ditemukan" });
     }
    return res.status(500).json({error:error.message})
  }
};
