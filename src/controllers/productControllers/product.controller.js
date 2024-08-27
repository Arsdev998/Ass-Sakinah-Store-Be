import Products from "../../models/Products.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSinggleProduct = async(req,res)=>{
    try {
        const product = await Products({name:req.params.name});
        if(!product){
            res.status(404).json({error:"Product not found"})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}